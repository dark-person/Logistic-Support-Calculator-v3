import './App.css';
import Topbar from './Topbar'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useState} from "react"
import ChapterMenuCol from './ChapterMenu'
import TeamTimeMenuCol from './TeamTimeMenu'

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

  return (
    <div className="App">
      <Topbar />
      <Container className="mx-auto my-auto">
        <Row className="h-100" xs={1} md={2} lg={3}>
          <ChapterMenuCol chapterState={chapterState} chapterHandler={handleChapterChange} 
            selectAllHandler={selectAllChapters} clearAllHandler={clearAllChapters}/>
          <TeamTimeMenuCol team={team} teamHandler={handleTeamChange} 
            hour={hour} minute={minute} hourHandler={handleHourChange} minuteHandler={handleMinuteChange}/>
        </Row>
      </Container>

    </div>
  );
}

export default App;
