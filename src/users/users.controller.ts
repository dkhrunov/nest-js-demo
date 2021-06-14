import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.model';
import { UsersService } from './users.service';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {

	constructor(
		private usersService: UsersService,
	) { }

	@ApiOperation({ summary: 'Создание пользователя' })
	@ApiResponse({ status: 200, type: User })
	@Post()
	public create(@Body() dto: CreateUserDto): Promise<User> {
		return this.usersService.create(dto);
	}

	@ApiOperation({ summary: 'Получить всех пользователей' })
	@ApiResponse({ status: 200, type: [User] })
	@Get()
	public getAll(): Promise<User[]> {
		return this.usersService.getAll();
	}

	@ApiOperation({ summary: 'Получить пользователя по идентификатору' })
	@ApiResponse({ status: 200, type: User })
	@Get('/:id')
	public get(@Param('id') id: number): Promise<User> {
		return this.usersService.get(id);
	}
}
