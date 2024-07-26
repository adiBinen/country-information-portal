import React, { useEffect, useState } from 'react';
import { fetchCountries } from '../../services/countryService';
import CountryListItem from '../../components/country-list-item/CountryListItem';
import './CountriesOverview.scss';

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
                        <CountryListItem country={country}/>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CountriesOverview;
