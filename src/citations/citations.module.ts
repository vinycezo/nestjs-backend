import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import { CitationsController } from './citations.controller'
import { CitationsService } from './citations.service';
import { CitationSchema } from './schema/citation.schema';

@Module({
  imports: [MongooseModule.forFeature([{name:'Citation', schema:CitationSchema}])],
  controllers: [CitationsController],
  providers: [CitationsService],
})
export class CitationsModule {}