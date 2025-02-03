import { Router } from 'express';
import petsController from '../controllers/pets.controller.js';
import uploader from '../utils/uploader.js';

const router = Router();

router.get('/',petsController.getAllPets);
router.post('/',petsController.createPet);
router.post('/withimage',uploader.single('image'), petsController.createPetWithImage);
router.put('/:pid',petsController.updatePet);
router.delete('/:pid',petsController.deletePet);

export default router;

/**
 * @swagger
 * /pets:
 *   get:
 *     summary: Obtener todas las mascotas
 *     tags: [Pets]
 *     responses:
 *       200:
 *         description: Lista de mascotas obtenida con éxito
 *       500:
 *         description: Error interno del servidor
 */
router.get('/', petsController.getAllPets);

/**
 * @swagger
 * /pets:
 *   post:
 *     summary: Crear una nueva mascota
 *     tags: [Pets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               specie:
 *                 type: string
 *               birthDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Mascota creada con éxito
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error interno del servidor
 */
router.post('/', petsController.createPet);

/**
 * @swagger
 * /pets/withimage:
 *   post:
 *     summary: Crear una nueva mascota con imagen
 *     tags: [Pets]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               specie:
 *                 type: string
 *               birthDate:
 *                 type: string
 *                 format: date
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Mascota creada con imagen con éxito
 *       400:
 *         description: Datos inválidos o imagen faltante
 *       500:
 *         description: Error interno del servidor
 */
router.post('/withimage', uploader.single('image'), petsController.createPetWithImage);

/**
 * @swagger
 * /pets/{pid}:
 *   put:
 *     summary: Actualizar una mascota por ID
 *     tags: [Pets]
 *     parameters:
 *       - name: pid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la mascota a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               specie:
 *                 type: string
 *               birthDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Mascota actualizada con éxito
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error interno del servidor
 */
router.put('/:pid', petsController.updatePet);

/**
 * @swagger
 * /pets/{pid}:
 *   delete:
 *     summary: Eliminar una mascota por ID
 *     tags: [Pets]
 *     parameters:
 *       - name: pid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la mascota a eliminar
 *     responses:
 *       200:
 *         description: Mascota eliminada con éxito
 *       500:
 *         description: Error interno del servidor
 */
router.delete('/:pid', petsController.deletePet);