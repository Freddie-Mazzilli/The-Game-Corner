import React, {useState} from "react";

function NewGameForm({addGame, updateFormData}){

    const [formSubmitted, setFormSubmitted] = useState(false)

    return(
        <div className="game-form">
            <body className="game-card">
                <h2>Add A New Video Game</h2>
                {formSubmitted ? <h1>Added New Game To The Library</h1> :
                <form className="contact-form" onSubmit={(event => {
                    addGame(event)
                    setFormSubmitted(formSubmitted => !formSubmitted)
                })}>
                    <div className="form-group">
                        <label for="gamename">Game Name</label><br></br>
                        <input onChange={updateFormData} type="text" id="name" name="gamename"></input><br></br>
                    </div>
                    <div className="form-group">
                        <label for="gameimage">Game Image</label><br></br>
                        <input onChange={updateFormData} type="text" id="image" name="gameimage"></input><br></br>
                    </div>
                    <div className="form-group">
                        <label for="gamegenre">Game Genre</label><br></br>
                        <input onChange={updateFormData} type="text" id="genre" name="gamegenre"></input><br></br>
                    </div>
                    <div>
                        <label for="form-group">
                            <label for="number_of_players">Number Of Players</label><br></br>
                            <input onChange={updateFormData} type="number" id="number_of_players" name="number_of_players"></input><br></br>
                        </label>
                    </div>
                    <div>
                        <label for="form-group">
                            <label for="release_year">Release Year</label><br></br>
                            <input onChange={updateFormData} type="number" id="release_year" name="release_year"></input><br></br>
                        </label>
                    </div>
                    <div>
                        <label for="form-group">
                            <label for="description">Description</label><br></br>
                            <input onChange={updateFormData} type="text" id="description" name="description"></input><br></br>
                        </label>
                    </div>
                        <button type="submit">Add New Game</button>
                </form>}
            </body>
        </div>
    )
}





export default NewGameForm