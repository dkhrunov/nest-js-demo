import { ApiProperty } from "@nestjs/swagger";
import { PostDto } from "src/posts/dto/post.dto";
import { RoleDto } from "src/roles/dto/role.dto";

export class UserDetailedDto {
	@ApiProperty({ example: 1, description: 'Уникальный идентификатор' })
	public readonly id: number;

	@ApiProperty({ example: 'user@gmail.com', description: 'Почтовый адресс' })
	public readonly email: string;

	@ApiProperty({ example: false, description: 'Статус блокировки пользователя' })
	public readonly banned: boolean;

	@ApiProperty({ example: 'За хулиганство', description: 'Причина блокировки' })
	public readonly banReason: string;

	@ApiProperty({ type: [RoleDto], description: 'Роли' })
	public readonly roles: RoleDto[];

	@ApiProperty({ type: [PostDto], description: 'Посты' })
	public readonly posts: PostDto[];
}