import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2px;
`
const FormGroup = styled.div`
  position: relative;
  display: flex;
`

const SpanText = styled.span`
  text-align: center;
  padding: 8px 12px;
  font-size: 14px;
  line-height: 25px;
  color: #99A3BA;
  background-color:#EEF4FF;
  border: 1px solid  #CDD9ED;
  border-radius: 6px 0px 0px 6px;
`

const InputFied = styled.input`
  position: relative;
  z-index: 1;
  flex: 1 1 auto;
  width: 1%;
  margin-top: 0;
  margin-bottom: 0;
  border: 1px solid  #CDD9ED;
  border-radius: 0px 6px 6px 0px;
`

const Button  = styled.div`
  align-items: center;
  background-clip: padding-box;
  background-color: #4c88f5;
  border: 1px solid transparent;
  border-radius: .25rem;
  box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: inline-flex;
  font-family: system-ui,-apple-system,system-ui,"Helvetica Neue",Helvetica,Arial,sans-serif;
  font-size: 16px;
  font-weight: 600;
  justify-content: center;
  line-height: 1.25;
  margin: 0;
  min-height: 3rem;
  padding: calc(.875rem - 1px) calc(1.5rem - 1px);
  position: relative;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: baseline;
  width: auto;

&:hover {
  transform: translateY(-1px);
}

&:active {
  background-color: #c85000;
  box-shadow: rgba(0, 0, 0, .06) 0 2px 4px;
  transform: translateY(0);
}
`

const App = () =>  {
  const [ping, setPing] = useState(null);
  const [inputValue, setInputValue] = useState("ping.zenetys.com/api");
  const [interval, setInterval] = useState(1000);
  const onClickHandler = async(interval) => {
    try {
      console.log(inputValue);
      const startTime = Date.now();
      const baseUrl = `https://${inputValue}`
      await axios.get(baseUrl, {
        crossDomain: true
      })
      const endTime = Date.now();
      if((endTime - startTime) > interval) {
        toast.error('Request took too much time to be responsed!');
        setPing(null);
      }
      else {
        setPing(endTime - startTime);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }


  return (
    <>
      <Container>
      <ToastContainer/>
      <h1> welcome to ping app</h1>
      <FormGroup>
        <SpanText> https://</SpanText>
        <InputFied type="text" 
            value={inputValue} 
            onChange={e => setInputValue(e.target.value)}
            placeholder="https://ping.zenetys.com/api"
        />
      </FormGroup>
      
      <FormGroup>
        <SpanText> interval </SpanText>
        <InputFied type="text" 
            value={interval} 
            onChange={e => setInterval(e.target.value)}
            placeholder="1000 ms"
        />
      </FormGroup>

      <Button onClick={() => onClickHandler(interval)}>
                Ping
      </Button>
      {ping && <div> Ping: {ping} ms</div>}
      </Container>
      

    </>
  );
}

export default App;
