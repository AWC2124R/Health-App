import { useState } from 'react'

import axios from 'axios'

import '../assets/styles/initialsurveypage_style.css'

export default function InitialSurveyPage({setCurrentPage, pageUsername}) {
    const [formData, setFormData] = useState({
        age: "",
        gender: "",
        height: "",
        weight: "",
        ethnicity: "",
        goals: "",
    });
    const [errorMessage, setErrorMessage] = useState('');
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        const { age, gender, height, weight, ethnicity, goals } = formData;

        try {
            const resUpdateProfile = await axios.post('http://localhost:5000/createprofile', { username: pageUsername, age, gender, height, weight, ethnicity, goals });
            console.log(resUpdateProfile.data.message);
            setCurrentPage('DSP');
        } catch (error) {
          
        }
    };

    return (
        <div className="survey-section-container">
          <div className="survey-container">
            <form onSubmit={handleSubmit} className="survey-form">
              <h2>Survey</h2>
              <div>
                <label>
                  Age:
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div>
                <label>
                  Gender:
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                  >
                    <option value="" disabled>
                      Select your gender
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </label>
              </div>
              <div>
                <label>
                  Height (cm):
                  <input
                    type="number"
                    name="height"
                    value={formData.height}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div>
                <label>
                  Weight (kg):
                  <input
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div>
                <label>
                  Ethnicity:
                  <select
                    name="ethnicity"
                    value={formData.ethnicity}
                    onChange={handleChange}
                  >
                    <option value="" disabled>
                      Select your ethnicity
                    </option>
                    <option value="asian">Asian</option>
                    <option value="black">Black</option>
                    <option value="white">White</option>
                    <option value="hispanic">Hispanic</option>
                    <option value="other">Other</option>
                  </select>
                </label>
              </div>
              <div>
                <label>
                  Goals:
                  <textarea
                    name="goals"
                    value={formData.goals}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <button type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      );
};