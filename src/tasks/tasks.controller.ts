import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
  NotFoundException
} from "@nestjs/common";
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { UsersService } from "../users/users.service";
import { UserEntityPipe } from "./pipes/userEntity.pipe";
import { User } from "../users/entities/user.entity";

@Controller('tasks')
export class TasksController {
  constructor(
    private readonly tasksService: TasksService,
    private readonly userService: UsersService
  ) {}

  @Post()
  create(@Query('userId', ParseIntPipe, UserEntityPipe) user: User, @Body() createTaskDto: CreateTaskDto) {
    createTaskDto.user = user;
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @Patch('updateUser/:taskId')
  changeUser(
    @Param('taskId', ParseIntPipe) id: number,
    @Query('userId', UserEntityPipe) user: User
  ){
    if(!user){
      throw new NotFoundException(`User not found`)
    }
    return this.tasksService.updateUser(id, user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.remove(id);
  }
}
