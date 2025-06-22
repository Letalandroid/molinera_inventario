// src/generate/dto/date-range.dto.ts
import { IsNotEmpty, IsDateString } from 'class-validator';

export class DateRangeDto {
  @IsNotEmpty()
  @IsDateString()
  startDate: string = ''; // Ej: "2025-06-01"

  @IsNotEmpty()
  @IsDateString()
  endDate: string = '';   // Ej: "2025-06-22"
}
