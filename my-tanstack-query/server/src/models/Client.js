import mongoose from 'mongoose';
import Counter from './Counter.js';

const clientSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  projects: [{
    type: Number,  // Changed from ObjectId to Number
    ref: 'Project'
  }]
}, {
  timestamps: true
});

// Pre-save hook to auto-increment ID
clientSchema.pre('save', async function(next) {
  // Only set ID if it's a new document
  if (this.isNew) {
    try {
      this.id = await Counter.getNextSequence('Client');
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

export default mongoose.model('Client', clientSchema);