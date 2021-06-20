import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { UserModel } from "./users/user.model";
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { UserRolesModel } from "./roles/user-roles.model";
import { RoleModel } from "./roles/role.model";
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { PostModel } from "./posts/post.model";

@Module({
	controllers: [],
	providers: [],
	imports: [
		ConfigModule.forRoot({
			envFilePath: `.${process.env.NODE_ENV}.env`,
		}),
		SequelizeModule.forRoot({
			dialect: 'postgres',
			host: process.env.POSTGRES_HOST,
			port: Number(process.env.POSTGRES_PORT),
			username: process.env.POSTGRES_USER,
			password: process.env.POSTGRES_PASSWORD,
			database: process.env.POSTGRES_DB,
			models: [UserModel, RoleModel, UserRolesModel, PostModel],
			autoLoadModels: true,
		}),
		AuthModule,
		UsersModule,
		RolesModule,
		PostsModule
	]
})
export class AppModule { }