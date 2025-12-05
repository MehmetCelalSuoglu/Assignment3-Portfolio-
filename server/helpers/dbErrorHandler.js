const getUniqueErrorMessage = (err) => {
  try {
    let fieldName =
      err.message.substring(err.message.lastIndexOf(".$") + 2, err.message.lastIndexOf("_1"));
    return fieldName.charAt(0).toUpperCase() + fieldName.slice(1) + " already exists";
  } catch (ex) {
    return "Duplicate already exists";
  }
};

const getErrorMessage = (err) => {

  if (err.code === 11000 || err.code === 11001) {
    return getUniqueErrorMessage(err);
  }

  if (err.errors) {
    const messages = Object.values(err.errors)
      .map((errorObj) => errorObj.message)
      .filter(Boolean);

    if (messages.length > 0) {
      return messages.join(", ");
    }
  }

  if (err.message) {
    return err.message;
  }

  return "Something went wrong!";
};

export default { getErrorMessage };

