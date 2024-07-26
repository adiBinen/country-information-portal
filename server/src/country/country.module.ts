import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CountrySchema } from './models/country.schema';
import { CountryService } from './country.service';
import { CountryController } from './country.controller';
import { UtilModule } from '../utils/util.module'; // Import UtilModule

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Country', schema: CountrySchema, collection: 'Countries' },
    ]),
    UtilModule,
  ],
  providers: [CountryService],
  controllers: [CountryController],
})
export class CountryModule {}
