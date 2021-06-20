import { Controller, UseGuards, Post, Body, Req, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CreatePostDto } from './dto/create-post.dto';
import { PostDto } from './dto/post.dto';
import { PostsService } from './posts.service';

@ApiTags('Посты')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('posts')
export class PostsController {

	constructor(private postsService: PostsService) { }

	@ApiOperation({ summary: 'Создание поста' })
	@ApiResponse({ status: 200, type: PostDto })
	@Post()
	public create(@Body() dto: CreatePostDto, @Req() req: any): Promise<PostDto> {
		const user = req.user;

		return this.postsService.create(user.id, dto);
	}

	@ApiOperation({ summary: 'Получить все посты' })
	@ApiResponse({ status: 200, type: [PostDto] })
	@Get()
	public getAll(): Promise<PostDto[]> {
		return this.postsService.getAll();
	}

	@ApiOperation({ summary: 'Получить пост' })
	@ApiResponse({ status: 200, type: PostDto })
	@Get(':postId')
	public get(@Param('postId', ParseIntPipe) postId: number): Promise<PostDto> {
		return this.postsService.get(postId);
	}

	@ApiOperation({ summary: 'Получить посты пользователя' })
	@ApiResponse({ status: 200, type: [PostDto] })
	@Get('users/:userId')
	public getAllUserPosts(@Param('userId', ParseIntPipe) userId: number): Promise<PostDto[]> {
		return this.postsService.getAllUserPost(userId);
	}
}
