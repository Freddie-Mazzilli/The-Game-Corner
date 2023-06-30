from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)

class Game(db.Model, SerializerMixin):
    __tablename__ = 'games'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    image = db.Column(db.String, nullable=False)
    genre = db.Column(db.String, nullable=False)
    online = db.Column(db.Boolean, nullable=False)
    number_of_players = db.Column(db.Integer, nullable=False)
    release_year = db.Column(db.Integer, nullable=False)
    description = db.Column(db.String, nullable=False)

    developer_id = db.Column(db.Integer, db.ForeignKey('developers.id'))

    # Relationships
    geedees = db.relationship('Geedee', back_populates='game', cascade='all, delete-orphan')
    developer = db.relationship('Developer', back_populates='games')
    devices = association_proxy('geedees', 'device', creator=lambda d: Geedee(device=d))

    # Serializer
    serialize_rules = ('-geedees', '-developer')

    # Validations
    @validates('number_of_players')
    def validate_number_of_players(self, key, value):
        if not (1 <= value <= 8):
            raise ValueError('Number of players must be an integer between 1 and 8.')
        return value

    @validates('release_year')
    def validate_release_year(self, key, value):
        if not (1990 <= value <= 2024):
            raise ValueError('Game release year must be a valid year')
        return value

    @validates('description')
    def validate_description(self, key, value):
        if not (25 <= len(value) <= 1000):
            raise ValueError('Description must be between 25 and 1000 characters')
        return value

    @validates('genre')
    def validate_genre(self, key, value):
        genres = ['Action', 'Adventure', "Action-Adventure", 'Puzzle', 'RPG', 'Simulator', 'Strategy', 'Sports', 'Shooter', 'Platformer', "Racing", "Horror", "Fighting", "Party", "Stealth", "Sandbox"]
        if not value in genres:
            raise ValueError(f'{value} is not a valid genre.')
        return value

class Device(db.Model, SerializerMixin):
    __tablename__ = 'devices'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    type = db.Column(db.String, nullable=False)
    image = db.Column(db.String, nullable=False)
    manufacturer = db.Column(db.String, nullable=False)

    # Relationships
    geedees = db.relationship('Geedee', back_populates='device', cascade='all, delete-orphan')
    games = association_proxy('geedees', 'game', creator=lambda g: Geedee(game=g))

    # Serializer
    serialize_rules = ('-geedees',)

    # Validations
    @validates('manufacturer')
    def validate_manufacturer(self, key, value):
        types = ['Nintendo', 'Sony', 'Microsoft']
        if not value in types:
            raise ValueError(f'{key} must be one of the following options: {types}')
        return value

    @validates('type')
    def validate_type(self, key, value):
        types = ['Console', 'Handheld', 'PC']
        if not value in types:
            raise ValueError(f'{key} must be one of the following options: {types}')
        return value
    
class Developer(db.Model, SerializerMixin):
    __tablename__ = 'developers'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    logo = db.Column(db.String, nullable=False)

    # Relationships
    games = db.relationship('Game', back_populates='developer', cascade='all, delete-orphan')

    # Serializer
    serialize_rules = ('-games',)

    # Validations
    @validates('name')
    def validate_name(self, key, value):
        if not value:
            raise ValueError(f'Developer must have a valid {key}.')
        return value

class Geedee(db.Model, SerializerMixin):
    __tablename__ = 'geedees'

    id = db.Column(db.Integer, primary_key=True)
    
    game_id = db.Column(db.Integer, db.ForeignKey('games.id'))
    device_id = db.Column(db.Integer, db.ForeignKey('devices.id'))

    # Relationships
    game = db.relationship('Game', back_populates='geedees')
    device = db.relationship('Device', back_populates='geedees')

    # Serializer
    serialize_rules = ('-game', '-device')

    # Validations
    @validates('name', 'game_id', 'device_id')
    def validate_mission_info(self, key, value):
        if not value:
            raise ValueError(f'Geedee must have a {key}.')
        return value

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False, unique=True)
    password_hash = db.Column(db.String)

    def get(self):
        pass