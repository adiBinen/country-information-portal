import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Country } from './models/country.interface';

@Injectable()
export class CountryService {
  constructor(
    @InjectModel('Country') private readonly countryModel: Model<Country>,
  ) {}

  async findAll(): Promise<Country[]> {
    try {
      const countries = await this.countryModel.find().exec();
      return countries.map((country) => ({
        id: country.id,
        name: country.name,
        capital: country.capital,
        region: country.region,
        subregion: country.subregion,
        population: country.population,
        timezone: country.timezone,
        continent: country.continent,
        flagURL: country.flagURL,
      }));
    } catch (error) {
      throw new Error('Failed to fetch countries');
    }
  }

  async findOne(id: string): Promise<Country | null> {
    try {
      const country = await this.countryModel.findById(id).exec();
      return {
        id: country.id,
        name: country.name,
        capital: country.capital,
        region: country.region,
        subregion: country.subregion,
        population: country.population,
        timezone: country.timezone,
        continent: country.continent,
        flagURL: country.flagURL,
      };
    } catch (error) {
      throw new Error(`Failed to fetch country with ID ${id}`);
    }
  }

  async update(id: string, data: Partial<Country>): Promise<Country | null> {
    try {
      return this.countryModel
        .findByIdAndUpdate(id, data, { new: true })
        .exec();
    } catch (error) {
      throw new Error(`Failed to update country with ID ${id}`);
    }
  }
}
