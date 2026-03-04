import './App.css'
import prims from 'prismjs'
import { useState,useEffect } from 'react'
import editor from 'react-simple-code-editor'
import axios from 'axios'

import 'prismjs/themes/prism-tomorrow.css'
import Editor from 'react-simple-code-editor'

function App() {
  const[count,setCount]=useState(0);
  const[code,setCode]= useState(`function sum(){
    return 1+1
    }`)

  useEffect(()=>{
    prims.highlightAll()
  })

async function reviewCode() {

  const response = await axios.post('http://localhost:3000/ai/get-response',{code})
  console.log(response.data)
}
  


  return (
    <>
    <main>
      <div className="left">
        <div className="code">
         <Editor
         value={code}
         onValueChange={code =>setCode(code)}
         highlight={code =>prims.highlight(code, prims.languages.javascript,"javascript")}
         padding={10}
         style={{
          width:"100%",
          height:"100%",
          borderRadius:"5px",
          border:"1px soild #ddd",
          backgroundColor:"#f5f5f5",
          fontSize:12,
          fontFamily:'"Fira code","Fira Mono",monospace',
          
         }}/>
        </div>
        <div  onClick={reviewCode}
         className="review">Review</div>
      </div>
      <div className="right">

      </div>
      </main>  
    </>
  )
}

export default App
