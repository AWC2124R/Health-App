import { useState } from 'react'

import axios from 'axios'

import '../assets/styles/dailysurveypage_style.css'

export default function DailySurveyPage({setCurrentPage, pageUsername}) {
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

    const formatDate = (date) => {
        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-11, hence adding 1
        const dd = String(date.getDate()).padStart(2, '0');
        
        return `${yyyy}-${mm}-${dd}`;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const date = new Date(); 
        const dateString = formatDate(date);

        const data = {
            username: pageUsername,
            date: dateString,
            mealEntry: mealData,
        };
    
        try {
            const response = await axios.post('http://localhost:5000/addmealentry', data);
            const responseLogin = await axios.post('http://localhost:5000/updatelogintoday', { username: pageUsername });

            setCurrentPage('MP');
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