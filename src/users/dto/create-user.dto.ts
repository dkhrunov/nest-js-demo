import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
	@ApiProperty({ example: 'user@gmai.com', description: 'Почтовый адресс' })
	public readonly email: string;
	@ApiProperty({ example: '123qwe', description: 'Пароль' })
	public readonly password: string;
}