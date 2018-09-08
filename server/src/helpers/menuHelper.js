
// Check the id of every request to see if they are number or not
export const parsedInt = id => ((!(/^\d+$/.test(id))) ? NaN : parseInt(id, 10));

/* Validate fields for create new ride offers */
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
