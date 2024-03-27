const Sequelize = require("sequelize");
const UserModel = require("./user");
const ToyModel = require("./toy")

const { PGDATABASE, PGPORT, PGPASSWORD, PGUSER, PGHOST } = process.env;

const setUpDatabase = () => {
	const connection = new Sequelize(PGDATABASE, PGUSER, PGPASSWORD, {
		host: PGHOST,
		port: PGPORT,
		dialect: "postgres",
		logging: false,
	});
	const User = UserModel(connection, Sequelize);
	const Toy = ToyModel(connection, Sequelize)

	connection.sync({ alter: true });
	return { User, Toy };

};

module.exports = setUpDatabase();

