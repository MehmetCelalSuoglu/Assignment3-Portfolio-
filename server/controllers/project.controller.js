import Project from "../models/project.js";
import errorHandler from "./error.controller.js";

// Create a new project
const create = async (req, res) => {
  const project = new Project(req.body);
  try {
    await project.save();
    return res.status(200).json({ message: "Project created successfully!" });
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

// List all projects
const list = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

// Get project by ID
const projectByID = async (req, res, next, id) => {
  try {
    const project = await Project.findById(id);
    if (!project) return res.status(400).json({ error: "Project not found" });
    req.project = project;
    next();
  } catch (err) {
    return res.status(400).json({ error: "Could not retrieve project" });
  }
};

// Read single project
const read = (req, res) => {
  return res.json(req.project);
};

// Update project
const update = async (req, res) => {
  let project = req.project;
  project = Object.assign(project, req.body);
  try {
    await project.save();
    res.json(project);
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

// Delete project
const remove = async (req, res) => {
  try {
    const deletedProject = await req.project.deleteOne();
    res.json(deletedProject);
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

export default { create, list, read, update, remove, projectByID };