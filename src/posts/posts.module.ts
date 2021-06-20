import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { UserModel } from 'src/users/user.model';
import { PostModel } from './post.model';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
	controllers: [PostsController],
	providers: [PostsService],
	imports: [
		SequelizeModule.forFeature([
			UserModel,
			PostModel,
		]),
		AuthModule,
	],
	exports: [PostsService]
})
export class PostsModule { }
