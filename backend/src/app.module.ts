import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [MongooseModule.forRoot('mongodb://admin:admin123@localhost:27017/footballdb?authSource=admin')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
