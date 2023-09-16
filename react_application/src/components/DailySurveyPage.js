import { useState } from 'react'

import axios from 'axios'

import '../assets/styles/dailysurveypage_style.css'

export default function DailySurveyPage() {
    const [username, setUsername] = useState(''); // Add this line to hold the username
    const [date, setDate] = useState(''); // Add this line to hold the date
    const [mealData, setMealData] = useState({
        breakfast: { meal: '', satiety: '1' },
        lunch: { meal: '', satiety: '1' },
        dinner: { meal: '', satiety: '1' },
        snack: { meal: '', satiety: '1' },
    });

    const handleInputChange = (mealType, field) => (event) => {
    setMealData({
        ...mealData,
        [mealType]: {
        ...mealData[mealType],
        [field]: event.target.value,
        },
    });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        // Create a data object to send in the POST request
        const data = {
          username,
          date,
          meals: mealData,
        };
    
        try {
          // Make the POST request to the /addmealentry endpoint
          const response = await fetch('http://localhost:5000/addmealentry', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });
    
          const responseData = await response.json();
    
          console.log(responseData);
        } catch (error) {
          console.error('Error:', error);
        }
      };
    

    return (
    <div className="survey-section-container">
        <div className="survey-container">
        <form className="survey-form" onSubmit={handleSubmit}>
            {['breakfast', 'lunch', 'dinner', 'snack'].map((mealType) => (
            <div key={mealType}>
                <h2>{mealType.charAt(0).toUpperCase() + mealType.slice(1)}</h2>
                <div>
                <label>
                    Meal:
                    <input type="text" value={mealData[mealType].meal} onChange={handleInputChange(mealType, 'meal')} />
                </label>
                </div>
                <div>
                <label>
                    Satiety:
                    <select value={mealData[mealType].satiety} onChange={handleInputChange(mealType, 'satiety')}>
                    {[1, 2, 3, 4, 5].map((level) => (
                        <option key={level} value={level}>
                        {level}
                        </option>
                    ))}
                    </select>
                </label>
                </div>
            </div>
            ))}
            <button type="submit">Submit</button>
        </form>
        </div>
    </div>
    );
}