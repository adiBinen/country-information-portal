import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CountriesOverview from './pages/countries-overview/CountriesOverview';
import CountryDetails from './pages/country-details/CountryDetails';
import './assets/styles.scss';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<CountriesOverview />} />
                <Route path="/country/:id" element={<CountryDetails />} />
            </Routes>
        </Router>
    );
}

export default App;
