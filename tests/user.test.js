const { expect } = require("chai");
const request = require("supertest");
const { User } = require("../src/models");
const app = require("../src/app");

describe("/users", () => {
	before(async () => await User.sequelize.sync());

	beforeEach(async () => {
		await User.destroy({where: {}})
	});

	describe("with no users in database", () => {
		describe("POST /users", () => {
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

	describe("with records in the database", () => {
		let users;

		beforeEach(async () => {
			users = await Promise.all([
				User.create({
					name: "Elizabeth Bennet",
					email: "future_ms_darcy@gmail.com",
					area: "Ilford",
				}),
				User.create({
					name: "Arya Stark",
					email: "vmorgul@me.com",
					area: "Newham",
				}),
				User.create({
					name: "Lyra Belacqua",
					email: "darknorth123@msn.org",
					area: "Newham",
				}),
			]);
		});

		describe("GET /users", () => {
			it("gets all users records", async () => {
				const response = await request(app).get("/users");

				expect(response.status).to.equal(200);
				expect(response.body.length).to.equal(3);

				response.body.forEach((user) => {
					const expected = users.find((a) => a.id === user.id);

					expect(user.name).to.equal(expected.name);
					expect(user.email).to.equal(expected.email);
				});
			});
		});

		describe("GET /users/:id", () => {
			it("gets users record by id", async () => {
				const user = users[0];
				const response = await request(app).get(`/users/${user.id}`);

				expect(response.status).to.equal(200);
				expect(response.body.name).to.equal(user.name);
				expect(response.body.email).to.equal(user.email);
			});

			it("returns a 404 if the user does not exist", async () => {
				const response = await request(app).get("/users/12345");

				expect(response.status).to.equal(404);
				expect(response.body.error).to.equal("The user could not be found.");
			});
		});


		describe("DELETE /users/:id", () => {
			it("deletes user record by id", async () => {
				const user = users[0];
				const response = await request(app).delete(`/users/${user.id}`);
				const deletedUser = await User.findByPk(user.id, { raw: true });

				expect(response.status).to.equal(204);
				expect(deletedUser).to.equal(null);
			});

			it("returns a 404 if the user does not exist", async () => {
				const response = await request(app).delete("/users/12345");
				expect(response.status).to.equal(404);
				expect(response.body.error).to.equal("The user could not be found.");
			});
		});
})

});
