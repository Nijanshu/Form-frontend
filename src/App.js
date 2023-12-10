import './App.css';
import Form from './Components/Categorize';
import Cloze from './Components/Cloze';
import Comprehension from './Components/Comprehension';
import Otput from './Components/Otput';
import { v4 as uuid } from "uuid";

function App() {
  const unique_id = uuid();
  console.log(unique_id)

  return (
    <div>
      <Form unique_id={unique_id}/>
      <Cloze unique_id={unique_id}/>
      <Comprehension unique_id={unique_id}/>
      {/* <Otput/> */}
      <button>Submit</button>
    </div>
  );
}

export default App;
