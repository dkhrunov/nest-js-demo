import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from './user.model';
import { RoleModel } from 'src/roles/role.model';
import { UserRolesModel } from 'src/roles/user-roles.model';
import { RolesModule } from 'src/roles/roles.module';
import { AuthModule } from 'src/auth/auth.module';
import { PostModel } from 'src/posts/post.model';
import { PostsModule } from 'src/posts/posts.module';

@Module({
	controllers: [UsersController],
	providers: [UsersService],
	imports: [
		SequelizeModule.forFeature([
			UserModel,
			RoleModel,
			UserRolesModel,
			PostModel,
		]),
		forwardRef(() => AuthModule),
		RolesModule,
		PostsModule,
	],
	exports: [
		UsersService,
	],
})
export class UsersModule { }
