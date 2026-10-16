import { PartialType } from '@nestjs/mapped-types';
import { CreateCccDto } from './create-ccc.dto.js';

export class UpdateCccDto extends PartialType(CreateCccDto) {}
