import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class AddUserRoleDto {
	@ApiProperty({ example: 1, description: 'Идентификатор пользователя' })
	@IsNotEmpty({ message: 'не должен быть пустым' })
	@IsNumber({}, { message: 'должен быть числом' })
	public readonly userId: number;

	@ApiProperty({ example: 'ADMIN', description: 'Роль' })
	@IsNotEmpty({ message: 'не должно быть пустым' })
	@IsString({ message: 'должно быть строкой'})
	public readonly roleValue: string;
}