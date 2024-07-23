import { Field, InputType } from '@nestjs/graphql';
import { GraphQLUpload } from 'graphql-upload-ts';
import { FileUpload } from 'graphql-upload/processRequest.mjs';

@InputType()
export class UploadImageDto {
  @Field(() => GraphQLUpload)
  image: Promise<FileUpload>;
}
