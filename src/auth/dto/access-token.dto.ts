import { ApiProperty } from "@nestjs/swagger";

export class AccessTokenDto {
	@ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c', description: 'Токен'})
	public readonly token: string;
	
	@ApiProperty({ example: '1623717806', description: 'Дата когда токен станет не валидным'})
	public readonly expiresIn: number;
}