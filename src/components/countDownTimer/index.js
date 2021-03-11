import React, { useState } from 'react';
import '../../App.css';

const CountDownTimer = () => {
    const [secondsParam, setSecondsParam] = useState(120);
    const [dateTimestamp, setDateTimestamp] = useState('');
    const [counterTimer, setCounterTimer] = useState('');
    const [timerInterval, setTimerInterval] = useState('');
    const [incrementalState, setIncrementalState] = useState(false);

    const calculateTime = () => {
        let initalSeconds = Number(secondsParam);

        // Modified seconds to minutes
        let secondsToMinutes = Math.floor(initalSeconds / 60);
        let dateNow = new Date();

        // Modified form date
        let milliseconds = Number(dateTimestamp.slice(0, 10)) * 1000;
        let dateOriginal = new Date(milliseconds);
        let newDate = new Date(dateOriginal);

        newDate.setMinutes(dateOriginal.getMinutes() + secondsToMinutes);

        // Generate new date timer value
        let timeDiff = Math.abs(newDate.getTime() - dateNow.getTime());
        // Validate state incremental counter
        newDate.getTime() < dateNow.getTime() ? setIncrementalState(true) : setIncrementalState(false);

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

    return (
        <div className="App">
            <div>
                <label>Segundos adicionales: </label>
                <input type="number" value={secondsParam} onChange={(e) => setSecondsParam(e.target.value)} />
                <br />
                <label>Unix Timestamp: </label>
                <input type="number" value={dateTimestamp} onChange={(e) => setDateTimestamp(e.target.value)} />
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
