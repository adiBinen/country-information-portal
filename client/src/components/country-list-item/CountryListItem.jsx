import React from 'react';
import { Link } from 'react-router-dom';
import './CountryListItem.scss';

const CountryListItem = ({ country }) => {
    return (
        <div className="country-item">
            <p>{country.name} - {country.capital}</p>
            <Link to={`/country/${country.id}`}>Details</Link>
        </div>
    )
};

export default CountryListItem;