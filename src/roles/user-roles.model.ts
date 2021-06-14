import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "src/users/user.model";
import { Role } from "./role.model";

interface UserRoleCreationAttrs {
	roleId: number;
	userId: number;
}

@Table({ tableName: 'user_roles', createdAt: false, updatedAt: false })
export class UserRoles extends Model<UserRoles, UserRoleCreationAttrs> {

	@Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
	public id: number;

	@ForeignKey(() => Role)
	@Column({ type: DataType.INTEGER })
	public roleId: number;

	@ForeignKey(() => User)
	@Column({ type: DataType.INTEGER })
	public userId: number;
}