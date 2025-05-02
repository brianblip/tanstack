import express from 'express';
import { 
  getClients, 
  getClientById, 
  createClient, 
  updateClient, 
  deleteClient 
} from '../controllers/clientController.js';

const router = express.Router();

// GET all clients
router.get('/', getClients);

// GET a single client
router.get('/:id', getClientById);

// POST a new client
router.post('/', createClient);

// PATCH/update a client
router.patch('/:id', updateClient);

// DELETE a client
router.delete('/:id', deleteClient);

export default router;