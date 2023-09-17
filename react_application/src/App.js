import React, { useState, useEffect } from 'react';
import './App.css';

import LoginPage from './components/LoginPage'
import RegisterPage from './components/RegisterPage'
import MainPage from './components/MainPage'
import InitialSurveyPage from './components/InitialSurveyPage'
import DailySurveyPage from './components/DailySurveyPage';

function Hub() {
  const [currentPage, setCurrentPage] = useState('LP');
  const [pageUsername, setPageUsername] = useState('NA');
  const [displayPage, setDisplayPage] = useState(<LoginPage />);
  const [fadeClass, setFadeClass] = useState('fadeIn');

  useEffect(() => {
    setFadeClass('fadeOut');
    const timer = setTimeout(() => {
      let newDisplayPage;
      switch(currentPage){
        case 'LP':
          newDisplayPage = <LoginPage setCurrentPage={setCurrentPage} setPageUsername={setPageUsername}/>;
          break;
        case 'RP':
          newDisplayPage = <RegisterPage setCurrentPage={setCurrentPage} />;
          break;
        case 'ISP':
          newDisplayPage = <InitialSurveyPage setCurrentPage={setCurrentPage} pageUsername={pageUsername}/>;
          break;
        case 'DSP':
          newDisplayPage = <DailySurveyPage setCurrentPage={setCurrentPage} pageUsername={pageUsername}/>;
          break;
        case 'MP':
          newDisplayPage = <div>
                            <MainPage pageUsername={pageUsername} setCurrentPage={setCurrentPage}/>
                           </div>;
          break;
        default:
          break;
      }
      setDisplayPage(newDisplayPage);
      setFadeClass('fadeIn');
    }, 300); // Adjust the time to match your transition duration

    return () => clearTimeout(timer); // Prevent memory leaks
  }, [currentPage, pageUsername]);

  return (
    <>
      <div className='main-background'></div>
      <div className={`fadeTransition ${fadeClass}`}>
        {displayPage}
      </div>
    </>
  );
}

export default Hub;