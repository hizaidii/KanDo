const mongoose = require("mongoose");
const { Schema } = mongoose;

// Task schema
const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  creationDate: {
    type: Date,
  },
  position: {
    type: Number,
    default: 0, // Initialize to 0 or another appropriate value
  },
});

// Swimlane schema
const swimlaneSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  statusColor: String,
  tasks: [taskSchema], // Array of Task documents
});

// Board schema
const boardSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  swimlanes: [swimlaneSchema], // Array of Swimlane documents
});

// User schema that contains boards
const userSchema = new Schema({
  username: {
    type: String,
    // required: true,
  },
  name: String,
  password: String,
  image_URL: String,

  totalTasks: {
    type: Number,
    default: 0,
  },
  deletedTasks: {
    type: Number,
    default: 0,
  },
  // currentTasks: {
  //   type: Number,
  //   default: 0,
  // },

  FB_AccessToken: String,
  FB_ID: String,
  FB_Name: String,
  Google_AccessToken: String,
  Google_Name: String,
  Google_Photo: String,
  Google_ID: String,

  boards: [boardSchema], // Array of Board documents
});

module.exports = mongoose.model("User", userSchema);
