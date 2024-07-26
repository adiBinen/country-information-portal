import { Schema } from 'mongoose';

export const CountrySchema = new Schema({
  name: String,
  capital: String,
  region: String,
  subregion: String,
  population: Number,
  timezone: String,
  continent: String,
  flagURL: String,
});
