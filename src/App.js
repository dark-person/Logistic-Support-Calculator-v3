import './App.css';
import Topbar from './Topbar'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Accordion from 'react-bootstrap/Accordion'
import {useState} from "react"

import ChapterMenuCol from './ChapterMenu'
import TeamTimeMenuCol from './TeamTimeMenu'
import WeightMenuCol from './WeightMenu'
import EasterEggCol from './EasterEgg'
import ItemMenuCol from './ItemMenu'
import DisplayMenuCol from './DisplayMenu'


let data = require("./supportData.json")

// Const Array, meaning all chapter is selected
const AllChapterState = new Array(data.chapterList.length).fill(true)

// Const Array, meaning all chapter is NOT selected
const emptyChapterState = new Array(data.chapterList.length).fill(false);

// Default Value
const defaultTeam = 4
const defaultHour = 4
const defaultMinute = 0
// Resource is set as default show for DisplayMenu
const defaultQuickRestoration = 0
const defaultQuickProduction = 0
const defaultDollContract = 0
const defaultEquipmentContract = 0
const defaultToken = 0

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

  // Display Setting
  const [showManpower, setShowManpower] = useState(true)
  const [showAmmo, setShowAmmo] = useState(true)
  const [showRation, setShowRation] = useState(true)
  const [showPart, setShowPart] = useState(true)
  const [showQuickRestoration, setShowQuickRestoration] = useState(false)
  const [showQuickProduction, setShowQuickProduction] = useState(false)
  const [showDollContract, setShowDollContract] = useState(false)
  const [showEquipmentContract, setShowEquipmentContract] = useState(false)
  const [showToken, setShowToken] = useState(false)
  const [showTotalResource, setShowTotalResource] = useState(false)
  const [showWeightedValue, setShowWeightedValue] = useState(false)

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
    value = (value < Number(event.target.min) ? event.target.min : value);
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

  function handleItemChange(event, field){
    let target = event.target;
    let value = (target.value ?
      Math.max(Number(target.min), Math.min(Number(target.max), Number(target.value))) :
      target.value);

    switch(field){
      case 'quickRestoration' :
        setQuickRestoration(value)
        setShowQuickRestoration(value !== defaultQuickRestoration && value !== "")
        break
      case 'quickProduction':
        setQuickProduction(value)
        setShowQuickProduction(value !== defaultQuickProduction && value !== "")
        break 
      case 'dollContract':
        setDollContract(value)
        setShowDollContract(value !== defaultDollContract && value !== "")
        break
      case 'equipmentContract':
        setEquipmentContract(value)
        setShowEquipmentContract(value !== defaultEquipmentContract && value !== "")
        break
      case 'token':
        setToken(value)
        setShowToken(value !== defaultToken && value !== "")
        break
      default:
        console.log("Unknown Error on function handleItemChange", field)
    }
  }

  function handleDisplayChange(event, field){
    switch(field) {
      case "manpower" : 
        setShowManpower(event.target.checked) 
        break
      case "ammo": 
        setShowAmmo(event.target.checked)
        break
      case "ration":
        setShowRation(event.target.checked)
        break
      case "part":
        setShowPart(event.target.checked)
        break
      case "quickRestoration":
        setShowQuickRestoration(event.target.checked)
        break
      case "quickProduction":
        setShowQuickProduction(event.target.checked)
        break
      case "equipmentContract":
        setShowEquipmentContract(event.target.checked)
        break
      case "dollContract":
        setShowDollContract(event.target.checked)
        break
      case "token":
        setShowToken(event.target.checked)
        break
      case "weighted-value":
        setShowWeightedValue(event.target.checked)
        break
      case "total-resource":
        setShowTotalResource(event.target.checked)
        break
      default:
        console.log("Display Issue ,",field)
    }
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
        </Row>
        <Row className="h-100">
          <ItemMenuCol quickRestoration={quickRestoration} quickProduction={quickProduction}
            equipmentContract={equipmentContract} dollContract={dollContract}
            token={token} handler={handleItemChange}/>
        </Row>
        <Row className="h-100">
          <Accordion defaultActiveKey="0">
            <Accordion.Item className="dark-grid" eventKey="0">
              <Accordion.Header className="dark-grid"><h2 className="grid-title">結果顯示選項</h2></Accordion.Header>
              <Accordion.Body>
                <DisplayMenuCol 
                  showManpower={showManpower} showAmmo={showAmmo} showRation={showRation} showPart={showPart}
                  showQuickRestoration={showQuickRestoration} showQuickProduction={showQuickProduction}
                  showEquipmentContract={showEquipmentContract} showDollContract={showDollContract}
                  showToken={showToken}
                  showWeightedValue={showWeightedValue} showTotalResource={showTotalResource} 
                  handler={handleDisplayChange}/>
              </Accordion.Body>   
            </Accordion.Item>
          </Accordion>
        </Row>
      </Container>

    </div>
  );
}

export default App;
