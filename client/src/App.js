import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CountriesOverview from './components/CountriesOverview';
import CountryDetails from './components/CountryDetails';

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
