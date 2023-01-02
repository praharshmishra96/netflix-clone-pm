import React, { useState, createContext } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LoginScreen from './components/LoginScreen';
import HomeScreen from './components/HomeScreen';
import TvShowsScreen from './components/TvShowsScreen';
import MoviesScreen from './components/MoviesScreen';
import MyListScreen from './components/MyListScreen';
import Player from './components/Player';
import { useSelector } from "react-redux";
import { selectUser } from "./features/user/userSlice";

export const ToggleContext = createContext();

function App() {
  const user = useSelector(selectUser);
  const [selectedMovie, setSelectedMovie] = useState(null);

  return (
    <div className="App">
      <Router>
        {!user ? (
          <LoginScreen />
        ): (
          <Routes>
            <Route path="/" element={
              <ToggleContext.Provider value={{ selectedMovie, setSelectedMovie }}>
                <HomeScreen />
              </ToggleContext.Provider>
            } />
            <Route path="/tv" element={
              <ToggleContext.Provider value={{ selectedMovie, setSelectedMovie }}>
                <TvShowsScreen />
              </ToggleContext.Provider>
            } />
            <Route path="/movies" element={
              <ToggleContext.Provider value={{ selectedMovie, setSelectedMovie }}>
                <MoviesScreen />
              </ToggleContext.Provider>
            } />
            <Route path="/my-list" element={<MyListScreen />} />
            <Route path="/trailer" element={<Player />} />
          </Routes>
        )}
      </Router>
    </div>
  );
}

export default App;
