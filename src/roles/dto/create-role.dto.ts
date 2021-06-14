import { ApiProperty } from "@nestjs/swagger";

export class CreateRoleDto {
	@ApiProperty({ example: 'ADMIN', description: 'Уникальное значение роли' })
	public readonly value: string;
	@ApiProperty({ example: 'Администратор', description: 'Описание роли' })
	public readonly description: string;
}