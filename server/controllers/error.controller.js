// server/controllers/error.controller.js
import dbErrorHandler from "../helpers/dbErrorHandler.js";

const getErrorMessage = (err) => {
  return dbErrorHandler.getErrorMessage(err);
};

const handleError = (err, req, res, next) => {
  console.error(err);
  return res.status(400).json({ error: getErrorMessage(err) });
};

export default { getErrorMessage, handleError };

