import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { UserModel } from 'src/users/user.model';
import { ROLES_KEY } from '../decorators/roles-auth.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(
		private jwtService: JwtService,
		private reflector: Reflector,
	) { }

	canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		try {
			const requiredRoles = this.reflector.getAllAndOverride<string[]>(
				ROLES_KEY,
				[
					context.getHandler(),
					context.getClass()
				]
			);

			if (!requiredRoles && requiredRoles.length === 0) {
				return true;
			}

			const request = context.switchToHttp().getRequest();
			const authHeader: string = request.headers.authorization;

			if (!authHeader) {
				throw new UnauthorizedException({ message: 'Требуется авторизация' });
			}

			const bearer = authHeader.split(/\s/)[0];
			const token = authHeader.split(/\s/)[1];

			if (bearer !== 'Bearer' || !token) {
				throw new UnauthorizedException({ message: 'Требуется авторизация' });
			}

			const user = this.jwtService.verify<UserModel>(token);

			return user.roles.some(role => requiredRoles.includes(role.value));
		} catch (error) {
			if (error?.name === 'TokenExpiredError') {
				throw new UnauthorizedException({ message: 'Токен просрочен' });
			}

			if (error instanceof UnauthorizedException) {
				throw new UnauthorizedException({ message: 'Требуется авторизация' });
			}

			throw new HttpException('Нет доступа', HttpStatus.FORBIDDEN);
		}
	}
}
