import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormResponse } from 'src/entity';
import { FormTemplateModule } from '../formTemplate/formTemplate.module';
import { FormResponseResolver } from './formResponse.resolver';
import { FormResponseService } from './formResponse.service';

@Module({
  imports: [TypeOrmModule.forFeature([FormResponse]), FormTemplateModule],
  providers: [FormResponseResolver, FormResponseService],
  exports: [],
})
export class FormResponseModule {}
