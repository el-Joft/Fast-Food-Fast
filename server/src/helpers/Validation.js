class Validation {
  static createOrUpdateOrderValidation(req, res, next) {
    const order = req.body;
    const {
      menuid,
      orderedby,
      quantity,
      // totalPrice,
    } = order;
    let errMsg;
    if (!menuid) {
      errMsg = 'Menu Id is required';
    }

    if (!orderedby) {
      errMsg = 'The user Id ordering is required';
    }
    if (!quantity) {
      errMsg = 'Quantity of food item is required';
    }

    // if (!totalPrice) {
    //   errMsg = 'Total cost of item is required';
    // }
    if (!quantity || quantity < 1) {
      errMsg = 'Quantity must cannot be less than 1';
    }

    if (errMsg) {
      return res.status(401).json(errMsg);
    }
    // if (isNaN(menuId)) {
    //   res.status(400).send('MenuId is Invalid');
    // }
    if (isNaN(orderedby)) {
      return res.status(400).send('UserId is Invalid');
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

    if (!name) {
      errMsg = 'Name cannot be empty, please provide one';
    }
    // if (!name && name.trim() === '') {
    //   errMsg = 'Name of the Menu is required';
    // }
    if (!name || name.length >= 50) {
      errMsg = 'Name Field cannot be more than 50 characters';
    }

    if (!description && description.trim() === '') {
      errMsg = 'Menu Description is Required';
    }
    if (!description || description.length >= 250) {
      errMsg = 'Description Field cannot be more than 250 characters';
    }
    if (!price) {
      errMsg = 'Price is Required';
    }
    if (!categoryId) {
      errMsg = 'Specify the Category of the Menu';
    }

    // if (errMsg) {
    //   res.status(404).send(errMsg);
    // }

    if (isNaN(categoryId)) {
      return res.status(400).send('Category is invalid');
    }
    if (isNaN(price)) {
      return res.status(404).send('Price must be a Number');
    }
    if (errMsg) {
      return res.status(400).json({
        message: errMsg,
      });
    }
    next();
  }


  static createUserValidation(req, res, next) {
    const {
      firstname,
      lastname,
      email,
      phone,
      password,
      confirmPassword,
      address,
      city,
      zipcode,
    } = req.body;
    let errMsg;
    /* Check for first name */
    if (!firstname || firstname.trim() === '' && ((typeof firstname) !== 'string')) {
      errMsg = 'First name is required.';
    }
    if (!firstname || firstname.length >= 50) {
      errMsg = 'FirstName Character cannot be more than 50';
    }
    /* check if last name is valid */
    if (!lastname || lastname.trim() === '' && typeof (lastname !== 'string')) {
      errMsg = 'Last name is required.';
    }
    if (!lastname || lastname.length >= 50) {
      errMsg = 'lastname Character cannot be more than 50';
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
    if (!phone || phone.length >= 20) {
      errMsg = 'Phone character cannot be more than 20';
    }

    /* Check for password */
    if (!password || password.trim().length < 6 && (typeof password !== 'string')) {
      errMsg = 'Password cannot be less than six characters';
    }
    if (!password || password.length >= 25) {
      errMsg = 'Password Character cannot be more than 25';
    }

    /* check if password is matching  */
    if (!confirmPassword || confirmPassword !== password) {
      errMsg = 'Password does not match';
    }

    /* check for address  */
    if (!address || address.trim() === '' && (typeof address !== 'string')) {
      errMsg = 'Address field cannot be empty';
    }
    if (!address || address.length >= 100) {
      errMsg = 'Adress characters cannot be more than 200';
    }

    /* Check for city */
    if (!city || city.trim() === '' && typeof (city !== 'string')) {
      errMsg = 'City is empty or invalid';
    }
    if (!city || city.length >= 20) {
      errMsg = 'City characters cannot be more than 20';
    }

    /* Check for zipcode */
    if (!zipcode || zipcode.trim() === '' && (typeof (zipcode !== 'string'))) {
      errMsg = 'Zip Code is required';
    }
    if (errMsg) {
      return res.status(400).json({
        message: errMsg,
      });
    }
    next();
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
    if (!emailRegex || email.length >= 50) {
      errMsg = 'Email Characters is too long';
    }

    /* Check for password */
    if (!password || typeof password !== 'string') {
      errMsg = 'Email or password is incorrect';
    }
    if (!password || password.length >= 20) {
      errMsg = 'Password characters cannot be more than 20';
    }
    if (errMsg) {
      return res.status(400).json({
        message: errMsg,
      });
    }
    next();
  }
}

export default Validation;
