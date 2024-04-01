module.exports = (connection, DataTypes) => {
	const schema = {
		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		type: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		condition: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		ageRange: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		postcode: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		description: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		borrowPeriod: {
			type: DataTypes.STRING,
			allowNull: false,
		},
        image: {
			type: DataTypes.STRING,
			allowNull: true,
		}
	};
	const ToyModel = connection.define("Toy", schema);
	return ToyModel;
};
