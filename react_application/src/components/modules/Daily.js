import { useState, useEffect } from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import axios from 'axios'

import './../../assets/styles/dailypage_style.css'

function MealEntryComponent({pageUsername, date}) {
  const [data, setData] = useState({
    breakfast: { meal: '', satiety: '1' },
    lunch: { meal: '', satiety: '1' },
    dinner: { meal: '', satiety: '1' },
    snack: { meal: '', satiety: '1' },
  });

  const formatDate = (date) => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    
    return `${yyyy}-${mm}-${dd}`;
  };

  const handleInputChange = (mealTime, field, value) => {
    setData(prevData => ({
      ...prevData,
      [mealTime]: {
        ...prevData[mealTime],
        [field]: value,
      },
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    const dateString = formatDate(date);

    const dataJSON = {
        username: pageUsername,
        date: dateString,
        mealEntry: data,
    };
    console.log(dataJSON);
    try {
      console.log("HELLO");
      const response = await axios.post('http://localhost:5000/addmealentry', dataJSON);
      console.log("HELLO");
    } catch (error) {
      console.error('Error:', error);
  }
  };

  return (
    <form className="meal-entry-form" onSubmit={handleSubmit}>
      <div className="meal-entry-container">
        {Object.entries(data).map(([mealTime, { meal, satiety }]) => (
          <div key={mealTime} className="meal-entry">
            <div className="meal-time">{mealTime.charAt(0).toUpperCase() + mealTime.slice(1)}</div>
            <input 
              type="text" 
              placeholder="Meal"
              value={meal} 
              onChange={(e) => handleInputChange(mealTime, 'meal', e.target.value)} 
              className="meal-input"
            />
            <select 
              value={satiety} 
              onChange={(e) => handleInputChange(mealTime, 'satiety', e.target.value)} 
              className="satiety-input"
            >
              {[1, 2, 3, 4, 5].map(value => (
                <option key={value} value={value}>{value}</option>
              ))}
            </select>
          </div>
        ))}
      </div>
      <button type="submit" className="submit-button">Submit</button>
    </form>
  );
}

function MealData({data, setData, pageUsername, date}) {
  const formatDate = (date) => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    
    return `${yyyy}-${mm}-${dd}`;
  };

  const handleSubmit = async() => {
    try{
      const response = await axios.post('http://localhost:5000/deletemealentry', {username: pageUsername, date: formatDate(date)});
      setData("");
    } catch(error) {
      console.error('Error:', error);
    }
  }

  return (
    <div>
      <button onClick={handleSubmit} className='buttonStyle'>Delete Data</button>
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
    </div>
  );
}

export default function Daily({pageUsername}) {
  const [value, onChange] = useState(new Date());
  const [data, setData] = useState("");
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
          {buttonPressed ? <p>{outString.replace(/"/g, '')}</p> : <button className='button-call-gpt' onClick={fetchDataPython}>Call GPT-4</button>}
        </div>
      </div>
      {data === undefined || Object.keys(data).length === 0  ? <MealEntryComponent pageUsername={pageUsername} date={value}/> : <MealData data={data} setData={setData} pageUsername={pageUsername} date={value}/>}
    </div>
  );
}