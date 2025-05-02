import express from 'express';
import { 
  getProjects, 
  getProjectById, 
  createProject, 
  updateProject, 
  deleteProject 
} from '../controllers/projectController.js';

const router = express.Router();

// GET all projects
router.get('/', getProjects);

// GET a single project
router.get('/:id', getProjectById);

// POST a new project
router.post('/', createProject);

// PATCH/update a project
router.patch('/:id', updateProject);

// DELETE a project
router.delete('/:id', deleteProject);

export default router;