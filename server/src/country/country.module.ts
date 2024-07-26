import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CountrySchema } from './models/country.schema';
import { CountryService } from './country.service';
import { CountryController } from './country.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Country', schema: CountrySchema, collection: 'Countries' },
    ]),
  ],
  providers: [CountryService],
  controllers: [CountryController],
})
export class CountryModule {}
