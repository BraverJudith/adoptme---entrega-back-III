import PetDTO from "../dto/Pet.dto.js";
import { petsService } from "../services/index.js"
import __dirname from "../utils/index.js";
import  CustomError  from '../utils/CustomError.js';
import { generatePetErrorInfo } from '../utils/infoError.js';
import { EErrors }  from '../utils/EErrors.js';

const getAllPets = async (req, res) => {
    try {
        const pets = await petsService.getAll();
        res.status(200).json({ status: "success", payload: pets });
    } catch (error) {
        res.status(500).json({ status: "error", message: "Error interno del servidor" });
    }
};

const createPet = async (req, res, next) => {
    try {
        const { name, specie, birthDate } = req.body;

        if (!name || !specie || !birthDate) {
            throw CustomError.createError({
                name: "Pet creation Error",
                cause: generatePetErrorInfo({ name, specie, birthDate }),
                message: "Error trying to create pet",
                code: EErrors.ARGUMENTOS_INVALIDOS
            });
        }

        const pet = PetDTO.getPetInputFrom({ name, specie, birthDate });
        const result = await petsService.create(pet);
        res.status(200).json({ status: "success", payload: result });

    } catch (error) {
        if (error.code === EErrors.ARGUMENTOS_INVALIDOS) {
            return res.status(400).json({ status: "error", message: error.message });
        }
        console.error("Internal Server Error:", error);
        res.status(500).json({ status: "error", message: "Internal Server Error" });
    }
};

const updatePet = async (req, res) => {
    try {
        const petUpdateBody = req.body;
        const petId = req.params.pid;
        const result = await petsService.update(petId, petUpdateBody);
        if (!result) {
            return res.status(500).json({ status: "error", message: "No se pudo actualizar la mascota" });
        }
        else{
            res.status(200).json({ status: "success", message: "Mascota actualizada con éxito" });
        }     
    } catch (error) {
        res.status(500).json({ status: "error", message: "Error interno del servidor", error: error.message });
    }
};

const deletePet = async (req, res) => {
    try {
        const petId = req.params.pid;
        await petsService.delete(petId);
        res.status(200).json({ status: "success", message: "Mascota eliminada con éxito" });
    } catch (error) {
        res.status(500).json({ status: "error", message: "Error interno del servidor" });
    }
};

const createPetWithImage = async (req, res) => {
    try {
        const file = req.file;
        const { name, specie, birthDate } = req.body;

        if (!name || !specie || !birthDate || !file) {
            return res.status(400).json({ status: "error", message: "Datos inválidos o imagen faltante" });
        }

        const pet = PetDTO.getPetInputFrom({
            name,
            specie,
            birthDate,
            image: `${__dirname}/../public/img/${file.filename}`,
        });

        const result = await petsService.create(pet);
        res.status(200).json({ status: "success", payload: result });
    } catch (error) {
        res.status(500).json({ status: "error", message: "Error interno del servidor" });
    }
};

export default {
    getAllPets,
    createPet,
    updatePet,
    deletePet,
    createPetWithImage
};