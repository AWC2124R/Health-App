import { useState, useEffect } from 'react'

import './../assets/styles/namecard_style.css'
import './../assets/styles/selectionwindow_style.css'
import './../assets/styles/mainpage_style.css'

import Welcome from './modules/Welcome'
import Daily from './modules/Daily'
import Weekly from './modules/Weekly'
import Profile from './modules/Profile'
import Settings from './modules/Settings'

import logo from './../assets/images/WebsiteLogo.png'

function NameCard({pageUsername}) {
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
                <p className='credit'>You are logged in as: {pageUsername}</p>
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
    const [currentModule, setCurrentModule] = useState('WELCOME');
  const [displayModule, setDisplayModule] = useState(<Welcome />);
  const [fadeClass, setFadeClass] = useState('fadeIn');

  useEffect(() => {
    setFadeClass('fadeOut');
    const timer = setTimeout(() => {
      let newDisplayModule;
      switch(currentModule){
        case 'WELCOME':
          newDisplayModule = <Welcome />;
          break;
        case 'DAILY REVIEW':
          newDisplayModule = <Daily pageUsername={pageUsername} />;
          break;
        case 'WEEKLY REVIEW':
          newDisplayModule = <Weekly pageUsername={pageUsername} />;
          break;
        case 'SETTINGS':
          newDisplayModule = <Settings setCurrentPage={setCurrentPage} />;
          break;
        case 'PROFILE':
          newDisplayModule = <Profile pageUsername={pageUsername} />;
          break;
        default:
          break;
      }
      setDisplayModule(newDisplayModule);
      setFadeClass('fadeIn');
    }, 150); // This timeout should match the transition duration defined in your CSS

    return () => clearTimeout(timer); // Clean up the timer to prevent memory leaks
  }, [currentModule]);

  return (
    <div>
      <NameCard pageUsername={pageUsername}/>
      <SelectionWindow handleModuleChange={setCurrentModule} />
      <div className={`fadeTransition ${fadeClass}`}>
        {displayModule}
      </div>
    </div>
  );
}