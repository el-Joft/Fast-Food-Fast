
/* Validate fields for create new orders */
export const createOrderValidation = (order) => {
  // Check all Orders
  const {
    menuId,
    timeOrdered,
    orderedBy,
    quantity,
    totalPrice,
  } = order;
  
  const statusCode = 401;
  let errMsg;

  if (!menuId) {
    errMsg = 'Menu Id is required';
  }

  if (!timeOrdered && timeOrdered.trim() === '') {
    errMsg = 'Ordered Time is required';
  }
  if (!orderedBy) {
    errMsg = 'The user Id ordering is required';
  }
  if (!quantity) {
    errMsg = 'Quantity of food item is required';
  }
  
  if (!totalPrice) {
    errMsg = 'Total cost of item is required';
  }
  if (quantity < 1) {
    errMsg = 'Quantity must cannot be less than 1';
  }

  return { statusCode, errMsg };
};


/* returns the response of a request */
export const error = (res, statusCode, message) => res.status(statusCode).json({ status: 'error', message });
