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

  static createUserValidation(req, res, next) {
    const usersDetails = req.body;
    const {
      firstName,
      lastName,
      email,
      phone,
      password,
      confirmPassword,
      address,
      city,
      zipCode,
    } = usersDetails;
    let errMsg;

    /* Check for first name */
    if (!firstName || firstName.trim() === '' && ((typeof firstName) !== 'string')) {
      errMsg = 'First name is required.';
    }

    /* check if last name is valid */
    if (!lastName || lastName.trim() === '' && typeof (lastName !== 'string')) {
      errMsg = 'Last name is required.';
    }
    /* Validate email */
    /* regular expression for testing email address */
    let emailRegex = /[^\s]*@[a-z0-9.-]*/i;
    /* test email address */
    emailRegex = emailRegex.test(String(email).toLowerCase());

    if (!emailRegex) {
      errMsg = 'Invalid Email Address';
    }

    /* Check for phone number  */
    if (!phone || phone.trim() === '' && (typeof phone !== 'string')) {
      errMsg = 'Phone cannot be empty';
    }

    /* Check for password */
    if (!password || password.trim().length < 6 && (typeof password !== 'string')) {
      errMsg = 'Password cannot be less than six characters';
    }

    /* check if password is matching  */
    if (!confirmPassword || confirmPassword !== password) {
      errMsg = 'Password does not match';
    }

    /* check for address  */
    if (!address || address.trim() === '' && (typeof address !== 'string')) {
      errMsg = 'Address field cannot be empty';
    }

    /* Check for city */
    if (!city || city.trim() === '' && typeof (city !== 'string')) {
      errMsg = 'City is empty or invalid';
    }

    /* Check for zipCode */
    if (!zipCode || zipCode.trim() === '' && (typeof (zipCode !== 'string'))) {
      errMsg = 'Zip Code is required';
    }
    if (errMsg) {
      res.status(400).json({
        message: errMsg,
      });
    } else {
      next();
    }
  }

  static loginUserValidation(req, res, next) {
    const { email, password } = req.body;
    let errMsg;

    /* regular expression for testing email address */
    let emailRegex = /[^\s]*@[a-z0-9.-]*/i;
    /* test email address */
    emailRegex = emailRegex.test(String(email).toLowerCase());
    if (!emailRegex) {
      errMsg = 'Email or password is Incorrect';
    }

    /* Check for password */
    if (!password || typeof password !== 'string') {
      errMsg = 'Email or password is incorrect';
    }
    if (errMsg) {
      res.status(400).json({
        message: errMsg,
      });
    } else {
      next();
    }
  }
}

export default Validation;
