import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { UserModel } from 'src/users/user.model';
import { RoleModel } from './role.model';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { UserRolesModel } from './user-roles.model';

@Module({
	controllers: [RolesController],
	providers: [RolesService],
	imports: [
		SequelizeModule.forFeature([
			RoleModel,
			UserModel,
			UserRolesModel,
		]),
		AuthModule,
	],
	exports: [RolesService]
})
export class RolesModule { }
