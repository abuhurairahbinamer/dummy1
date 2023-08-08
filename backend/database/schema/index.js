const mongoose=require("mongoose");

// const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  path: { type: String, required: true },
  // Add other fields as needed for your specific use case, like title, description, etc.
});

const Video = mongoose.model('Videomodel', videoSchema);

module.exports = Video;