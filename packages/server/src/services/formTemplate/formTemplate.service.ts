import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FormTemplate } from 'src/entity/FormTemplate';
import { Repository } from 'typeorm';
import { PublicId } from '../../types/publicId';

@Injectable()
export class FormTemplateService {
  constructor(
    @InjectRepository(FormTemplate)
    private readonly formTemplateRepository: Repository<FormTemplate>,
  ) {}

  async getByTemplateId(formTemplateId: PublicId): Promise<FormTemplate> {
    const user = await this.formTemplateRepository.findOne({
      where: { formTemplateId },
    });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }
}
