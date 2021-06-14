import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { Role } from "src/roles/role.model";
import { UserRoles } from "src/roles/user-roles.model";

interface UserCreationAttrs {
	email: string;
	password: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
	
	@ApiProperty({ example: 1, description: 'Уникальный идентификатор' })
	@Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
	public id: number;

	@ApiProperty({ example: 'user@gmai.com', description: 'Почтовый адресс' })
	@Column({ type: DataType.STRING, unique: true, allowNull: false })
	public email: string;

	@ApiProperty({ example: '123qwe', description: 'Пароль' })
	@Column({ type: DataType.STRING, allowNull: false })
	public password: string;

	@ApiPropertyOptional({ example: false, description: 'Статус блокировки пользователя' })
	@Column({ type: DataType.BOOLEAN, defaultValue: false })
	public banned: boolean;

	@ApiPropertyOptional({ example: 'За хулиганство', description: 'Причина блокировки' })
	@Column({ type: DataType.STRING, allowNull: true })
	public banReason: string;

	@ApiProperty({ description: 'Роли', type: [Role] })
	@BelongsToMany(() => Role, () => UserRoles)
	public roles: Role[];
}