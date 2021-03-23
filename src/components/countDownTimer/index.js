import React, { useState } from 'react';
import '../../App.css';

const CountDownTimer = () => {
    const [secondsParam, setSecondsParam] = useState(120);
    const [dateTimestamp, setDateTimestamp] = useState('');
    const [counterTimer, setCounterTimer] = useState('');
    const [timerInterval, setTimerInterval] = useState('');
    const [incrementalState, setIncrementalState] = useState(false);
    const [timeZoneState, setTimeZoneState] = useState('');

    const calculateTime = () => {
        let initalSeconds = Number(secondsParam);

        let dateNow = NowTimeZone(timeZoneState || 'America/Bogota');

        // Modified form date
        let milliseconds = Number(dateTimestamp.slice(0, 10)) * 1000;
        let dateOriginal = new Date(milliseconds);
        let newDate = new Date(dateOriginal);

        newDate.setSeconds(dateOriginal.getSeconds() + initalSeconds);

        // Generate new date timer value
        
        let timeDiff = (newDate.getTime() - dateNow.getTime());
        // Validate state incremental counter
        if(timeDiff <= 0){

            timeDiff =  Math.abs(timeDiff) + 1000;
            setIncrementalState(true);
        }else{

            setIncrementalState(false);
        }

        let secDiff = Math.floor((timeDiff / 1000) % 60);
        let minDiff = Math.floor((timeDiff / 60 / 1000) % 60);
        let hDiff = Math.floor(timeDiff / 3600 / 1000);
        secDiff = secDiff < 10 ? '0' + secDiff : secDiff
        minDiff = minDiff < 10 ? '0' + minDiff : minDiff
        hDiff = hDiff == 0 ? '' : hDiff < 10 ? '0' + hDiff + ':' : hDiff + ':'
        let timer = `${hDiff}${minDiff}:${secDiff}`;
        setCounterTimer(timer);
    }

    const counter = async () => {
        clearInterval(timerInterval);
        await calculateTime();
        setTimerInterval(setInterval(async () => await calculateTime(), 1000));
    }

    const NowTimeZone = (timeZone) => {
        let nowLocal = new Date();
        return  new Date(nowLocal.toLocaleString('en-US', {
            timeZone
        }))
    }

    return (
        <div className="App">
            <div>
                <label>Segundos adicionales: </label>
                <input type="number" value={secondsParam} onChange={(e) => setSecondsParam(e.target.value)} />
                <br />
                <label>Unix Timestamp: </label>
                <input type="number" value={dateTimestamp} onChange={(e) => setDateTimestamp(e.target.value)} />
                <br />
                <label>Zona horaria: </label>
                <input type="text" value={timeZoneState} onChange={(e) => setTimeZoneState(e.target.value)} />
                {secondsParam > 0 &&
                    <div>
                        <button onClick={counter}>Iniciar</button>
                        <br />
                        <span style={incrementalState ? { color: '#FF0000' } : { color: '#000000' }}>{counterTimer}</span>
                    </div>
                }
            </div>
        </div>
    );
}

export default CountDownTimer;
