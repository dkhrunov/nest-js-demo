import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { UserModel } from "src/users/user.model";

interface PostCreationAttrs {
	readonly title: string;
	readonly content: string;
	readonly userId: number;
	readonly image: string;
}

@Table({ tableName: 'posts' })
export class PostModel extends Model<PostModel, PostCreationAttrs> {
	@Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true, unique: true })
	public id: number;

	@Column({ type: DataType.STRING, allowNull: false })
	public title: string;
	
	@Column({ type: DataType.STRING, allowNull: false })
	public content: string;
	
	@Column({ type: DataType.STRING, allowNull: true })
	public image: string;
	
	@ForeignKey(() => UserModel)
	@Column({ type: DataType.INTEGER })
	public userId: number;

	@BelongsTo(() => UserModel)
	public author: UserModel;
}