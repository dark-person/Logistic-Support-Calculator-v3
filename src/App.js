import './App.css';
import Topbar from './Topbar'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useState} from "react"

import ChapterMenuCol from './ChapterMenu'
import TeamTimeMenuCol from './TeamTimeMenu'
import WeightMenuCol from './WeightMenu'
import EasterEggCol from './EasterEgg'
import ItemMenuCol from './ItemMenu'

let data = require("./supportData.json")

// Const Array, meaning all chapter is selected
const AllChapterState = new Array(data.chapterList.length).fill(true)

// Const Array, meaning all chapter is NOT selected
const emptyChapterState = new Array(data.chapterList.length).fill(false);

function App() {
  // chapterState: state that used by checkbox
  const [chapterState, setChapterState] = useState(AllChapterState);
  const [team, setTeam] = useState(4);
  const [hour, setHour] = useState(4);
  const [minute, setMinute] = useState(0);

  // Resource Weighting
  const [manpower, setManpower] = useState(1);
  const [ammo, setAmmo] = useState(1);
  const [ration, setRation] = useState(1);
  const [part, setPart] = useState(1);
  const [allowZero, setAllowZero] = useState(true);

  // Item Setting
  const [quickRestoration, setQuickRestoration] = useState(0)
  const [quickProduction, setQuickProduction] = useState(0)
  const [dollContract, setDollContract] = useState(0)
  const [equipmentContract, setEquipmentContract] = useState(0)
  const [token, setToken] = useState(0)

  function handleChapterChange(event, id){
    let temp = chapterState;
    temp[id] = event.target.checked;
    setChapterState([...temp]);
  }

  function selectAllChapters() {
    setChapterState([...AllChapterState])
  }

  function clearAllChapters() {
    setChapterState([...emptyChapterState])
  }

  function handleTeamChange(value) {
    setTeam(value)
  }

  function handleHourChange(event){
    let target = event.target;
    let value = (target.value ?
      Math.max(Number(target.min), Math.min(Number(target.max), Number(target.value))) :
      target.value);
    setHour(value);
  }

  function handleMinuteChange(event){
    let target = event.target;
    let value = (target.value ?
      Math.max(Number(target.min), Math.min(Number(target.max), Number(target.value))) :
      target.value);
    setMinute(value);
  }

  function handleResoureChange(event, field){
    let value = event.target.value;
    switch(field) {
      case "manpower": 
        setManpower(value);
        console.log("manpower:",value);
        break;
      case "ammo":
        setAmmo(value);
        console.log("ammo:",value);
        break;
      case "ration":
        setRation(value);
        console.log("ration:",value);
        break;
      case "part":
        setPart(value);
        console.log("part:",value);
        break;
      default:
        console.log("Issue");
    }    
  }

  function handleTriple(field){
    switch(field) {
      case "manpower": 
        setManpower(manpower*3);
        break;
      case "ammo":
        setAmmo(ammo*3);
        break;
      case "ration":
        setRation(ration*3);
        break;
      case "part":
        setPart(part*3);
        break;
      default:
        console.log("Issue");
    }  
  }

  function handleAllowZero(){
    setAllowZero(!allowZero);
  }

  function ResetWeight() {
    setManpower(1);
    setAmmo(1);
    setRation(1);
    setPart(1);
    setAllowZero(true);
  }

  return (
    <div className="App">
      <Topbar />
      <Container className="mx-auto my-auto">
        <Row className="h-100" xs={1} md={2} lg={3}>
          <ChapterMenuCol chapterState={chapterState} chapterHandler={handleChapterChange} 
            selectAllHandler={selectAllChapters} clearAllHandler={clearAllChapters}/>
          <TeamTimeMenuCol team={team} teamHandler={handleTeamChange} 
            hour={hour} minute={minute} hourHandler={handleHourChange} minuteHandler={handleMinuteChange}/>
          <WeightMenuCol manpower={manpower} ammo={ammo} ration={ration} part={part} allowZero={allowZero}
            handler={handleResoureChange} triple={handleTriple} setZero={handleAllowZero} reset={ResetWeight}/>
          <EasterEggCol />
          <ItemMenuCol />
        </Row>
      </Container>

    </div>
  );
}

export default App;
