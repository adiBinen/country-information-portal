import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCountry, updateCountry } from '../../services/countryService';
import './CountryDetails.scss';

const CountryDetails = () => {
    const { id } = useParams();
    const [country, setCountry] = useState(null);

    useEffect(() => {
        const getCountryDetails = async () => {
            try {
                const fetchedCountry = await fetchCountry(id);
                setCountry(fetchedCountry);
            } catch (error) {
                console.error('Error fetching country details:', error);
            }
        };

        getCountryDetails();
    }, [id]);

    const handleUpdate = async () => {
        try {
            const updatedCountry = await updateCountry(id, {
                capital: country.capital,
                population: country.population,
            });
            setCountry(updatedCountry);
        } catch (error) {
            console.error('Error updating country details:', error);
        }
    };

    const handleChange = (field) => (event) => {
        setCountry((prevCountry) => ({
            ...prevCountry,
            [field]: event.target.value,
        }));
    };

    return (
        country && <div className="details">
            <h1>{country.name}</h1>
            <img src={country.flagURL} alt={`${country.name} flag`} />
            <p>
                Capital:
                <input
                    type="text"
                    value={country.capital}
                    onChange={handleChange('capital')}
                />
            </p>
            <p>
                Population:
                <input
                    type="text"
                    value={country.population}
                    onChange={handleChange('population')}
                />
            </p>
            <button onClick={handleUpdate}>Update</button>
        </div>
    );
};

export default CountryDetails;
