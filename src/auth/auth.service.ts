import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { UserModel } from 'src/users/user.model';
import { AccessTokenDto } from './dto/access-token.dto';

@Injectable()
export class AuthService {

	constructor(
		private userService: UsersService,
		private jwtService: JwtService,
	) { }

	public async login(userDto: CreateUserDto): Promise<AccessTokenDto> {
		const user = await this.userService.getByEmail(userDto.email);

		if (!user) {
			throw new UnauthorizedException({ message: 'Пользователь с таким email не найден'});
		}

		const passwordEquals = await bcrypt.compare(userDto.password, user.password);

		if (!passwordEquals) {
			throw new UnauthorizedException({ message: 'Некоррекный email или пароль'});
		}

		return this.generateToken(user);
	}

	public async registration(userDto: CreateUserDto): Promise<AccessTokenDto> {
		const candidate = await this.userService.getByEmail(userDto.email);

		if (candidate) {
			throw new HttpException('Пользователь с таким email уже существует', HttpStatus.CONFLICT);
		}

		const hashPassword = await bcrypt.hash(userDto.password, 5);
		const user = await this.userService.create({ ...userDto, password: hashPassword });

		return this.generateToken(user);
	}
	
	private async generateToken(user: UserModel): Promise<AccessTokenDto> {
		const payload = { email: user.email, id: user.id, roles: user.roles };
		const token = this.jwtService.sign(payload);
		const { exp } = this.jwtService.decode(token) as { [key: string]: any };

		return { token, expiresIn: exp };
	}
}
