import { useState, useEffect } from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import axios from 'axios'

import './../../assets/styles/dailypage_style.css'

function Test() {
  const [slider1, setSlider1] = useState(0);
  const [slider2, setSlider2] = useState(0);
  const [slider3, setSlider3] = useState(0);

  const fetchData = async () => {
    try {
      const response = await fetch('http://100.69.245.221:5000/callGPT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ arg1: slider1, arg2: slider2, arg3: slider3 })
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="app">
      <div className="slider-container">
        <label>Slider 1: {slider1}</label>
        <input 
          type="range" 
          min="0" 
          max="10" 
          value={slider1} 
          onChange={(e) => setSlider1(e.target.value)} 
          className="slider"
        />
      </div>
      <div className="slider-container">
        <label>Slider 2: {slider2}</label>
        <input 
          type="range" 
          min="0" 
          max="10" 
          value={slider2} 
          onChange={(e) => setSlider2(e.target.value)} 
          className="slider"
        />
      </div>
      <div className="slider-container">
        <label>Slider 3: {slider3}</label>
        <input 
          type="range" 
          min="0" 
          max="10" 
          value={slider3} 
          onChange={(e) => setSlider3(e.target.value)} 
          className="slider"
        />
      </div>
      <button onClick={fetchData}>Fetch Data</button>
    </div>
  );
}

function MealData({data}) {
  return (
    <table>
      <thead>
        <tr>
          <th>Meal Time</th>
          <th>Meal</th>
          <th>Satiety Level</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(data).map(([mealTime, { meal, satiety }]) => (
          <tr key={mealTime}>
            <td>{mealTime.charAt(0).toUpperCase() + mealTime.slice(1)}</td>
            <td>{meal}</td>
            <td>{satiety}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function Daily({pageUsername}) {
  const [value, onChange] = useState(new Date());
  const [data, setData] = useState("");

  const formatDate = (date) => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    
    return `${yyyy}-${mm}-${dd}`;
};

  const fetchData = async (date) => {
    try {
      console.log(formatDate(date));
      const response = await axios.post('http://localhost:5000/getmealentry', { username: pageUsername, date: formatDate(date) });
      console.log(response.data[formatDate(date)][0]);
      setData(response.data[formatDate(date)][0]);
    } catch (error) {
      console.error('Error fetching data:', error);
      setData({});
    }
  };

  useEffect(() => {
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
        className="customCalendar"
      />
      <div className="uniqueBoxContainer">
        <div className="uniqueBoxContent">
          <p>ChatGPT TEXT GOES HERE</p>
        </div>
      </div>
      <MealData data={data}/>
    </div>
  );
}