import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormTemplate } from 'src/entity/FormTemplate.entity';
import { FormTemplateResolver } from './formTemplate.resolver';
import { FormTemplateService } from './formTemplate.service';

@Module({
  imports: [TypeOrmModule.forFeature([FormTemplate])],
  providers: [FormTemplateResolver, FormTemplateService],
  exports: [FormTemplateService],
})
export class FormTemplateModule {}
