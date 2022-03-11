import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FormTemplate } from 'src/entity';
import { FormResponse } from 'src/entity/FormResponse.entity';
import { MyNotProtectedSession } from 'src/types';
import { Repository } from 'typeorm';
import { FormTemplateService } from '../formTemplate/formTemplate.service';
import { FormResponseErrorCode } from './errorCodes';
import { SendFormResponseInput } from './input';

@Injectable()
export class FormResponseService {
  constructor(
    @InjectRepository(FormResponse)
    private readonly formTemplateRepository: Repository<FormResponse>,
    private readonly fromTemplateService: FormTemplateService,
  ) {}

  async collect(
    session: MyNotProtectedSession,
    formTemplateId: FormTemplate['id'],
  ): Promise<FormResponse[]> {
    const formTemplate = await this.fromTemplateService.getById(formTemplateId);
    this.fromTemplateService.checkIsFormOwner(formTemplate, session, true);

    return await this.formTemplateRepository.find({
      where: { formTemplateId },
      relations: ['formTemplate'],
    });
  }

  async create(input: SendFormResponseInput): Promise<FormResponse> {
    const formTemplate = await this.fromTemplateService.getById(
      input.formTemplateId,
    );

    const createdFormTemplate = new FormResponse(
      { formVersion: input.formVersion, response: input.response },
      formTemplate,
    );

    return await this.save(createdFormTemplate);
  }

  private async save(entity: FormResponse): Promise<FormResponse> {
    try {
      return await entity.save();
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to save form template',
        FormResponseErrorCode.FAILED_TO_SAVE,
      );
    }
  }
}
