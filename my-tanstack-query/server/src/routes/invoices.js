import express from 'express';
import { 
  getInvoices, 
  getInvoiceById, 
  createInvoice, 
  updateInvoice, 
  deleteInvoice 
} from '../controllers/invoiceController.js';

const router = express.Router();

// GET all invoices
router.get('/', getInvoices);

// GET a single invoice
router.get('/:id', getInvoiceById);

// POST a new invoice
router.post('/', createInvoice);

// PATCH/update a invoice
router.patch('/:id', updateInvoice);

// DELETE a invoice
router.delete('/:id', deleteInvoice);

export default router;