import { generatePet,generateUser } from "../utils/mocks.js";
import { generateMockData } from '../services/mocks.service.js';


export const getMockingsPet = async (req, res) => {
        try {
            const numPets = parseInt(req.query.num, 10) || 50;            
            const pets = await generatePet(numPets);
            res.setHeader('Content-Type', 'application/json');
            return res.status(200).json({ payload: pets });
        } catch (error) {
        console.log(error);
        res.setHeader('Content-Type','application/json');
        return res.status(500).json(
            {
                error:`Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
                detalle:`${error.message}`
            }
        )
        
    }
};

export const getMockingsUsers = async (req, res) => {
        try {
            const numUsers = parseInt(req.query.num) || 100;            
            const users = await generateUser(numUsers);
            res.setHeader('Content-Type', 'application/json');
            return res.status(200).json({ payload: users });
        } catch (error) {
        console.log(error);
        res.setHeader('Content-Type','application/json');
        return res.status(500).json(
            {
                error:`Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
                detalle:`${error.message}`
            }
        )
        
    }
};

export const generateData = async (req, res) => {
    const { users, pets } = req.body;

    if (!users || !pets || isNaN(users) || isNaN(pets)) {
        return res.status(400).json({ message: 'Debes enviar parámetros numéricos para users y pets' });
    }

    try {
        const result = await generateMockData(parseInt(users), parseInt(pets));
        res.status(201).json({
            message: `Se generaron ${result.usersInserted} usuarios y ${result.petsInserted} mascotas correctamente.`,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al generar datos', error: error.message });
    }
};
