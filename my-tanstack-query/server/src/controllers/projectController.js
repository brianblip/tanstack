import Project from '../models/Project.js';
import Client from '../models/Client.js';

// Get all projects
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate('clientId', 'name email id');
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single project by ID
export const getProjectById = async (req, res) => {
  try {
    const projectId = parseInt(req.params.id);
    const project = await Project.findOne({ id: projectId }).populate('clientId', 'name email id');
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new project
export const createProject = async (req, res) => {
  const project = new Project(req.body);
  try {
    const newProject = await project.save();
    
    // Add project reference to client's projects array
    const clientId = parseInt(req.body.clientId);
    await Client.findOneAndUpdate(
      { id: clientId },
      { $push: { projects: newProject.id } }
    );
    
    res.status(201).json(newProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a project
export const updateProject = async (req, res) => {
  try {
    const projectId = parseInt(req.params.id);
    const updatedProject = await Project.findOneAndUpdate(
      { id: projectId }, 
      req.body, 
      { new: true, runValidators: true }
    );
    if (!updatedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a project
export const deleteProject = async (req, res) => {
  try {
    const projectId = parseInt(req.params.id);
    const project = await Project.findOne({ id: projectId });
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    // Remove project reference from client's projects array
    await Client.findOneAndUpdate(
      { id: project.clientId },
      { $pull: { projects: project.id } }
    );
    
    await Project.findOneAndDelete({ id: projectId });
    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};