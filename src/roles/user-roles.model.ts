import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { UserModel } from "src/users/user.model";
import { RoleModel } from "./role.model";

interface UserRoleCreationAttrs {
	roleId: number;
	userId: number;
}

@Table({ tableName: 'user_roles', createdAt: false, updatedAt: false })
export class UserRolesModel extends Model<UserRolesModel, UserRoleCreationAttrs> {

	@Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
	public id: number;

	@ForeignKey(() => RoleModel)
	@Column({ type: DataType.INTEGER })
	public roleId: number;

	@ForeignKey(() => UserModel)
	@Column({ type: DataType.INTEGER })
	public userId: number;
}