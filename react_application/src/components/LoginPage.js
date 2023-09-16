import { useState } from 'react'

import axios from 'axios'
import SHA256 from 'crypto-js/sha256'

import '../assets/styles/loginpage_style.css'

export default function LoginPage({setCurrentPage, setPageUsername}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
  
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const hashedPassword = SHA256(password).toString();
        
        try {
            const resLogin = await axios.post('http://localhost:5000/login', { username, password: hashedPassword });
            console.log(resLogin.data.message);
            setPageUsername(username);
            
            const resProfile = await axios.post('http://localhost:5000/checkprofile', { username });
            console.log(resProfile.data.message);
            console.log(resProfile.data.message === 'No Profile.');
            if(resProfile.data.message === 'Profile found.') setCurrentPage('MP');
            if(resProfile.data.message === "No profile.") setCurrentPage('ISP');
        } catch (error) {
            setErrorMessage(error.response.data.message);
        }
    };
  
    return (
        <div className='login-section-container'>
            <div className='login-container'>
                <form onSubmit={handleSubmit} className='login-form'>
                    <p>Login to an existing account</p>
                    
                    <input type="text" value={username} placeholder='Username' onChange={(e) => setUsername(e.target.value)} required />
                    <input type="password" value={password} placeholder='Password' onChange={(e) => setPassword(e.target.value)} required />
                    {errorMessage && <p className='error-message'>{errorMessage}</p>}
                    <button type="submit">Login</button>
                </form>
                <button onClick={() => setCurrentPage('RP')} className='register-button'>Don't have an Account?</button>
            </div>
        </div>
    );
}