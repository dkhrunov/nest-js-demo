import { ApiProperty } from "@nestjs/swagger";

export class RoleDto {
	@ApiProperty({ example: 1, description: 'Уникальный идентификатор' })
	public readonly id: number;

	@ApiProperty({ example: 'USER', description: 'Уникальное значение роли'})
	public readonly value: string;

	@ApiProperty({ example: 'Пользователь', description: 'Описание роли'})
	public readonly description: string;
}