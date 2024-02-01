import { PartialType } from '@nestjs/mapped-types';
import { CreateConsultantDto } from './create-consultant.dto';

export class UpdateConsultantDto extends PartialType(CreateConsultantDto) {}
