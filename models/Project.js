const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  demoUrl: { type: String, default: '#' },
  githubUrl: { type: String, default: '#' },
});

module.exports = mongoose.model('Project', projectSchema);
