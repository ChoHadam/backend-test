import { IsDefined, IsNotEmpty, Matches } from 'class-validator';

const USER_ID_REGEX = /[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}$/;

export class RequestHeaderDTO {
  @IsNotEmpty()
  @IsDefined()
  @Matches(USER_ID_REGEX)
  id!: string;
}
