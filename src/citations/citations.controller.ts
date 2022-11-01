import { Controller, Get, Post, Body, Delete, Param ,Put, UseGuards} from '@nestjs/common';
import { CreateCitationDto } from './dto/create-citation.dto';
import { CitationsService } from './citations.service';
import { Citation } from './citation.interface';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
@Controller('citations')
export class CitationsController {
constructor(private readonly citationsservice:CitationsService){}

    @Get()
     findAll(): Promise<Citation[]>{
        return this.citationsservice.findAll();
    }

   // @UseGuards(JwtGuard)
  
     @Get('/id/:id')
   findOne(@Param('id') id):Promise<Citation>{
        return this.citationsservice.findOne(id);
    }
    @Get('/name/:name')
  findName(@Param('name') name): Promise<Citation[]>{
      return this.citationsservice.findName(name)
  }
   
    

    @Post()
    Create(@Body() createcitationdto: CreateCitationDto):Promise<Citation>{
        return this.citationsservice.create(createcitationdto);
    }

    @Delete(':id')
    delete(@Param('id') id): Promise<Citation>{
        return this.citationsservice.delete(id)
    }

    @Put(':id')
    update(@Body() updatecitationdto: CreateCitationDto, @Param('id') id): Promise<Citation>{
        return this.citationsservice.update(id, updatecitationdto);
    }
}
