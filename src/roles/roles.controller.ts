import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './role.model';
import { RolesService } from './roles.service';

@ApiTags('Роли')
@Controller('roles')
export class RolesController {
	constructor(private rolesService: RolesService) { }

	@ApiOperation({ summary: 'Создание новой роли' })
	@ApiResponse({ status: 200, type: Role })
	@Post()
	public create(@Body() dto: CreateRoleDto): Promise<Role> {
		return this.rolesService.create(dto);
	}

	@ApiOperation({ summary: 'Получить роль по уникальному значению роли' })
	@ApiResponse({ status: 200, type: Role })
	@Get('/:value')
	public getByValue(@Param('value') value: string): Promise<Role> {
		return this.rolesService.getByValue(value);
	}
}
