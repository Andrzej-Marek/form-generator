import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormTemplate } from 'src/entity/FormTemplate.entity';
import { FormTemplateResolver } from './formTemplate.resolver';
import { FormTemplateService } from './formTemplate.service';

@Module({
  imports: [TypeOrmModule.forFeature([FormTemplate])],
  providers: [FormTemplateResolver, FormTemplateService],
  exports: [],
})
export class FormTemplateModule {}
