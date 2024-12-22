import { generateUser, generatePet } from '../utils/mocks.js';
import UsersDAO from '../dao/Users.dao.js';
import PetDAO from '../dao/Pets.dao.js';

const usersDAO = new UsersDAO();
const petDAO = new PetDAO();

export const generateMockData = async (numUsers, numPets) => {
    try {
        const users = await generateUser(numUsers);
        const userPromises = users.map((user) => usersDAO.save(user)); 
        await Promise.all(userPromises); 

        const pets = await generatePet(numPets);
        const petPromises = pets.map((pet) => petDAO.save(pet)); 
        await Promise.all(petPromises); 
        return { usersInserted: users.length, petsInserted: pets.length };
    } catch (error) {
        console.error('Error al generar datos:', error);
        throw new Error('Error al generar datos mock');
    }
};
