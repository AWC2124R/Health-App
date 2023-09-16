import React, { useState } from 'react';
import './App.css';

function App() {
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

export default App;