import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from 'src/roles/role.model';
import { RolesService } from 'src/roles/roles.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.model';

@Injectable()
export class UsersService {

	constructor(
		@InjectModel(User)
		private userRepository: typeof User,
		private rolesService: RolesService,
	) { }

	public async create(newUser: CreateUserDto): Promise<User> {
		const createdUser = await this.userRepository.create(newUser);
		const defaultRole = await this.rolesService.getByValue('USER');

		await createdUser.$set('roles', [defaultRole.id]);

		return createdUser;
	}

	public async getAll(): Promise<User[]> {
		const users = await this.userRepository.findAll();

		return users;
	}

	public async get(id: number): Promise<User> {
		const user = await this.userRepository.findOne({
			where: { id },
			include: [{ model: Role, attributes: ['id', 'value', 'description'], through: { attributes: [] } }],
			attributes: { exclude: ['createdAt', 'updatedAt'] },
		});

		return user;
	}
}
