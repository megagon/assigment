import React from 'react';
import './App.css';
import { CalendarFilter } from './features/calendar/Calendar';
import { MoonCalendar } from './features/globe/Globe';
import { Loader } from './features/loader/Loader';
import { SelectedLaunchCard } from './features/selectedLaunchCard/selectedLaunchCard';

function App() {
  return (
    <div className="App">
      <CalendarFilter />
      <MoonCalendar />
      <SelectedLaunchCard />
      <Loader />
    </div>
  );
}

export default App;
