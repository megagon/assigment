import React from 'react';
import './App.css';
import { ToastContainer } from 'react-toastify';
import { CalendarFilter } from './features/calendar/Calendar';
import { MoonCalendar } from './features/globe/Globe';
import { Loader } from './features/loader/Loader';
import { SelectedLaunchCard } from './features/selectedLaunchCard/selectedLaunchCard';
import { useToast } from './features/toast/Toast';
import { SuccessFilter } from './features/successFilter/Filter';

function App() {
  useToast();
  return (
    <div className="App">
      <div className="filtersContainer">
        <CalendarFilter />
        <SuccessFilter />
      </div>
      <MoonCalendar />
      <SelectedLaunchCard />
      <Loader />
      <ToastContainer />
    </div>
  );
}

export default App;
