import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { FormTemplateModule } from '../formTemplate/formTemplate.module';
import { UserModule } from '../user/user.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    UserModule,
    FormTemplateModule,
    PassportModule.register({ session: true }),
  ],
  providers: [AuthResolver, AuthService, LocalStrategy],
  exports: [AuthService],
})
export class AuthModule {}
