import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PostModel } from 'src/posts/post.model';
import { RoleModel } from 'src/roles/role.model';
import { RolesService } from 'src/roles/roles.service';
import { AddUserRoleDto } from './dto/add-user-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UserModel } from './user.model';

@Injectable()
export class UsersService {

	constructor(
		@InjectModel(UserModel)
		private userRepository: typeof UserModel,
		private rolesService: RolesService,
	) { }

	public async create(newUser: CreateUserDto): Promise<UserModel> {
		const user = await this.userRepository.create(newUser);
		const defaultRole = await this.rolesService.getByValue('USER');

		await user.$set('roles', [defaultRole.id]);
		user.roles = [defaultRole];

		return user;
	}

	public async getAll(): Promise<UserModel[]> {
		const users = await this.userRepository.findAll({
			order: [['id', 'ASC']],
			attributes: { exclude: ['createdAt', 'updatedAt', 'password'] },
		});

		return users;
	}

	public async get(id: number): Promise<UserModel> {
		const user = await this.userRepository.findOne({
			where: { id },
			include: [
				{ model: RoleModel, attributes: { exclude: ['createdAt', 'updatedAt'] }, through: { attributes: [] } },
				{ model: PostModel, attributes: { exclude: ['userId', 'createdAt', 'updatedAt'] } },
			],
			attributes: { exclude: ['createdAt', 'updatedAt', 'password'] },
		});

		return user;
	}

	public async getByEmail(email: string): Promise<UserModel> {
		const user = await this.userRepository.findOne({
			where: { email: email },
			include: [{ model: RoleModel, attributes: ['id', 'value', 'description'], through: { attributes: [] } }],
			attributes: { exclude: ['createdAt', 'updatedAt'] },
		});

		return user;
	}

	public async addRole(dto: AddUserRoleDto): Promise<void> {
		const user = await this.userRepository.findByPk(dto.userId);
		const role = await this.rolesService.getByValue(dto.roleValue);

		if (user && role) {
			await user.$add('role', role.id);
			return;
		}

		throw new HttpException('Пользователь или роль не найдены', HttpStatus.NOT_FOUND);
	}

	public async ban(dto: BanUserDto): Promise<void> {
		const user = await this.userRepository.findByPk(dto.userId);

		if (!user) {
			throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
		}

		user.banned = true;
		user.banReason = dto.banReason;
		await user.save();
	}
}
