import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";
import { User } from "../../users/entities/user.entity";

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  isCompleted?: boolean;

  @IsOptional()
  user?: User
}
