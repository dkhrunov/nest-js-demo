import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreatePostDto {
	@ApiProperty({ example: 'Плюсы использования Nest.js', description: 'Заголовок' })
	@IsNotEmpty({ message: 'не должен быть пустым' })
	@IsString({ message: 'должен быть строкой' })
	public readonly title: string;

	@ApiProperty({ example: 'Плюсов много', description: 'Контент' })
	@IsNotEmpty({ message: 'не должен быть пустым' })
	@IsString({ message: 'должен быть строкой' })
	public readonly content: string;
}