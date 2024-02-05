import { useState, useCallback, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [len, setLen] = useState(6);
  const [numAllowed, setnumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null)
  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if (numAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%&*_"

    for (let i = 1; i <= len; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
      
    }

    setPassword(pass)


  }, [len, numAllowed, charAllowed, setPassword])
  
  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    
    window.navigator.clipboard.writeText(password)
  }, [password])
  
  useEffect(() => {
    passwordGenerator()
  }, [len, numAllowed, charAllowed, passwordGenerator])

  return (
     <>
     <div className='container'>
      <div className='pass-plate'>
         <h2>Password Generator</h2>
         <div className='pass-input-plate'> 
        <input className='pass-input' type='text' value={password} placeholder='Password' readOnly
            ref={passwordRef} />
        <button className='cpy-btn'  onClick={copyPasswordToClipboard}>Copy</button>
        </div>
        <div className='num-char-range'>
        <div> 
        <input type="range"
        min={6}
        max={100}
        value={len}
         className= "rangebtn"
         id="lenSet"
         onChange={(e) => {setLen(e.target.value)}}/>
         <label htmlFor='lenSet' className='lenset'>Length:{len}</label>
         </div>
         <div> 
          <input 
          type='checkbox' 
          
          defaultChecked={numAllowed}
          id="numInput"
          onChange={() => {
              setnumAllowed((prev) => !prev);
          }}/>
          <label htmlFor='numInput' className='numInput'>Number</label>
          </div>
          <div> 
          <input type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              onChange={() => {
                  setCharAllowed((prev) => !prev)
              }}/>
              <label htmlFor='characterInput' className='characterInput'>Character</label>
              </div>
        </div>
      </div>
     </div>
     
     </>
  );
}

export default App;
