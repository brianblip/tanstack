import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Client from './models/Client.js';
import Project from './models/Project.js';
import Invoice from './models/Invoice.js';
import Counter from './models/Counter.js';

// Load environment variables
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/client-dashboard';

// Connect to MongoDB with extended timeout and better error handling
mongoose.connect(MONGODB_URI, {
  serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
})
  .then(() => {
    console.log('Connected to MongoDB for seeding');
    // Run the seed function only after successful connection
    seedData();
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    console.log('Please check if MongoDB is running or if your connection string is correct');
    process.exit(1);
  });

// Sample data
const seedData = async () => {
  try {
    // Reset counters first
    await Counter.deleteMany({});
    console.log('Counters reset');
    
    // Clear existing data
    await Client.deleteMany({});
    await Project.deleteMany({});
    await Invoice.deleteMany({});
    
    console.log('Previous data cleared');
    
    // Create clients
    const clients = await Client.create([
      {
        name: 'Acme Corporation',
        email: 'contact@acme.com',
        projects: []
      },
      {
        name: 'Wayne Enterprises',
        email: 'bruce@wayne.com',
        projects: []
      },
      {
        name: 'Stark Industries',
        email: 'tony@stark.com',
        projects: []
      },
      {
        name: 'Pied Piper',
        email: 'richard@piedpiper.com',
        projects: []
      }
    ]);
    
    console.log('Clients created:', clients.length);
    
    // Create projects
    const projects = [];
    
    // Projects for Acme Corporation
    const acmeProjects = await Project.create([
      {
        title: 'Website Redesign',
        clientId: clients[0].id,
        status: 'In Progress',
        description: 'Complete overhaul of company website with new branding'
      },
      {
        title: 'Mobile App Development',
        clientId: clients[0].id,
        status: 'Pending',
        description: 'iOS and Android app development'
      }
    ]);
    
    projects.push(...acmeProjects);
    
    // Projects for Wayne Enterprises
    const wayneProjects = await Project.create([
      {
        title: 'Security System Upgrade',
        clientId: clients[1].id,
        status: 'Completed',
        description: 'Implementing new security protocols for all systems'
      }
    ]);
    
    projects.push(...wayneProjects);
    
    // Projects for Stark Industries
    const starkProjects = await Project.create([
      {
        title: 'AI Integration',
        clientId: clients[2].id,
        status: 'In Progress',
        description: 'Implementing cutting-edge AI into existing systems'
      },
      {
        title: 'Energy Efficiency Consulting',
        clientId: clients[2].id,
        status: 'Pending',
        description: 'Analysis and recommendations for reducing energy consumption'
      }
    ]);
    
    projects.push(...starkProjects);
    
    // Projects for Pied Piper
    const pipedProjects = await Project.create([
      {
        title: 'Data Compression Implementation',
        clientId: clients[3].id,
        status: 'In Progress',
        description: 'Implementing middle-out compression algorithm'
      }
    ]);
    
    projects.push(...pipedProjects);
    
    console.log('Projects created:', projects.length);
    
    // Update client projects
    for (const project of projects) {
      await Client.findOneAndUpdate(
        { id: project.clientId },
        { $push: { projects: project.id } }
      );
    }
    
    // Create invoices
    const invoices = await Invoice.create([
      {
        clientId: clients[0].id,
        amount: 5000,
        status: 'paid',
        dueDate: new Date('2025-05-30'),
        description: 'Website Redesign - 50% deposit'
      },
      {
        clientId: clients[0].id,
        amount: 5000,
        status: 'pending',
        dueDate: new Date('2025-06-30'),
        description: 'Website Redesign - final payment'
      },
      {
        clientId: clients[1].id,
        amount: 12000,
        status: 'paid',
        dueDate: new Date('2025-04-15'),
        description: 'Security System Upgrade - full payment'
      },
      {
        clientId: clients[2].id,
        amount: 8500,
        status: 'pending',
        dueDate: new Date('2025-05-20'),
        description: 'AI Integration - 50% deposit'
      },
      {
        clientId: clients[3].id,
        amount: 7500,
        status: 'overdue',
        dueDate: new Date('2025-04-01'),
        description: 'Data Compression Implementation - 50% deposit'
      }
    ]);
    
    console.log('Invoices created:', invoices.length);
    
    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};