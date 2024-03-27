const { expect } = require("chai");
const request = require("supertest");
const { User } = require("../src/models");
const app = require("../src/app");

describe("/users", () => {
	before(async () => await User.sequelize.sync({ force: true }));

	beforeEach(async () => await User.destroy({ where: {} }));

	describe("with no users in database", () => {
		describe("/users", () => {
			it("creates a new user in the database", async () => {
				const response = await request(app).post("/users").send({
					name: "Thasnima Begum",
					email: "thasnima@commandshift.com",
					area: "Ilford",
				});
				const newUserRecord = await User.findByPk(response.body.id, {
					raw: true,
				});

				expect(response.status).to.equal(201);
				expect(response.body.name).to.equal("Thasnima Begum")
				expect(newUserRecord.name).to.equal("Thasnima Begum")
				expect(newUserRecord.email).to.equal("thasnima@commandshift.com")
				expect(newUserRecord.area).to.equal("Ilford")

			});
		});
	});

});
