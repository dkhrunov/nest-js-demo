import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { UserModel } from '../user.model';
import { UsersService } from '../users.service';

@Injectable()
export class UserByIdPipe implements PipeTransform {

	constructor(private usersService: UsersService) { }

	public transform(id: number, metadata: ArgumentMetadata): Promise<UserModel> {
		return this.usersService.get(id);
	}
}
