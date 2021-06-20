import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateRoleDto {
	@ApiProperty({ example: 'ADMIN', description: 'Уникальное значение роли' })
	@IsNotEmpty({ message: 'не должно быть пустым' })
	@IsString({ message: 'должно быть строкой'})
	public readonly value: string;

	@ApiProperty({ example: 'Администратор', description: 'Описание роли' })
	@IsNotEmpty({ message: 'не должно быть пустым' })
	@IsString({ message: 'должно быть строкой'})
	public readonly description: string;
}