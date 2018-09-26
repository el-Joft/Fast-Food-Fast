
/* Validate fields for create new Menu */
export const createMenuValidation = (menu) => {
  // Check all Orders
  const {
    name,
    description,
    image,
    price,
    categoryId,
    isAvailable,
  } = menu;
  const statusCode = 401;
  let errMsg;

  if (!name && name.trim() === '') {
    errMsg = 'Name of the Meunu is required';
  }

  if (!description && description.trim() === '') {
    errMsg = 'Menu Description is Required';
  }
  if (!price) {
    errMsg = 'Price is Required';
  }
  

  if (!categoryId) {
    errMsg = 'Specify the Category of the Menu';
  }
  return { statusCode, errMsg };
};


/* returns the response of a request */
export const error = (res, statusCode, message) => res.status(statusCode).json({ status: 'error', message });
