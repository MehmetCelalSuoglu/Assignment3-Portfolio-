import Contact from "../models/contact.model.js";
import extend from "lodash/extend.js";
import errorHandler from "./error.controller.js";

// CREATE
const create = async (req, res) => {
  const contact = new Contact(req.body);
  try {
    await contact.save();
    return res.status(200).json({
      message: "Successfully created!",
    });
  } catch (err) {
    console.error("CREATE CONTACT ERROR:", err);
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

// LIST ALL (admin)
const list = async (req, res) => {
  try {
    const contacts = await Contact.find()
      .select("firstname lastname email message created")
      .sort({ created: -1 });
    return res.json(contacts);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const contactByID = async (req, res, next, id) => {
  try {
    const contact = await Contact.findById(id);
    if (!contact) {
      return res.status(400).json({
        error: "Contact not found",
      });
    }
    req.contact = contact;
    next();
  } catch (err) {
    return res.status(400).json({
      error: "Could not retrieve contact",
    });
  }
};

const read = (req, res) => {
  return res.json(req.contact);
};

const update = async (req, res) => {
  try {
    let contact = req.contact;
    contact = extend(contact, req.body);
    contact.updated = Date.now();
    await contact.save();
    return res.json(contact);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const remove = async (req, res) => {
  try {
    const contact = req.contact;
    const deletedContact = await contact.deleteOne();
    return res.json({
      message: "Contact deleted",
      contact: deletedContact,
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const removeAll = async (req, res) => {
  try {
    const result = await Contact.deleteMany({});
    return res.json({
      message: "All contacts deleted",
      deletedCount: result.deletedCount,
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

export default {
  create,
  contactByID,
  read,
  list,
  remove,
  update,
  removeAll,
};
