import { BadRequestException, ConflictException, ForbiddenException, InternalServerErrorException, NotFoundException, UnauthorizedException } from "@nestjs/common";

export default abstract class BaseController {
  private moduleName!: string;

  constructor(moduleName: string) {
    this.moduleName = moduleName;
  }

  log(message: string, status: number) {
    const error = `[ERROR (${status}) - ${this.moduleName} ]: ${message}`
    console.log(error, 'color: red');
  }

  throwError(e: any) {
    this.log(e.message, e.status)
    switch (e.name) {
      case 'BadRequestException':
        throw new BadRequestException(e.message);
      case 'ConflictException':
        throw new ConflictException(e.message);
      case 'ForbiddenException':
        throw new ForbiddenException(e.message);
      case 'NotFoundException':
        throw new NotFoundException(e.message);
      case 'UnauthorizedException':
        throw new UnauthorizedException(e.message);
      case 'InternalServerErrorException':
        throw new InternalServerErrorException(e.message);
      default:
        throw new InternalServerErrorException(e.message);
    }
  }
}
