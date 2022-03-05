import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity';
import { FormTemplate } from 'src/entity/FormTemplate.entity';
import { MyContext, MyNotProtectedSession, MySession } from 'src/types';
import { suppressNotFoundFailure } from 'src/utils';
import { FindConditions, In, Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { FormTemplateErrorCode } from './errorCodes';
import { CreateFormTemplateInput, SaveFormTemplateInput } from './input';

@Injectable()
export class FormTemplateService {
  constructor(
    @InjectRepository(FormTemplate)
    private readonly formTemplateRepository: Repository<FormTemplate>,
    private userService: UserService,
  ) {}

  async collect(userId: User['id']): Promise<FormTemplate[]> {
    return await this.formTemplateRepository.find({
      where: { user: { id: userId } },
      relations: ['user'],
    });
  }

  async getById(
    formTemplateId: FormTemplate['id'],
    userId?: User['id'],
  ): Promise<FormTemplate> {
    let query: FindConditions<FormTemplate> = { id: formTemplateId };

    if (userId) {
      query = { ...query, user: { id: userId } };
    }
    const formTemplate = await this.formTemplateRepository.findOne({
      where: query,
      relations: ['user'],
    });

    if (!formTemplate) {
      throw new NotFoundException(
        `Form template with id not found ${formTemplateId}`,
        FormTemplateErrorCode.NOT_FOUND,
      );
    }

    return formTemplate;
  }

  async publish(
    session: MyNotProtectedSession,
    id: FormTemplate['id'],
  ): Promise<FormTemplate> {
    const formTemplate = await this.getById(id);

    this.checkIsFormOwner(formTemplate, session, true);

    formTemplate.published = true;
    return await this.save(formTemplate);
  }

  async unPublish(
    session: MyNotProtectedSession,
    id: FormTemplate['id'],
  ): Promise<FormTemplate> {
    const formTemplate = await this.getById(id);

    this.checkIsFormOwner(formTemplate, session, true);

    formTemplate.published = false;
    return await this.save(formTemplate);
  }

  // Method that validate if user is owner of form.
  // User can be owner when is auth and have saved userID in entity
  // Or when is not auth, be he saved a form
  async canEdit(
    formTemplateId: FormTemplate['id'],
    { userId, formTemplatesIds }: MyNotProtectedSession,
  ): Promise<boolean> {
    const formTemplate = await this.getById(formTemplateId);
    return this.checkIsFormOwner(formTemplate, { userId, formTemplatesIds });
  }

  async create(
    req: MyContext['req'],
    input: CreateFormTemplateInput,
    userId?: User['id'],
  ): Promise<FormTemplate> {
    const user = userId
      ? await suppressNotFoundFailure(this.userService.getById(userId))
      : undefined;

    const formTemplate = new FormTemplate(input, user);
    const createdFormTemplate = await this.save(formTemplate);

    if (!userId) {
      this.addFormTemplateIdToSession(req, createdFormTemplate.id);
    }

    return createdFormTemplate;
  }

  async update(
    input: SaveFormTemplateInput,
    session: MyNotProtectedSession,
  ): Promise<FormTemplate> {
    const formTemplate = await this.getById(input.id);

    this.checkIsFormOwner(formTemplate, session, true);

    formTemplate.label = input.label;
    formTemplate.template = input.template;

    if (session.userId) {
      await this.assignUserIfNotExist(formTemplate, session.userId);
    }

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

  private addFormTemplateIdToSession = (
    req: MyContext['req'],
    formTemplateId: string,
  ) => {
    if (!req.session.formTemplatesIds) {
      req.session.formTemplatesIds = [formTemplateId];
      return;
    }

    req.session.formTemplatesIds = [
      ...req.session.formTemplatesIds,
      formTemplateId,
    ];
  };

  private async assignUserIfNotExist(
    entity: FormTemplate,
    userId: User['id'],
  ): Promise<FormTemplate> {
    if (entity.user) {
      return entity;
    }

    const user = userId
      ? await suppressNotFoundFailure(this.userService.getById(userId))
      : undefined;

    entity.user = user;
    return entity;
  }

  private checkIsFormOwner(
    formTemplate: FormTemplate,
    { formTemplatesIds, userId }: MyNotProtectedSession,
    throwErrorOnFalse = false,
  ): boolean {
    let canEdit = false;

    if (formTemplatesIds && !!formTemplatesIds.length) {
      canEdit = formTemplatesIds.includes(formTemplate.id);
    }

    if (!canEdit && userId) {
      canEdit = formTemplate.user?.id === userId;
    }

    if (!canEdit && throwErrorOnFalse) {
      throw new ForbiddenException(
        'Unauthorize',
        FormTemplateErrorCode.FORBIDDEN,
      );
    }

    return canEdit;
  }

  async assignCreatedFormsAsNotAuthUser(
    formTemplatesIds: string[],
    user: User,
  ) {
    await this.formTemplateRepository
      .createQueryBuilder()
      .update(FormTemplate)
      .set({ user })
      .where({ id: In(formTemplatesIds) })
      .execute();
  }
}
