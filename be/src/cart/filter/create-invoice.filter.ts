import {
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class CreateInvoiceExceptionFilter implements ExceptionFilter {
  catch(exception: any) {
    const errorMessage =
      exception.code === 'ER_DUP_ENTRY'
        ? 'This cart you have already checked out. Would you like check out again?'
        : exception.message;
    throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
  }
}
