import { describe, it, before, after } from "mocha";
import { should, expect } from "chai";
import supertest from "supertest";
import mongoose from "mongoose";
import { usersService } from "../services/index.js";
import app from "../app.js"; 

should();

const requester = supertest(app);

before(async () => {
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(process.env.MONGODB_URI); 
    }
});

describe("Pruebas router users", function () {
    this.timeout(8000);

    after(async () => {
        await mongoose.connection.collection("users").deleteMany({ email: /testuser/i });
    });

    it("La ruta /api/users POST permite crear un usuario", async () => {
        let userMock = {
            first_name: "Test",
            last_name: "User",
            email: `testuser${Date.now()}@example.com`,
            password: "hashedpassword",
            role: "user",
            pets: []
        };

        let { body, status } = await requester.post("/api/users").send(userMock);

        expect(status).to.be.eq(201);
        expect(body.payload._id).to.exist;
        expect(body.payload.email).to.be.eq(userMock.email);
    });


    it("La ruta /api/users GET devuelve todos los usuarios", async () => {
        let { status, body } = await requester.get("/api/users");

        expect(status).to.be.eq(200);
        expect(body.status).to.be.eq("success");
        expect(Array.isArray(body.payload)).to.be.true;
    });


    it("La ruta /api/users/:uid GET devuelve un usuario específico", async () => {
        const user = await usersService.create({
            first_name: "Sample",
            last_name: "User",
            email: `sampleuser${Date.now()}@example.com`,
            password: "hashedpassword",
            role: "user",
            pets: []
        });

        const { status, body } = await requester.get(`/api/users/${user._id}`);

        expect(status).to.be.eq(200);
        expect(body.status).to.be.eq("success");
        expect(body.payload._id).to.eq(user._id.toString());
    });


    it("La ruta /api/users/:uid PUT actualiza los datos de un usuario", async () => {
        const user = await usersService.create({
            first_name: "Initial",
            last_name: "Name",
            email: `updateuser${Date.now()}@example.com`,
            password: "hashedpassword",
            role: "user",
            pets: []
        });

        let updatedData = { first_name: "Updated" };

        const { status, body } = await requester
            .put(`/api/users/${user._id}`)
            .send(updatedData);

        expect(status).to.be.eq(200);
        expect(body.status).to.be.eq("success");
        expect(body.payload.first_name).to.eq(updatedData.first_name);
    });

    it("La ruta /api/users/:uid DELETE elimina un usuario", async () => {
        const user = await usersService.create({
            first_name: "Delete",
            last_name: "User",
            email: `deleteuser${Date.now()}@example.com`,
            password: "hashedpassword",
            role: "user",
            pets: []
        });

        const { status, body } = await requester.delete(`/api/users/${user._id}`);

        expect(status).to.be.eq(200);
        expect(body.status).to.be.eq("success");
        expect(body.message).to.eq("Usuario eliminado");
    });

    it("La ruta /api/users/:uid DELETE devuelve error si el usuario no existe", async () => {
        let userId = "60f5a4f4d6e4e46a789c1234";
    
        let response = await requester.delete(`/api/users/${userId}`);
    
        expect(response.status).to.be.eq(404);
        expect(response.body).to.be.an("object");
        expect(response.body).to.have.property("error");
        expect(response.body.error).to.be.a("string");
        expect(response.body.error).to.include("Usuario no encontrado");
    });

    it("La ruta /api/users POST devuelve error si faltan campos obligatorios", async () => {
        let userMock = {
            first_name: "Test",
            last_name: "User",
            password: "hashedpassword", 
            role: "user",
            pets: []
        };
    
        let { status, body } = await requester.post("/api/users").send(userMock);
    
        expect(status).to.be.eq(400);
        expect(body.status).to.be.eq("error");
        expect(body.error).to.include("Todos los campos requeridos deben ser completados");
        expect(body).to.be.an("object");
        expect(body).to.have.property("error");
    });

    it("La ruta /api/users/:uid PUT devuelve error con email inválido", async () => {
        const user = await usersService.create({
            first_name: "Test",
            last_name: "User",
            email: `testuser${Date.now()}@example.com`,
            password: "hashedpassword",
            role: "user",
            pets: []
        });

        let invalidData = { email: "invalid-email" };

        const { status, body } = await requester
            .put(`/api/users/${user._id}`)
            .send(invalidData);

        expect(status).to.be.eq(400);
        expect(body.status).to.be.eq("error");
        expect(body.message).to.include("Invalid email format");
    });

});
