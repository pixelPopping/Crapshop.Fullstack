import { useState, useEffect } from "react";
import  formatTime  from "../../utils/formatTime.jsx";

const DigitalClock = () => {
    const [clockTime, setClockTime] = useState(formatTime());

    useEffect(() => {
        const interval = setInterval(() => {
            setClockTime(formatTime());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return <div>{clockTime}</div>;
};

export default DigitalClock;
