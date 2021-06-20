import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { UserModel } from "src/users/user.model";
import { UserRolesModel } from "./user-roles.model";

interface RoleCreationAttrs {
	value: string;
	description: string;
}

@Table({ tableName: 'roles' })
export class RoleModel extends Model<RoleModel, RoleCreationAttrs> {
	@Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
	public id: number;

	@Column({ type: DataType.STRING, unique: true, allowNull: false })
	public value: string;

	@Column({ type: DataType.STRING, allowNull: false })
	public description: string;

	@BelongsToMany(() => UserModel, () => UserRolesModel)
	public users: UserModel[];
}