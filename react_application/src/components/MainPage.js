import { useState, useEffect } from 'react'

import './../assets/styles/namecard_style.css'
import './../assets/styles/selectionwindow_style.css'

import Welcome from './modules/Welcome'
import Daily from './modules/Daily'
import Weekly from './modules/Weekly'
import Profile from './modules/Profile'
import Settings from './modules/Settings'

import logo from './../assets/images/WebsiteLogo.png'

function NameCard() {
    const [date, setDate] = useState(new Date());
  
    function refreshClock() {
      setDate(new Date());
    }
  
    useEffect(() => {
        const timerId = setInterval(refreshClock, 1000);
        return function cleanup() {
            clearInterval(timerId);
        };
    }, []);
  
    function formatDate(date) {
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
  
        if (month < 10) month = '0' + month;
        if (day < 10) day = '0' + day;
      
        return `${year}.${month}.${day}`;
    }
  
    return (
        <>
            <div className='namecard-background' />
            
            <img className='logo' alt='Logo' src={logo}></img>
    
            <div className='credit-container'>
                <p className='credit'></p>
            </div>
            
            <div className='date-time-container'>
                <p className='date'>{formatDate(date)}</p>
                <p className='time'>{date.toLocaleTimeString('it-IT')}</p>
            </div>
        </>
    );
}
  
function SelectionWindow({handleModuleChange}) {
    const buttons = ['WELCOME', 'DAILY REVIEW', 'WEEKLY REVIEW', 'PROFILE', 'SETTINGS'];
  
    return (
        <>
            <div className='selectionwindow-background' />
            <div className='button-container'>
            {buttons.map((button, index) => (
                <button key={index} className='button-item' onClick={() => handleModuleChange(button)}>
                    {button}
                </button>
            ))}
            </div>
        </>
    );
}

export default function MainPage({pageUsername, setCurrentPage}) {
    let displayModule = <Welcome />;
    const [currentModule, setCurrentModule] = useState('TDL');

    switch(currentModule){
        case 'WELCOME':
            displayModule = <Welcome />;
            break;
        case 'DAILY REVIEW':
            displayModule = <Daily pageUsername={pageUsername} />;
            break;
        case 'WEEKLY REVIEW':
            displayModule = <Weekly />;
            break;
        case 'SETTINGS':
            displayModule = <Settings setCurrentPage={setCurrentPage}/>;
            break;
        case 'PROFILE':
            displayModule = <Profile pageUsername={pageUsername}/>;
        default:
            break;
    }

    return (
        <div>
            <NameCard />
            <SelectionWindow handleModuleChange={setCurrentModule} />
            <div>
                {displayModule}
            </div>
        </div>
    );
}