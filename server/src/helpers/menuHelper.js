
/* Validate fields for create new Menu */
export const isValid = (menu) => {
  // Check all Orders
  const {
    name,
    description,
    image,
    price,
    categoryId,
    isAvailable,
  } = menu;

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
  return errMsg;
};

/* returns the response of a request */
export const error = (res, message) => res.status(401).json({ status: 'error', message });
