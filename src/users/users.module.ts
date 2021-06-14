import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.model';
import { Role } from 'src/roles/role.model';
import { UserRoles } from 'src/roles/user-roles.model';
import { RolesModule } from 'src/roles/roles.module';

@Module({
	providers: [UsersService],
	controllers: [UsersController],
	imports: [
		SequelizeModule.forFeature([
			User,
			Role,
			UserRoles
		]),
		RolesModule,
	],
})
export class UsersModule { }
