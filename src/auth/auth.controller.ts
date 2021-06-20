import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { AccessTokenDto } from './dto/access-token.dto';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {

	constructor(private authService: AuthService) { }

	@ApiOperation({ summary: 'Авторизация спомощью учетной записи' })
	@ApiResponse({ status: 200, type: AccessTokenDto })
	@Post('/login')
	public login(@Body() userDto: CreateUserDto): Promise<AccessTokenDto> {
		return this.authService.login(userDto);
	}

	@ApiOperation({ summary: 'Получить роль по уникальному значению роли' })
	@ApiResponse({ status: 200, type: AccessTokenDto })
	@Post('/registration')
	public registration(@Body() createUserDto: CreateUserDto): Promise<AccessTokenDto> {
		return this.authService.registration(createUserDto);
	}
}
