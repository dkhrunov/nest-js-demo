import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from 'src/files/files.service';
import { CreatePostDto } from './dto/create-post.dto';
import { PostModel } from './post.model';

@Injectable()
export class PostsService {

	constructor(
		@InjectModel(PostModel)
		private postRepository: typeof PostModel,
		private filesService: FilesService,
	) { }

	public async create(userId: number, dto: CreatePostDto, image: Express.Multer.File): Promise<PostModel> {
		const fileName = image ? await this.filesService.createImage(image) : null;
		const post = await this.postRepository.create({ userId, ...dto, image: fileName });

		return post;
	}

	public async getAll(): Promise<PostModel[]> {
		const posts = await this.postRepository.findAll();

		return posts;
	}

	public async get(postId: number): Promise<PostModel> {
		const post = await this.postRepository.findByPk(postId);

		return post;
	}

	public async getAllUserPost(userId: number): Promise<PostModel[]> {
		const posts = await this.postRepository.findAll({ where: { userId }});

		return posts;
	}
}
