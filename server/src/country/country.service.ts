import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Country } from './models/country.interface';
import { CacheService } from '../utils/cache.service';

@Injectable()
export class CountryService {
  constructor(
    @InjectModel('Country') private readonly countryModel: Model<Country>,
    private readonly cacheService: CacheService,
  ) {}

  async findAll(): Promise<Country[]> {
    const cacheKey = 'countries';

    const cachedCountries = await this.cacheService.get<Country[]>(cacheKey);
    if (cachedCountries) {
      return cachedCountries;
    }

    try {
      const countries = await this.countryModel.find().exec();
      const formattedCountries = countries.map((country) => ({
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

      try {
        await this.cacheService.set(cacheKey, formattedCountries, 600000);
      } catch (error) {
        console.error('Failed to cache countries', error);
      } finally {
        return formattedCountries;
      }
    } catch (error) {
      throw new Error('Failed to fetch countries');
    }
  }

  async findOne(id: string): Promise<Country> {
    const cacheKey = `country_${id}`;

    const cachedCountry = await this.cacheService.get<Country>(cacheKey);
    if (cachedCountry) {
      return cachedCountry;
    }

    try {
      const country = await this.countryModel.findById(id).exec();
      if (!country) {
        throw new NotFoundException(`Country with ID ${id} not found`);
      }

      const formattedCountry: Country = {
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

      try {
        await this.cacheService.set(cacheKey, formattedCountry, 600000); // Cache TTL: 1 hour
      } catch (error) {
        console.error(`Failed to cache country with ID ${id}:`, error);
      } finally {
        return formattedCountry;
      }
    } catch (error) {
      throw new Error(`Failed to fetch country with ID ${id}`);
    }
  }

  async update(id: string, data: Partial<Country>): Promise<Country> {
    const cacheKey = `country_${id}`;

    try {
      const updatedCountry = await this.countryModel
        .findByIdAndUpdate(id, data, { new: true })
        .exec();

      if (!updatedCountry) {
        throw new NotFoundException(`Country with ID ${id} not found`);
      }

      try {
        await this.cacheService.del(cacheKey);
      } catch (error) {
        console.error(
          `Failed to clear cache for country with ID ${id}:`,
          error,
        );
      } finally {
        return updatedCountry;
      }
    } catch (error) {
      throw new Error(`Failed to update country with ID ${id}`);
    }
  }
}
