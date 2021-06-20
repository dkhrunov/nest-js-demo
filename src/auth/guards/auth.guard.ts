import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {

	constructor(private jwtService: JwtService) {}

	canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		const req = context.switchToHttp().getRequest();

		try {
			const authHeader: string = req.headers.authorization;
			const bearer = authHeader.split(/\s/)[0];
			const token = authHeader.split(/\s/)[1];

			if (bearer !== 'Bearer' || !token) {
				throw new UnauthorizedException({ message: 'Требуется авторизация'});
			}

			const user = this.jwtService.verify(token);
			req.user = user;

			return true;
		} catch (error) {
			if (error?.name === 'TokenExpiredError') {
				throw new UnauthorizedException({ message: 'Токен просрочен' });
			}
			
			throw new UnauthorizedException({ message: 'Требуется авторизация'});
		}
	}
}
