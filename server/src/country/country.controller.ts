import {
  Controller,
  Get,
  Param,
  Put,
  Body,
  NotFoundException,
} from '@nestjs/common';
import { CountryService } from './country.service';
import { Country } from './models/country.interface';

@Controller('countries')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get()
  async getAll(): Promise<Country[]> {
    return this.countryService.findAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: string): Promise<Country> {
    const country = await this.countryService.findOne(id);
    if (!country) {
      throw new NotFoundException(`Country with ID ${id} not found`);
    }
    return country;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateData: Partial<Country>,
  ): Promise<Country> {
    const updatedCountry = await this.countryService.update(id, updateData);
    if (!updatedCountry) {
      throw new NotFoundException(`Country with ID ${id} not found`);
    }
    return updatedCountry;
  }
}
