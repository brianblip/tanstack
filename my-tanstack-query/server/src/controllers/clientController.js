import Client from '../models/Client.js';

// Get all clients
export const getClients = async (req, res) => {
  try {
    const clients = await Client.find();
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single client by ID
export const getClientById = async (req, res) => {
  try {
    const clientId = parseInt(req.params.id);
    const client = await Client.findOne({ id: clientId }).populate('projects');
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }
    res.status(200).json(client);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new client
export const createClient = async (req, res) => {
  const client = new Client(req.body);
  try {
    const newClient = await client.save();
    res.status(201).json(newClient);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a client
export const updateClient = async (req, res) => {
  try {
    const clientId = parseInt(req.params.id);
    const updatedClient = await Client.findOneAndUpdate(
      { id: clientId },
      req.body, 
      { new: true, runValidators: true }
    );
    if (!updatedClient) {
      return res.status(404).json({ message: 'Client not found' });
    }
    res.status(200).json(updatedClient);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a client
export const deleteClient = async (req, res) => {
  try {
    const clientId = parseInt(req.params.id);
    const client = await Client.findOneAndDelete({ id: clientId });
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }
    res.status(200).json({ message: 'Client deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};