// import logo from './logo.svg';
// import './App.css';

import { useState } from "react";



const App = () =>  {
  const [ value, setValue ] = useState("")
  const [error, setError] = useState("")
  const [chatHistory, setChatHistory] = useState([])

  const surpriseOptions = [
    'Who won the Latest Nobel Peace Prize?',
    'Where does pizza come from',
    'How do you make Sharwarmah'
  ]

  const surprise = () => {
    const randomValue = surpriseOptions[Math.floor(Math.random() * surpriseOptions.length)]
    setValue(randomValue)
  }



  const getResponse = async () => {
    if (!value)  {
      setError("Error! Please ask a question")
      return
    }
    try {
      const options = {
        method: 'POST',
        body: JSON.stringify({
          history: chatHistory,
          message: value
        }),
        headers: {
          'Content-Type' : 'application/json'
        }
      }
    const response = await fetch('http://localhost:8000/gemini', options)
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Server error");
  }
    const data = await response.text()
    console.log("Gemini Response", data)
  //   setChatHistory(oldChatHistory => [...oldChatHistory, {
  //     role: 'user',
  //     parts: value
  //   },
  //   {
  //     role: 'model',
  //     parts: data
  //   }
  // ])
  setChatHistory(prevChatHistory => [ // Correct way to update state based on previous state
                ...prevChatHistory,
                { role: 'user', parts: value },
                { role: 'model', parts: data }
            ]);
    setValue("")

    } catch (error) {
      console.error(error)
      setError("Something went wrong, Try again!")

    }
  }
  const clear = () => {
    setValue("")
    setError("")
    setChatHistory([])
  }
  return (
    <div className="app">
        <p>
          What do you want to know?
        <button className="surprise" onClick={surprise} disabled={!chatHistory}>
          Suprise Me
        </button>
        </p>
        <div className="input-container">
          <input 
          value={value}
          placeholder="Ask Me anything...?"
          onChange={(e) => setValue(e.target.value)}
           />
        {!error && <button onClick={getResponse}>Ask me</button> }
        {error && <button onClick={clear}>Clear</button> }
        </div>

        {error && <p>{error}</p> }

        <div className="search-result">
          { chatHistory.map((chatItem, index) => (<div key={index}>
          <p className="answer"> {chatItem.role} : {chatItem.parts} </p>

          </div>))}
        </div>


   
    </div>
  );
}

export default App;
