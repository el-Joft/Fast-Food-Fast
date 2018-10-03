class Validation {
  static createOrUpdateOrderValidation(req, res, next) {
    const order = req.body;
    const {
      menuId,
      orderedBy,
      quantity,
      totalPrice,
    } = order;
    let errMsg;
    
    if (!menuId) {
      errMsg = 'Menu Id is required';
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

    if (errMsg) {
      res.status(401).json(errMsg);
    }
    if (isNaN(menuId)) {
      res.status(400).send('MenuId is Invalid');
    }
    if (isNaN(orderedBy)) {
      res.status(400).send('UserId is Invalid');
    }

    next();
  }

  static createOrUpdateMenuValidation(req, res, next) {
    const menu = req.body;
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
      errMsg = 'Name of the Menu is required';
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

    if (errMsg) {
      res.status(404).send(errMsg);
    }

    if (isNaN(categoryId)) {
      res.status(400).send('Category is invalid');
    }
    if (isNaN(price)) {
      res.status(404).send('Price must be a Number');
    }
    next();
  }
}

export default Validation;
