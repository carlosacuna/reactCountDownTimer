import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [secondsParam, setSecondsParam] = useState(120);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [counterTimer, setCounterTimer] = useState('');



  const calculateTime = () => {
    let initalSeconds = Number(secondsParam);
     
    // Modified seconds to minutes
    var secondsToMinutes = Math.floor(initalSeconds / 60);
    var dateNow = new Date();

    // Modified form date 
    var dateOriginal = new Date(date+' '+time);    
    var newDate  = new Date(dateOriginal);

    newDate.setMinutes(dateOriginal.getMinutes() + secondsToMinutes);    

    // Generate new date timer value
    let timeDiff = Math.abs(newDate.getTime() - dateNow.getTime());
    var secDiff = Math.floor((timeDiff / 1000) % 60);
    var minDiff = Math.floor(timeDiff / 60 / 1000);
    var hDiff = Math.floor(timeDiff / 3600 / 1000);
    secDiff = secDiff < 10 ? '0'+secDiff : secDiff
    minDiff = minDiff < 10 ? '0'+minDiff : minDiff
    hDiff = hDiff == 0 ? '' : hDiff < 10  ? '0'+hDiff+':' : hDiff+':'
    let timer = `${hDiff}${minDiff}:${secDiff}`;
    setCounterTimer(timer);
  }

  const counter = async () => {
    await calculateTime()
    setInterval(async () => await calculateTime(), 1000);
  }

  return (
    <div className="App">
      <div>
        <label>Secundos: </label>
        <input type="number" value={secondsParam} onChange={(e) => setSecondsParam(e.target.value)} />
        <br />
        <label>Dia: </label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <label>Hora: </label>
        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />        
          {secondsParam > 0 && date !== '' && time !== '' &&
            <div>
              <button onClick={counter}>Iniciar</button>
              <br />
              <span>{counterTimer}</span>              
            </div>
          }
      </div>
    </div>
  );
}

export default App;
