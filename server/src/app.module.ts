import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CountryModule } from './country/country.module';
import { UtilModule } from './utils/util.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://adibinen:o5kh6n49CFyvsdht@countries.xo4vywp.mongodb.net/country-portal?retryWrites=true&w=majority&appName=Countries',
    ),
    CountryModule,
    UtilModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
