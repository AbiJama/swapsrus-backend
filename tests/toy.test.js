const { expect } = require("chai");
const request = require("supertest");
const { Toy, User } = require("../src/models");
const app = require("../src/app");

describe("/users/:id/toys", () => {
	before(async () => await Toy.sequelize.sync());

	beforeEach(async () => {
		await Toy.destroy({ where: {} });
	});

	describe("with no toys in database", () => {
		describe("POST /users/:id/toys", () => {
			it("creates a new toy in the database", async () => {
                const mockUser = {
                    id: 1,
                    name: "mock name",
                    email: "mock@mockmail.com",
                    area: "mockford"
                }

				const { id } = mockUser.id;
				const response = await request(app).post(`/users/${id}/toy`).send({
					title: "brand new doll",
					type: "soft toy",
					condition: "used",
					ageRange: "pre-school",
					postcode: "IG1",
					description: "30cm doll with milk bottle",
					borrowPeriod: "2 weeks",
                    image: "doll"
				});
				const newUserRecord = await User.findByPk(response.body.id, {
					raw: true,
				});

				expect(response.status).to.equal(201);
			});
		});
	});
});
