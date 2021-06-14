import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './role.model';

@Injectable()
export class RolesService {

	constructor(
		@InjectModel(Role)
		private roleRepository: typeof Role,
	) {	}

	public async create(newRole: CreateRoleDto): Promise<Role> {
		const createdRole = await this.roleRepository.create(newRole);

		return createdRole;
	}

	public async getByValue(value: string): Promise<Role> {
		const role = this.roleRepository.findOne({ where: { value } });

		return role;
	}
}
