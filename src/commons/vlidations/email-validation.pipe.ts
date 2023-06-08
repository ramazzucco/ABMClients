import { PipeTransform, Injectable, BadRequestException, HttpStatus } from '@nestjs/common';
import BaseController from '../base.controller';

@Injectable()
export class EmailValidationPipe extends BaseController implements PipeTransform {
  private readonly regex: RegExp = /^[\w._%+-]+@(?:[\w-]+\.)+[\w]{2,}$/;

  transform(value: any) {
    const { email } = value;
    if (!this.regex.test(email)) {
      this.throwError({ name: 'BadRequestException', message: 'INVALID_EMAIL', status: HttpStatus.BAD_REQUEST })
    }
    return value;
  }
}
