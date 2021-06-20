import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class BanUserDto {
	@ApiProperty({ example: 1, description: 'Идентификатор пользователя' })
	@IsNotEmpty({ message: 'не должно быть пустым' })
	@IsNumber({}, { message: 'должно быть числом' })
	public readonly userId: number;

	@ApiProperty({ example: 'За хулиганство', description: 'Причина' })
	@IsNotEmpty({ message: 'не должно быть пустым' })
	@IsString({ message: 'должно быть строкой'})
	public readonly banReason: string;
}