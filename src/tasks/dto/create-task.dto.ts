import { User } from "../../users/entities/user.entity";

export class CreateTaskDto {
  title: string;
  description?: string;
  isCompleted?: boolean;
  user?: User
}
