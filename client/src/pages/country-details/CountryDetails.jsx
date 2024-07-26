import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCountry, updateCountry } from '../../services/countryService';
import './CountryDetails.scss';

const CountryDetails = () => {
    const { id } = useParams();
    const [country, setCountry] = useState(null);

    useEffect(() => {
        fetchCountry(id)
            .then(setCountry)
            .catch(error => console.error('Error:', error));
    }, [id]);

    const handleUpdate = () => {
        updateCountry(id, {
            capital: country.capital,
            population: country.population,
        })
            .then(setCountry)
            .catch(error => console.error('Error:', error));
    };

    if (!country) return <div>Loading...</div>;

    return (
        <div className="details">
            <h1>{country.name}</h1>
            <img src={country.flagURL} alt={`${country.name} flag`} />
            <p>Capital: <input value={country.capital} onChange={(e) => setCountry({...country, capital: e.target.value})} /></p>
            <p>Population: <input value={country.population} onChange={(e) => setCountry({...country, population: e.target.value})} /></p>
            <button onClick={handleUpdate}>Update</button>
        </div>
    );
};

export default CountryDetails;
