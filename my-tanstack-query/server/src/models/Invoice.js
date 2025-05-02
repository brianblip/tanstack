import mongoose from 'mongoose';
import Counter from './Counter.js';

const invoiceSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true
  },
  clientId: {
    type: Number,  // Changed from ObjectId to Number
    ref: 'Client',
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'paid', 'overdue'],
    default: 'pending'
  },
  dueDate: {
    type: Date
  },
  description: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Pre-save hook to auto-increment ID
invoiceSchema.pre('save', async function(next) {
  // Only set ID if it's a new document
  if (this.isNew) {
    try {
      this.id = await Counter.getNextSequence('Invoice');
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

export default mongoose.model('Invoice', invoiceSchema);