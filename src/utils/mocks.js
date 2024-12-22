import { fakerES_MX as faker } from "@faker-js/faker";
import { createHash } from "../utils/index.js";
import PetDTO from "../dto/Pet.dto.js";

export const generateUser = async (numUsers) => {
    const users = [];
    const password = 'coder123';
    for (let i = 0; i < numUsers; i++ ){
        const first_name = faker.person.firstName();
        const last_name = faker.person.lastName();
        const hashedPassword = await createHash(password);
        users.push({
            first_name,
            last_name,
            email: faker.internet.email({firstName: first_name,lastName: last_name}),
            password: hashedPassword,
            role: Math.random() < 0.5 ? 'user' : 'admin',
            pets: []
        })
    }
    return users;
}

export const generatePet = async (numPets) =>{
    let pets = [];
    for (let i=0; i < numPets; i++){
            const pet = {
            name: faker.animal.petName(),
            specie: faker.animal.dog(),
            birthDate: faker.date.birthdate({ mode: 'age', min: 1, max: 20 }).toISOString().split('T')[0],
            adopted: false,
            owner: null,
            image: faker.image.url()
        }
        pets.push(PetDTO.getPetInputFrom(pet));
    }   
    return pets;
}