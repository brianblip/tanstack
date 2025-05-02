import mongoose from 'mongoose';

// Define the counter schema for auto-incrementing IDs
const counterSchema = new mongoose.Schema({
  model: {
    type: String,
    required: true,
    unique: true
  },
  seq: {
    type: Number,
    default: 0
  }
});

// Create a static method to get the next sequence value
counterSchema.statics.getNextSequence = async function(modelName) {
  const doc = await this.findOneAndUpdate(
    { model: modelName },
    { $inc: { seq: 1 } },
    { 
      new: true,       // Return the updated document
      upsert: true     // Create if it doesn't exist
    }
  );
  return doc.seq;
};

export default mongoose.model('Counter', counterSchema);