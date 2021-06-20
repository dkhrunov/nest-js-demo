import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class PostDto {
	@ApiProperty({ example: 1, description: 'Уникальный идентификатор' })
	public readonly id: number;

	@ApiProperty({ example: 'Первое впечатление от Nest.js', description: 'Заголовок' })
	public readonly title: string;

	@ApiProperty({ example: 'Это лучший фреймворк на планете', description: 'Контент' })
	public readonly content: string;

	@ApiPropertyOptional({ example: 'TWFuIGlzIGRpc3Rpbmd1aXN', description: 'Изображение в base64', nullable: true })
	public readonly image: string;

	@ApiProperty({ example: 1, description: 'Уникальный идентификатор пользователя' })
	public readonly userId: number;

	@ApiPropertyOptional({ example: 1623717806, description: 'Дата создания', type: 'timestamp' })
	public readonly createdAt?: number;

	@ApiPropertyOptional({ example: 1623717806, description: 'Дата обновления', type: 'timestamp' })
	public readonly updatedAt?: number;
	
}