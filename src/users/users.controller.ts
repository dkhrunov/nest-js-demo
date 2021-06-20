import { Body, Controller, Get, Param, ParseIntPipe, Patch, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Roles } from 'src/roles/decorators/roles-auth.decorator';
import { RolesGuard } from 'src/roles/guards/roles.guard';
import { AddUserRoleDto } from './dto/add-user-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { UserDetailedDto } from './dto/user-detailed.dto';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';

@ApiTags('Пользователи')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {

	constructor(
		private usersService: UsersService,
	) { }

	@ApiOperation({ summary: 'Получить всех пользователей' })
	@ApiResponse({ status: 200, type: [UserDto] })
	@Get()
	public getAll(): Promise<UserDto[]> {
		return this.usersService.getAll();
	}

	@ApiOperation({ summary: 'Получить пользователя по идентификатору' })
	@ApiResponse({ status: 200, type: UserDetailedDto })
	@Roles("ADMIN")
	@UseGuards(RolesGuard)
	@Get('/:userId')
	public get(@Param('userId', ParseIntPipe) userId: number): Promise<UserDetailedDto> {
		return this.usersService.get(userId);
	}

	@ApiOperation({ summary: 'Выдать роль' })
	@ApiResponse({ status: 200 })
	@Roles("ADMIN")
	@UseGuards(RolesGuard)
	@Patch('/role')
	public addRole(@Body() dto: AddUserRoleDto): Promise<void> {
		return this.usersService.addRole(dto);
	}

	@ApiOperation({ summary: 'Забанить пользователя' })
	@ApiResponse({ status: 200 })
	@Roles("ADMIN")
	@UseGuards(RolesGuard)
	@Patch('/ban')
	public ban(@Body() dto: BanUserDto): Promise<void> {
		return this.usersService.ban(dto);
	}
}
