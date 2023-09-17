import React, { useState } from 'react';
import './App.css';

import LoginPage from './components/LoginPage'
import RegisterPage from './components/RegisterPage'
import MainPage from './components/MainPage'
import InitialSurveyPage from './components/InitialSurveyPage'
import DailySurveyPage from './components/DailySurveyPage';

function Hub() {
  let displayPage = <LoginPage />;
  const [currentPage, setCurrentPage] = useState('LP');
  const [pageUsername, setPageUsername] = useState('NA');

  switch(currentPage){
    case 'LP':
      displayPage = <LoginPage setCurrentPage={setCurrentPage} setPageUsername={setPageUsername}/>;
      break;
    case 'RP':
      displayPage = <RegisterPage setCurrentPage={setCurrentPage} />;
      break;
    case 'ISP':
      displayPage = <InitialSurveyPage setCurrentPage={setCurrentPage} pageUsername={pageUsername}/>;
      break;
    case 'DSP':
      displayPage = <DailySurveyPage setCurrentPage={setCurrentPage} pageUsername={pageUsername}/>;
      break;
    case 'MP':
      displayPage = <div>
                     <MainPage pageUsername={pageUsername} setCurrentPage={setCurrentPage}/>
                    </div>;
      break;
    default:
      break;
  }

  return (
    <>
      <div className='main-background'></div>
      <div>{displayPage}</div>
    </>
  );
}

export default Hub;