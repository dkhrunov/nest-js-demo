import { BelongsToMany, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { PostModel } from "src/posts/post.model";
import { RoleModel } from "src/roles/role.model";
import { UserRolesModel } from "src/roles/user-roles.model";

interface UserCreationAttrs {
	email: string;
	password: string;
}

@Table({ tableName: 'users' })
export class UserModel extends Model<UserModel, UserCreationAttrs> {
	
	@Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
	public id: number;

	@Column({ type: DataType.STRING, unique: true, allowNull: false })
	public email: string;

	@Column({ type: DataType.STRING, allowNull: false })
	public password: string;

	@Column({ type: DataType.BOOLEAN, defaultValue: false })
	public banned: boolean;

	@Column({ type: DataType.STRING, allowNull: true })
	public banReason: string;

	@BelongsToMany(() => RoleModel, () => UserRolesModel)
	public roles: RoleModel[];

	@HasMany(() => PostModel)
	public posts: PostModel[];
}