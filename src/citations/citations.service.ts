import { Delete, Injectable } from '@nestjs/common';
import { Citation } from './citation.interface';
import { Model } from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import { CreateCitationDto } from './dto/create-citation.dto';
import { CitationsModule } from './citations.module';
@Injectable()
export class CitationsService {
 constructor(@InjectModel('Citation') private readonly citationModel:Model<Citation>){}  

   async  findAll(): Promise<Citation[]>{
       return await this.citationModel.find();
    };

   

  async   findOne(id:string): Promise<Citation>{
        return await this.citationModel.findOne({_id: id});
    };

    async findName(name:string): Promise<Citation[]>{
      return await this.citationModel.find({auteur: name})
      
    }

    async create(citation:Citation): Promise<Citation>{
      const newcitation = new this.citationModel(citation)
      return await newcitation.save()
    };

    async delete(id:string): Promise<Citation>{
      return await this.citationModel.findByIdAndRemove(id);
    };

    async update(id:string, citation:Citation): Promise<Citation>{
      return await this.citationModel.findByIdAndUpdate(id, citation, {new: true});
    }

}
