import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot('mongodb://admin:admin123@localhost:27017/footballdb?authSource=admin')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
