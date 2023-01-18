import { useEffect, useState } from 'react';
import axios from 'axios';

const App = () =>  {
  const [ping, setPing] = useState(0);
  const [inputValue, setInputValue] = useState("https://ping.zenetys.com/api");
  const [interval, setInterval] = useState(1000);
  const [isRunning, setIsRunning] = useState(false);
  const onClickHandler = async(interval) => {
    // try {
    //   const startTime = Date.now();
    //   const baseUrl = inputValue;
    //   await axios.get(baseUrl, {
    //     crossDomain: true
    //   })
    //   const endTime = Date.now();
    //   setPing(endTime - startTime);
    //   setStop(false);
    // } catch (error) {
    // console.error(error.message);
    // }
    // setI
  }

  const pingServer = async () => {
    try {
        const startTime = Date.now();
        const baseUrl = inputValue;
        await axios.get(baseUrl, {
          crossDomain: true
        })
        const endTime = Date.now();
        setPing(endTime - startTime);
      } catch (error) {
      console.error(error.message);
      }
  };

  useEffect(() => {
    console.log('isrunning', isRunning);
    if (isRunning) {
        const intervalId = setInterval(() => {
          console.log('hello')
        }, 100);
        return () => clearInterval(intervalId);
    }
}, [isRunning]);

  return (
    <>
      <h1> welcome to ping app</h1>
      <input type="text" 
          value={inputValue} 
          onChange={e => setInputValue(e.target.value)}
          placeholder="https://www.google.com"
      />
      <input type="text" 
          value={interval} 
          onChange={e => setInterval(e.target.value)}
          placeholder="interval input(ms)"
      />

      <button onClick={() => setIsRunning((prev) => !prev)}>
                {isRunning ? 'Stop' : 'Start'}
      </button>
      {ping && <div> Ping: {ping} ms</div>}

    </>
  );
}

export default App;
