module.exports = (connection, DataTypes) => {
	const schema = {
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				isEmail: true,
				len: [8, 150],
			},
		},
        area: {
            type: DataTypes.STRING,
            allowNull: false,
        },
		uid: {
			type: DataTypes.STRING,
			allowNull: true,
		}

	};
    const UserModel = connection.define('User', schema)
    return UserModel
};
