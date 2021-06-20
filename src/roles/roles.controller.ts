import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CreateRoleDto } from './dto/create-role.dto';
import { RoleDto } from './dto/role.dto';
import { RoleModel } from './role.model';
import { RolesService } from './roles.service';

@ApiTags('Роли')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('roles')
export class RolesController {
	constructor(private rolesService: RolesService) { }

	@ApiOperation({ summary: 'Создание новой роли' })
	@ApiResponse({ status: 200, type: RoleDto })
	@Post()
	public create(@Body() dto: CreateRoleDto): Promise<RoleDto> {
		return this.rolesService.create(dto);
	}

	@ApiOperation({ summary: 'Получить роль по уникальному значению роли' })
	@ApiResponse({ status: 200, type: RoleDto })
	@Get('/:value')
	public getByValue(@Param('value') value: string): Promise<RoleDto> {
		return this.rolesService.getByValue(value);
	}
}
