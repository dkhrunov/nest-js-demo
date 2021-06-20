import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRoleDto } from './dto/create-role.dto';
import { RoleModel } from './role.model';

@Injectable()
export class RolesService {

	constructor(
		@InjectModel(RoleModel)
		private roleRepository: typeof RoleModel,
	) { }

	public async create(newRole: CreateRoleDto): Promise<RoleModel> {
		await this.roleRepository.create(newRole);
		const createdRole = await this.getByValue(newRole.value);

		return createdRole;
	}

	public async getByValue(value: string): Promise<RoleModel> {
		const role = await this.roleRepository.findOne({
			where: { value },
			attributes: ['id', 'value', 'description']
		});

		if (!role) {
			throw new HttpException('Роль не найдена', HttpStatus.NOT_FOUND)
		}
		
		return role;
	}
}
