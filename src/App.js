import './App.css';
import Topbar from './Topbar'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useState} from "react"
import ChapterMenuCol from './ChapterMenu'

let data = require("./supportData.json")

// Const Array, meaning all chapter is selected
const AllChapterState = new Array(data.chapterList.length).fill(true)

// Const Array, meaning all chapter is NOT selected
const emptyChapterState = new Array(data.chapterList.length).fill(false);

function App() {
  // chapterState: state that used by checkbox
  const [chapterState, setChapterState] = useState(AllChapterState);

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

  return (
    <div className="App">
      <Topbar />
      <Container className="mx-auto my-auto">
        <Row className="h-100" xs={1} md={2} lg={3}>
          <ChapterMenuCol chapterState={chapterState} chapterHandler={handleChapterChange} 
            selectAllHandler={selectAllChapters} clearAllHandler={clearAllChapters}/>
        </Row>
      </Container>

    </div>
  );
}

export default App;
