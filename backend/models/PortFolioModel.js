const mongoose = require("mongoose");

// Intro Schema
const introSchema = new mongoose.Schema({
  greetText: {
    type: String,
    required: true,
  },
  introText: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

// About Schema
const aboutSchema = new mongoose.Schema({
  lottieURL: {
    type: String,
    required: true,
  },
  Aboutdescription: {
    type: String,
    required: true,
  },
  skills: {
    type: [String],
    required: true,
  },
});

// Education and Experiences Schema
const educationAndExperiencesSchema = new mongoose.Schema({
  organization: {
    type: String,
    required: true,
  },
  period: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

// Project Schema
const projectSchema = new mongoose.Schema({
  technologies: {
    type: [String],
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
});

// Courses Schema
const courseSchema = new mongoose.Schema({
  title: {
    type: [String], // Specify type
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    // Corrected typo
    type: String,
    required: true,
  },
});

// Contact Schema
const contactSchema = new mongoose.Schema({
  name: {
    type: [String],
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

module.exports = {
  Intro: mongoose.model("intros", introSchema),
  About: mongoose.model("abouts", aboutSchema),
  Course: mongoose.model("courses", courseSchema),
  EducationAndExperience: mongoose.model(
    "educationandexperiences",
    educationAndExperiencesSchema
  ),
  Contact: mongoose.model("contacts", contactSchema),
  Projects: mongoose.model("projects", projectSchema),
};

