import '../App.css';
import {useState, useEffect} from 'react'
import { Route, Switch, useHistory } from "react-router-dom"

import Login from './Login';
import Header from './Header';
import Footer from './Footer';
import Homepage from './Homepage';
import DeviceList from './DeviceList';
import GameList from './GameList';
import DeveloperList from './DeveloperList';
import Nav from './Nav';
import DeviceFocus from './DeviceFocus';
import DeveloperFocus from './DeveloperFocus';
import GameFocus from './GameFocus';
import ManufacturerFocus from './ManufacturerFocus';
import Search from './Search';
import RelationshipManager from './RelationshipManager';
import NewRelationship from './NewRelationship';
import NewGameForm from './NewGameForm';

function App() {

  const history = useHistory()

  const [devices, setDevices] = useState([])
  const [games, setGames] = useState([])
  const [developers, setDevelopers] = useState([])
  const [focusDevice, setFocusDevice] = useState('')
  const [focusDeveloper, setFocusDeveloper] = useState('')
  const [focusGame, setFocusGame] = useState('')
  const [focusManufacturer, setFocusManufacturer] = useState('')

  const [formData, setFormData] = useState({
    name: "Gimme, Gimme, Game",
    image: "https://cdna.artstation.com/p/assets/images/images/058/441/650/large/monica-lu-sus-cat-web.jpg?1674156555",
    genre: "Simulator",
    online: true,
    number_of_players: 1, 
    release_year: 2000,
    description: "This is where you gimme the game",
    developer_id: 46
  })

  const [searchText, setSearchText] = useState('')
  const [online, setOnline] = useState('')

  const [newRelationship, setNewRelationship] = useState({})

  function addGame(event){
    event.preventDefault()

    fetch("http://localhost:7000/games", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(newGame => setGames([...games, newGame]))
  }

  useEffect(() => {
    fetch('http://127.0.0.1:7000/devices')
    .then(res => res.json())
    .then(deviceData => setDevices(deviceData))
  }, [])

  useEffect(() => {
    fetch('http://127.0.0.1:7000/games')
    .then(res => res.json())
    .then(gameData => setGames(gameData))
  }, [])

  useEffect(() => {
    fetch('http://127.0.0.1:7000/developers')
    .then(res => res.json())
    .then(developerData => setDevelopers(developerData))
  }, [])

  function deviceFocusSelector(event) {
    setFocusDevice(event.target.alt)
    history.push('/devicefocus')
  }

  function developerFocusSelector(event) {
    setFocusDeveloper(event.target.alt)
    history.push('/developerfocus')
  }

  function gameFocusSelector(event) {
    setFocusGame(event.target.alt)
    history.push('/gamefocus')
  }

  function manufacturerFocusSelector(event) {
    setFocusManufacturer(event.target.alt)
    history.push('/manufacturerfocus')
  }

  function logoClick() {
    history.push('/home')
  }

  function relationshipButton() {
    history.push('/relationships/new_relationship')
  }

  function onlineChecker(event) {
    setOnline(event.target.value)
  }

  function updateFormData(event) {
    setFormData({...formData, [event.target.id]: event.target.value})
  }

  const filteredGames = games.filter(game => {
    if(searchText === "" && online === 'all') {
      return true
    }
    return game.name.toUpperCase().includes(searchText.toUpperCase())
  })

  function updateNewRelationship(event) {
    setNewRelationship({...newRelationship, [event.target.name]: event.target.value})
  }

  function addRelationship(event){
    event.preventDefault()

    fetch("http://localhost:7000/geedees", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(newRelationship)
    })
    .then(response => response.json())
  }

  return (
    <div className="app">
      <div className='header'>
        <Header logoClick={logoClick} />
        <Nav />
      </div>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route exact path="/home">
          <Homepage manufacturerFocusSelector={manufacturerFocusSelector}/>
        </Route>
        <Route exact path="/devices">
          <DeviceList deviceFocusSelector={deviceFocusSelector} devices={devices}/>
        </Route>
        <Route exact path="/games">
          <Search setSearchText={setSearchText} onlineChecker={onlineChecker} />
          <GameList games={filteredGames} gameFocusSelector={gameFocusSelector} />
        </Route>
        <Route exact path="/developers">
          <DeveloperList developers={developers} developerFocusSelector={developerFocusSelector} />
        </Route>
        <Route exact path="/devicefocus">
          <DeviceFocus focusDevice={focusDevice} />
        </Route>
        <Route exact path="/developerfocus">
          <DeveloperFocus focusDeveloper={focusDeveloper} />
        </Route>
        <Route exact path="/gamefocus">
          <GameFocus focusGame={focusGame}/>
        </Route>
        <Route exact path='/manufacturerfocus'>
          <ManufacturerFocus deviceFocusSelector={deviceFocusSelector} focusManufacturer={focusManufacturer} />
        </Route>
        <Route exact path='/relationships'>
          <RelationshipManager relationshipButton={relationshipButton} />
        </Route>
        <Route exact path='/relationships/new_relationship'>
          <NewRelationship addRelationship={addRelationship} updateNewRelationship={updateNewRelationship}/>
        </Route>
        <Route exact path="/games/new_game">
          <NewGameForm  updateFormData={updateFormData} addGame={addGame}/>
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;