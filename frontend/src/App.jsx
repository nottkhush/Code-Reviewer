import './App.css';
import "prismjs/themes/prism-tomorrow.css"; // Dark mode theme for Prism.js
import prism from "prismjs"; // Prism.js for syntax highlighting
import { useEffect, useState } from "react"; // React hooks
import Editor from "react-simple-code-editor"; // Code editor component
import axios from "axios";
import Markdown from "react-markdown";

function App() {
  const [ code, setcode ] = useState(`function sum(){
  return 1+1;
}`)

  const [review, setReview] = useState(``);

  useEffect(()=>{
    prism.highlightAll()
  }, []);

  async function reviewCode(){
    const response = await axios.post('http://localhost:3000/ai/get-review', { code });

    setReview(response.data);
  }
  return (
   <main>
    <div className="left">
      <div className="code">
        <Editor
          value={code}
          onValueChange={(code) => setcode(code)}
          highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
          padding={10}
          style={{
            fontSize: 16,
            border: "1px solid #ddd",
            borderRadius: "5px",
            height: "100%",
            width: "100%"
          }}
        />
      </div>
      <div
      onClick={reviewCode}
      className="reviewBtn">Review</div>
    </div>
    <div className="right">
      <Markdown>{review}</Markdown>
    </div>
   </main>
  )
}



export default App
