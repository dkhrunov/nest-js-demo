import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class CreateUserDto {
	@ApiProperty({ example: 'user@gmail.com', description: 'Почтовый адресс' })
	@IsNotEmpty({ message: 'не должно быть пустым' })
	@IsString({ message: 'должно быть строкой'})
	@IsEmail({}, { message: 'некорректный Email'})
	public readonly email: string;

	@ApiProperty({ example: '123qwe', description: 'Пароль' })
	@IsNotEmpty({ message: 'не должно быть пустым' })
	@IsString({ message: 'должно быть строкой'})
	@Length(4, 16, { message: 'не меньше 4 и не больше 16'})
	public readonly password: string;
}