import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchCountries } from '../services/countryService';

const CountriesOverview = () => {
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        fetchCountries()
            .then(setCountries)
            .catch(error => console.error('Error:', error));
    }, []);

    return (
        <div className="overview">
            <h1>Countries Overview</h1>
            <ul>
                {countries.map(country => (
                    <li key={country.id}>
                        {country.name} - {country.capital}
                        <Link to={`/country/${country.id}`}>Details</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CountriesOverview;
