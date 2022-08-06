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
import {DisplayMenuCol, DisplayMenu} from './DisplayMenu'
import Button from 'react-bootstrap/Button'
import ResultAreaCol from "./ResultArea"

import * as utils from "./calculate.js"
import * as table_utils from "./tableUtils.js"

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

  // Result Data
  const [data, setData] = useState([])
  const [style, setStyle] = useState({})
  const [showAlert, setShowAlert] = useState(false)
  const [showEmpty, setShowEmpty] = useState(false)

  function notifyParamsChange(){
    // Function that used to notify important variable changed
    // Clear the Result, and show alert screen
    if (data.length > 0){
      setData([])
      setShowAlert(true)
      setTimeout(
        ()=> setShowAlert(false),3000)  
    }  

    if (showEmpty) {
      setShowEmpty(false)
    }
  }

  function handleChapterChange(event, id){
    let temp = chapterState;
    temp[id] = event.target.checked;
    setChapterState([...temp]);
    notifyParamsChange()
  }

  function selectAllChapters() {
    setChapterState([...AllChapterState])
    notifyParamsChange()
  }

  function clearAllChapters() {
    setChapterState([...emptyChapterState])
    notifyParamsChange()
  }

  function handleTeamChange(value) {
    setTeam(value)
    notifyParamsChange()
  }

  function handleHourChange(event){
    let target = event.target;
    let value = (target.value ?
      Math.max(Number(target.min), Math.min(Number(target.max), Number(target.value))) :
      target.value);
    setHour(value);
    notifyParamsChange()
  }

  function handleMinuteChange(event){
    let target = event.target;
    let value = (target.value ?
      Math.max(Number(target.min), Math.min(Number(target.max), Number(target.value))) :
      target.value);
    setMinute(value)
    notifyParamsChange()
  }

  function handleResoureChange(event, field){
    let value = event.target.value;
    value = (value < Number(event.target.min) ? event.target.min : value);
    switch(field) {
      case "manpower": 
        setManpower(value);
        notifyParamsChange()
        console.log("manpower:",value)
        break;
      case "ammo":
        setAmmo(value)
        notifyParamsChange()
        console.log("ammo:",value)
        break;
      case "ration":
        setRation(value)
        notifyParamsChange()
        console.log("ration:",value)
        break;
      case "part":
        setPart(value)
        notifyParamsChange()
        console.log("part:",value)
        break;
      default:
        console.log("Issue");
    }    
  }

  function handleTriple(field){
    switch(field) {
      case "manpower": 
        setManpower(manpower*3)
        notifyParamsChange()
        break
      case "ammo":
        setAmmo(ammo*3)
        notifyParamsChange()
        break
      case "ration":
        setRation(ration*3)
        notifyParamsChange()
        break
      case "part":
        setPart(part*3)
        notifyParamsChange()
        break
      default:
        console.log("Issue")
    }  
  }

  function handleAllowZero(){
    setAllowZero(!allowZero)
    notifyParamsChange()
  }

  function ResetWeight() {
    setManpower(1)
    setAmmo(1)
    setRation(1)
    setPart(1)
    setAllowZero(true)
    notifyParamsChange()
  }

  function ResetItem() {
    setQuickRestoration(0)
    setQuickProduction(0)
    setDollContract(0)
    setEquipmentContract(0)
    setToken(0)

    // Force to Change value
    setShowManpower(true)
    setShowAmmo(true)
    setShowRation(true)
    setShowPart(true)
    setShowQuickRestoration(false)
    setShowQuickProduction(false)
    setShowDollContract(false)
    setShowEquipmentContract(false)
    setShowToken(false)
    setShowTotalResource(false)
    setShowWeightedValue(false)

    notifyParamsChange()
  }
  
  function ResetAll(){
    // Reset All to default
    selectAllChapters()
    
    setTeam(4)
    setHour(4)
    setMinute(0)
    
    ResetWeight()

    ResetItem()

    notifyParamsChange()
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
        notifyParamsChange()
        break
      case 'quickProduction':
        setQuickProduction(value)
        setShowQuickProduction(value !== defaultQuickProduction && value !== "")
        notifyParamsChange()
        break 
      case 'dollContract':
        setDollContract(value)
        setShowDollContract(value !== defaultDollContract && value !== "")
        notifyParamsChange()
        break
      case 'equipmentContract':
        setEquipmentContract(value)
        setShowEquipmentContract(value !== defaultEquipmentContract && value !== "")
        notifyParamsChange()
        break
      case 'token':
        setToken(value)
        setShowToken(value !== defaultToken && value !== "")
        notifyParamsChange()
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
      case "select-all":
        setShowManpower(true)
        setShowAmmo(true)
        setShowRation(true)
        setShowPart(true)
        setShowQuickRestoration(true)
        setShowQuickProduction(true)
        setShowDollContract(true)
        setShowEquipmentContract(true)
        setShowToken(true)
        setShowWeightedValue(true)
        setShowTotalResource(true)
        break
      default:
        console.log("Display Issue ,",field)
    }
  }

  function handleDisplayReset(){
    setShowManpower(true)
    setShowAmmo(true)
    setShowRation(true)
    setShowPart(true)

    setShowQuickRestoration(quickRestoration !== defaultQuickRestoration)
    setShowQuickProduction(quickProduction !== defaultQuickProduction)
    setShowDollContract(dollContract !== defaultDollContract)
    setShowEquipmentContract(equipmentContract !== defaultEquipmentContract)
    setShowToken(token !== defaultToken)

    setShowTotalResource(false)
    setShowWeightedValue(false)
  }

  function handleSubmit() {
    console.log("Submit Pressed")
    let filteredSupport = utils.filterSupport(chapterState, hour, minute)

    let temp_data = utils.calculateResult(filteredSupport, team, manpower, ammo, ration, part, allowZero, quickRestoration, quickProduction, dollContract, equipmentContract, token)
    
    let temp_style = {
      combination : table_utils.getStyleSheet(temp_data, "combination"),
      manpower: table_utils.getStyleSheet(temp_data, "manpower"),
      ammo: table_utils.getStyleSheet(temp_data, "ammo"),
      ration: table_utils.getStyleSheet(temp_data, "ration"),
      part: table_utils.getStyleSheet(temp_data, "part"),
      quickRestoration: table_utils.getStyleSheet(temp_data, "quickRestoration"),
      quickProduction: table_utils.getStyleSheet(temp_data, "quickProduction"),
      tDollContract: table_utils.getStyleSheet(temp_data, "tDollContract"),
      equipmentContract: table_utils.getStyleSheet(temp_data, "equipmentContract"),
      token: table_utils.getStyleSheet(temp_data, "token"),
      value: table_utils.getStyleSheet(temp_data, "value"),
      totalResource: table_utils.getStyleSheet(temp_data, "totalResource")
    }

    setData(temp_data)
    setStyle(temp_style)

    if (temp_data.length <= 0){
      setShowEmpty(true)
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
            token={token} handler={handleItemChange} reset={ResetItem}/>
        </Row>

        <Row className="h-100">
          <Col xs={true} className="mb-2">
            <Accordion>
              <Accordion.Item className="accordion-grid" eventKey="0">
                <Accordion.Header className="accordion-grid"><h2 className="grid-title">結果顯示選項</h2></Accordion.Header>
                <Accordion.Body>
                  <DisplayMenu
                    showManpower={showManpower} showAmmo={showAmmo} showRation={showRation} showPart={showPart}
                    showQuickRestoration={showQuickRestoration} showQuickProduction={showQuickProduction}
                    showEquipmentContract={showEquipmentContract} showDollContract={showDollContract}
                    showToken={showToken}
                    showWeightedValue={showWeightedValue} showTotalResource={showTotalResource} 
                    handler={handleDisplayChange} reset={handleDisplayReset}/>
                </Accordion.Body>   
              </Accordion.Item>
            </Accordion>
          </Col> 
        </Row>

        <Row className="h-100">
          <Col xs={true} className="mb-2">
            <div className="grid p-2">
              <Row className="text-center">
                <Col xl={{offset:1, span:4}} lg={{offset: 2, span: 2}} md={{offset: 3, span: 2}} sm={{offset: 1, span: 4}} xs={{offset:1, span:4}}>
                  <Button variant="danger" onClick={ResetAll}>全部重設</Button>
                </Col>
                <Col xl={{offset:1, span:4}} lg={{offset: 3, span: 2}} md={{offset: 1, span: 2}} sm={{offset: 2, span: 4}} xs={{offset:1, span:4}}>
                  <Button variant="success" onClick={handleSubmit}>計算</Button>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>

        {
          showAlert && 
          <Row>
            <Col>
              <div className="grid alert-grid">
                <h4 className="title caution-description">提醒</h4>
                <p className="caution-description section">偵察到參數變更，計算結果重置。</p>
                <p>此提醒3秒後消失。</p>
              </div>
            </Col>
          </Row>
        }

        {
          showEmpty && 
          <Row>
            <Col>
              <div className="grid text-center">
                <h4 className="title caution-description">未有結果</h4>
                <p className="section">未能得出後勤組合，請考慮調查部份參數的數值。</p>
              </div>
            </Col>
          </Row>
        }

        {
          data.length > 0 && 
          <Row className="h-100">
            <ResultAreaCol data={data} styleObj={style}
              showManpower={showManpower} showAmmo={showAmmo} showRation={showRation} showPart={showPart} 
              showQuickRestoration={showQuickRestoration} showQuickProduction={showQuickProduction} 
              showEquipmentContract={showEquipmentContract} showDollContract={showDollContract} 
              showToken={showToken} 
              showTotalResource={showTotalResource} showWeightedValue={showWeightedValue}/>
          </Row>
        }
       

      </Container>
      
      <hr/>
      <p>關於此測試版本，如有任何問題，請聯絡 巴哈姆特用戶 <a href="https://home.gamer.com.tw/homeindex.php?owner=darkperson">DarkPerson</a></p>

    </div>
  );
}

export default App;
