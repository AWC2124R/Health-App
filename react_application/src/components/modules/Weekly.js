import { useState, useEffect } from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import axios from 'axios'

import './../../assets/styles/weeklypage_style.css'

export default function Weekly({pageUsername}) {
  const [value, onChange] = useState(new Date());
  const [data, setData] = useState("");
  const [highlightData, setHighlightData] = useState("");
  const [buttonPressed, setButtonPressed] = useState(false);
  const [outString, setOutString] = useState("");

  const formatDate = (date) => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    
    return `${yyyy}-${mm}-${dd}`;
  };

  const fetchData = async (date) => {
    try {
      console.log(formatDate(date));
      setButtonPressed(false);
      const response = await axios.post('http://localhost:5000/getmealentry', { username: pageUsername, date: formatDate(date) });
      console.log(response.data[formatDate(date)][0]);
      setData(response.data[formatDate(date)][0]);
    } catch (error) {
      console.error('Error fetching data:', error);
      setData({});
    }
  };

  const fetchDataPython = async () => {
    try {
      const responseDB = await axios.post('http://localhost:5000/getprofile', { username: pageUsername });
      console.log(responseDB.data);

      const response = await fetch('http://100.69.245.221:5000/callGPT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({...data, ...responseDB.data})
      });
      const resp = await response.json();
      setButtonPressed(true);
      console.log(resp.message);
      setOutString(resp.message);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    const fetchDataHighlight = async () => {
      try {
        const response = await axios.post('http://localhost:5000/getmealentry', { username: pageUsername });
        setHighlightData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchDataHighlight();
    fetchData(value);
  }, [value]);

  return (
    <div>
      <Calendar
        onChange={onChange}
        value={value}
        onClickDay={(value, event) => {
          console.log('Clicked day:', value);
          fetchData(value);
        }}
        className="customCalendarWeekly"
        tileClassName={({date, view}) => {
          if(view === 'month' && highlightData[formatDate(date)] && !(formatDate(date) === formatDate(new Date()))){
            return 'highlight';
          }
        }}
      />
      <div className="uniqueBoxContainer">
        <div className="uniqueBoxContent">
          {buttonPressed ? <p>{outString.replace(/"/g, '')}</p> : <button className='button-call-gpt' onClick={fetchDataPython}>In development...</button>}
        </div>
      </div>
    </div>
  );
}