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

function App() {

  const history = useHistory()

  const [devices, setDevices] = useState([])
  const [games, setGames] = useState([])
  const [developers, setDevelopers] = useState([])
  const [focusDevice, setFocusDevice] = useState('')
  const [focusDeveloper, setFocusDeveloper] = useState('')
  const [focusGame, setFocusGame] = useState('')
  const [focusManufacturer, setFocusManufacturer] = useState('')

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
          <GameList games={games} gameFocusSelector={gameFocusSelector} />
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
      </Switch>
      <Footer />
    </div>
  );
}

export default App;