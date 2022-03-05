import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FormTemplate } from 'src/entity/FormTemplate.entity';
import { Repository } from 'typeorm';
import { FormTemplateErrorCode } from './errorCodes';
import { CreateFormTemplateInput, SaveFormTemplateInput } from './input';

@Injectable()
export class FormTemplateService {
  constructor(
    @InjectRepository(FormTemplate)
    private readonly formTemplateRepository: Repository<FormTemplate>,
  ) {}

  async getById(formTemplateId: FormTemplate['id']): Promise<FormTemplate> {
    const formTemplate = await this.formTemplateRepository.findOne({
      where: { id: formTemplateId },
    });

    if (!formTemplate) {
      throw new NotFoundException(
        `Form template with id not found ${formTemplateId}`,
        FormTemplateErrorCode.NOT_FOUND,
      );
    }

    return formTemplate;
  }

  async create(input: CreateFormTemplateInput): Promise<FormTemplate> {
    // TODO: Validate is it valid json
    // TODO: REMOVE
    const formTemplate = new FormTemplate(input, {} as any);
    return await this.save(formTemplate);
  }

  async update(input: SaveFormTemplateInput): Promise<FormTemplate> {
    // TODO: Validate is it valid json
    const formTemplate = await this.getById(input.id);
    formTemplate.label = input.label;
    formTemplate.template = input.template;
    return await this.save(formTemplate);
  }

  async delete(id: FormTemplate['id']): Promise<true> {
    const { affected } = await this.formTemplateRepository.delete({ id });

    if (!affected) {
      throw new NotFoundException(
        `Form template with id not found ${id}`,
        FormTemplateErrorCode.NOT_FOUND,
      );
    }

    return true;
  }
  private async save(entity: FormTemplate): Promise<FormTemplate> {
    try {
      return await entity.save();
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to save form template',
        FormTemplateErrorCode.FAILED_TO_SAVE,
      );
    }
  }
}
