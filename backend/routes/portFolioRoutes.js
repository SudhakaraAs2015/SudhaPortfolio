const express = require("express");
const router = express.Router();
const {
  Intro,
  About,
  Projects,
  Contact,
  EducationAndExperience,
  Course,
} = require("../models/PortFolioModel");

const User = require("../models/UserModel");

router.get("/get-portfolio-data", async (req, res) => {
  try {
    const intros = await Intro.find();
    const abouts = await About.find();
    const projects = await Projects.find();
    const contacts = await Contact.find();
    const educationandExperiences = await EducationAndExperience.find();
    const courses = await Course.find();

    res.status(200).send({
      intro: intros[0],
      about: abouts[0],
      projects: projects,
      educationandExperiences: educationandExperiences,
      contact: contacts[0],
      courses: courses,
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update Intro

router.put("/update-intro", async (req, res) => {
    
  try {
    const intro = await Intro.findOneAndUpdate(
      { _id: req.body._id },
      req.body,
      { new: true }
    );
    res.status(200).send({
      data: intro,
      success: true,
      message: "Intro updated Successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

//Update About

router.put("/update-about", async (req, res) => {
  try {
    const about = await About.findByIdAndUpdate(
      { _id: req.body._id },
      req.body,
      { new: true }
    );
    res.status(200).send({
      data: about,
      success: true,
      message: "About updated Successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

//Add Experience

router.post("/add-experience", async (req, res) => {
  try {
    const experience = new EducationAndExperience(req.body);
    await experience.save();
    res.status(200).send({
      data: experience,
      success: true,
      message: "Education And Experiences added Successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

//Update Experience

router.post("/update-experience", async (req, res) => {
  try {
    const experience = await EducationAndExperience.findOneAndUpdate(
      { _id: req.body._id },
      req.body,
      { new: true }
    );
    res.status(200).send({
      data: experience,
      success: true,
      message: "Education And Experiences updated Successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

// Delete Experience

router.delete("/delete-experience", async (req, res) => {
  try {
    const experience = await EducationAndExperience.findOneAndDelete({
      _id: req.body._id,
    });
    res.status(200).send({
      data: experience,
      success: true,
      message: "Education And Experiences deleted Successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

//Add Projects

router.post("/add-projects", async (req, res) => {
  try {
    const projects = new Projects(req.body);
    await projects.save();
    res.status(200).send({
      data: projects,
      success: true,
      message: "Projects added Successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

//Update Projects
router.put("/update-projects", async (req, res) => {
  try {
    const projects = await Projects.findOneAndUpdate(
      { _id: req.body._id },
      req.body,
      { new: true }
    );
    res.status(200).send({
      data: projects,
      success: true,
      message: "Projects updated Successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

// Delete Projects

router.delete("/delete-projects", async (req, res) => {
  try {
    const projects = await Projects.findOneAndDelete({
      _id: req.body._id,
    });
    res.status(200).send({
      data: projects,
      success: true,
      message: "Projects deleted Successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

// Add Courses
router.post("/add-courses", async (req, res) => {
  try {
    const courses = new Course(req.body);
    await courses.save();
    res.status(200).send({
      data: courses,
      success: true,
      message: "Course added Successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

//Update Courses
router.put("/update-courses", async (req, res) => {
  try {
    const courses = await Course.findOneAndUpdate(
      { _id: req.body._id },
      req.body,
      { new: true }
    );
    res.status(200).send({
      data: courses,
      success: true,
      message: "Course updated Successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

// Delete Courses

router.delete("/delete-courses", async (req, res) => {
  try {
    const courses = await Course.findOneAndDelete({
      _id: req.body._id,
    });
    res.status(200).send({
      data: courses,
      success: true,
      message: "Course deleted Successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update Contact

router.put("/update-contact", async (req, res) => {
  try {
    const contact = await Contact.findOneAndUpdate(
      { _id: req.body._id },
      req.body,
      { new: true }
    );
    res.status(200).send({
      data: contact,
      success: true,
      message: "Contact updated Successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

//Admin Login

router.post("/admin-login", async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
      password: req.body.password,
    });
    user.password = "";
    if (user) {
      res.status(200).send({
        data: user,
        success: true,
        message: "Login Successfully",
      });
    }
    else{
        res.status(200).send({
            data:user,
            success:false,
            message:"Invalid Username and Password",
        }); 
    }
  } catch (error) {
    res.status(500).send(error);
  }
});
module.exports = router;
