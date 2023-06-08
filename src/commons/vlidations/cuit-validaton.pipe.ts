import { PipeTransform, Injectable, HttpStatus } from '@nestjs/common';
import BaseController from '../base.controller';

@Injectable()
export class CuitValidationPipe
  extends BaseController
  implements PipeTransform
{
  transform(value: any) {
    const cuit = String(value.CUIT);
    if (cuit.length !== 11) {
        return this.throwError({ name: 'BadRequestException', message: 'INVALID_CUIT', status: HttpStatus.BAD_REQUEST });
    }

    const [checkDigit, ...rest] = cuit.split('').map(Number).reverse();

    const total = rest.reduce(
      (acc, cur, index) => acc + cur * (2 + (index % 6)),
      0,
    );

    const mod11 = 11 - (total % 11);

    if (mod11 === 11) {
      return checkDigit === 0
        ? value
        : this.throwError({ name: 'BadRequestException', message: 'INVALID_CUIT', status: HttpStatus.BAD_REQUEST });
    }

    if (mod11 === 10) {
      return this.throwError({ name: 'BadRequestException', message: 'INVALID_CUIT', status: HttpStatus.BAD_REQUEST });
    }

    return value;
  }
}
