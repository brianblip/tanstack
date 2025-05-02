import mongoose from 'mongoose';
import Counter from './Counter.js';

const projectSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  clientId: {
    type: Number,  // Changed from ObjectId to Number
    ref: 'Client',
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ['Pending', 'In Progress', 'Completed'],
    default: 'Pending'
  },
  description: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Pre-save hook to auto-increment ID
projectSchema.pre('save', async function(next) {
  // Only set ID if it's a new document
  if (this.isNew) {
    try {
      this.id = await Counter.getNextSequence('Project');
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

export default mongoose.model('Project', projectSchema);