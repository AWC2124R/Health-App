import { useState } from 'react'

import axios from 'axios'
import SHA256 from 'crypto-js/sha256'

import '../assets/styles/registerpage_style.css'

export default function RegisterPage({setCurrentPage}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const hashedPassword = SHA256(password).toString();
        const hashedCheckPassword = SHA256(passwordCheck).toString();

        
        if(hashedPassword == hashedCheckPassword){
            try {
                const res = await axios.post('http://localhost:5000/register', { username, password: hashedPassword });
                console.log(res.data.message);
                setCurrentPage('LP');
            } catch (error) {
                setErrorMessage(error.response.data.message);
            }
        }
        else {
            setErrorMessage('Please re-enter your password.')
        }
    };

    return (
        <div className='register-section-container'>
            <div className='register-container'>
                <form onSubmit={handleSubmit} className='register-form'>
                    <p>Don't have an account?</p>
                    <input type="text" value={username} placeholder='Username' onChange={(e) => setUsername(e.target.value)} required />
                    <input type="password" value={password} placeholder='Password' onChange={(e) => setPassword(e.target.value)} required />
                    <input type="password" value={passwordCheck} placeholder='Re-enter Password' onChange={(e) => setPasswordCheck(e.target.value)} required />
                    {errorMessage && <p className='error-message'>{errorMessage}</p>}
                    <button type="submit">Register</button>
                </form>
                <button onClick={() => setCurrentPage('LP')} className='back-button'>Back</button>
            </div>
        </div>
    );
}