import { ApiProperty } from "@nestjs/swagger";

export class UserDto {
	@ApiProperty({ example: 1, description: 'Уникальный идентификатор' })
	public readonly id: number;

	@ApiProperty({ example: 'user@gmail.com', description: 'Почтовый адресс' })
	public readonly email: string;

	@ApiProperty({ example: false, description: 'Статус блокировки пользователя' })
	public readonly banned: boolean;

	@ApiProperty({ example: 'За хулиганство', description: 'Причина блокировки' })
	public readonly banReason: string;
}