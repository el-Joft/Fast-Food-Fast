class Validation {
  static createOrUpdateOrderValidation(req, res, next) {
    const order = req.body;
    const {
      menuid,
      orderedby,
      quantity,
      // totalPrice,
    } = order;
    const errMsg = [];
    if (!menuid) {
      errMsg.push('Menu Id is required');
    }

    if (!orderedby) {
      errMsg.push('The user making the order is required');
    } else if (isNaN(orderedby)) {
      errMsg.push('Please Enter a Number for the User making an Order');
    }
    if (!quantity) {
      errMsg.push('Quantity of food item is required');
    } else if (quantity < 1) {
      errMsg.push('Quantity must cannot be less than 1');
    } else if (quantity >= 100) {
      errMsg.push('Sorry, You cannot Order more than 99 items');
    } else if (isNaN(quantity)) {
      errMsg.push('Quantity must be a Number, try again');
    }

    if (errMsg.length === 0) {
      // array empty or does not exist
      next();
    } else {
      res.status(400).json({
        message: errMsg,
      });
    }
  }

  static updateOrderStatus(req, res, next) {
    const statusUpdate = req.body;
    const {
      status,
    } = statusUpdate;
    const errMsg = [];
    if (!status) {
      errMsg.push('Please specify a status');
    }
    const orderStatus = status.toLowerCase();
    if (orderStatus.trim() !== 'processing' && orderStatus.trim() !== 'completed' && orderStatus.trim() !== 'cancelled') {
      errMsg.push(' your order status can only be processing, completed or cancelled');
    }
    if (errMsg.length === 0) {
      next();
    } else {
      res.status(400).json({
        message: errMsg,
      });
    }
  }

  static createOrUpdateMenuValidation(req, res, next) {
    const menu = req.body;
    const {
      name,
      description,
      image,
      price,
      categoryid,
      isAvailable,
    } = menu;
    const errMsg = [];


    if (!name || name.trim() === '') {
      errMsg.push('Name of the Menu is required');
    } else if (name.length >= 50) {
      errMsg.push('Name Field cannot be more than 50 characters');
    }

    if (!description || description.trim() === '') {
      errMsg.push('Menu Description is Required');
    } else if (description.length >= 250) {
      errMsg.push('Description Field cannot be more than 250 characters');
    }
    if (!price) {
      errMsg.push('Price is Required');
    } else if (isNaN(price)) {
      errMsg.push('Price must be a Number');
    }

    if (!categoryid) {
      errMsg.push('Specify the Category of the Menu');
    } else if (isNaN(categoryid)) {
      errMsg.push('Category Id is invalid');
    }

    if (errMsg.length === 0) {
      next();
    } else {
      res.status(400).json({
        message: errMsg,
      });
    }
  }

  static createCategoryValidation(req, res, next) {
    const category = req.body;
    const {
      name,
    } = category;
    const errMsg = [];
    if (!name || name.trim() === '' && ((typeof name) !== 'string')) {
      errMsg.push('Category Name is required');
    } else if (name.length >= 50) {
      errMsg.push('Category Name cannot be more than 40 characters');
    }
    if (errMsg.length === 0) {
      next();
    } else {
      res.status(400).json({
        message: errMsg,
      });
    }
  }

  static createUserValidation(req, res, next) {
    const usersDetails = req.body;
    const {
      firstname,
      lastname,
      email,
      phone,
      password,
      address,
      city,
      zipcode,
    } = usersDetails;
    const errMsg = [];

    /* Check for first name */
    if (!firstname || firstname.trim() === '' && ((typeof firstname) !== 'string')) {
      errMsg.push('First name is required.');
    } else if (firstname.length >= 50) {
      errMsg.push('FirstName Character cannot be more than 50');
    }
    /* check if last name is valid */
    if (!lastname || lastname.trim() === '' && typeof (lastname !== 'string')) {
      errMsg.push('Last name is required.');
    } else if (lastname.length >= 50) {
      errMsg.push('lastname Character cannot be more than 50');
    }
    /* Validate email */
    /* regular expression for testing email address */
    let emailRegex = /[^\s]*@[a-z0-9.-]*/i;
    /* test email address */
    emailRegex = emailRegex.test(String(email).toLowerCase());
    if (!email) {
      errMsg.push('Email is required');
    } else if (!emailRegex) {
      errMsg.push('Invalid Email Address');
    }

    /* Check for phone number  */
    if (!phone || phone.trim() === '' && (typeof phone !== 'string')) {
      errMsg.push('Phone cannot be empty');
    } else if (phone.length >= 20) {
      errMsg.push('Phone character cannot be more than 20');
    }

    /* Check for password */
    if (!password || password.trim().length < 6 && (typeof password !== 'string')) {
      errMsg.push('Password cannot be less than six characters');
    } else if (password.length >= 25) {
      errMsg.push('Password Character cannot be more than 25');
    }

    // /* check if password is matching  */
    // if (!confirmPassword || confirmPassword !== password) {
    //   errMsg = 'Password does not match';
    // }

    /* check for address  */
    if (!address || address.trim() === '' && (typeof address !== 'string')) {
      errMsg.push('Address field cannot be empty');
    } else if (address.length >= 100) {
      errMsg.push('Adress characters cannot be more than 200');
    }

    /* Check for city */
    if (!city || city.trim() === '' && typeof (city !== 'string')) {
      errMsg.push('City is empty');
    } else if (city.length >= 20) {
      errMsg.push('City characters cannot be more than 20');
    }

    /* Check for zipCode */
    if (!zipcode || zipcode.trim() === '' && (typeof (zipcode !== 'string'))) {
      errMsg.push('Zip Code is required');
    }
    if (errMsg.length === 0) {
      next();
    } else {
      res.status(400).json({
        message: errMsg,
      });
    }
  }

  static loginUserValidation(req, res, next) {
    const { email, password } = req.body;
    const errMsg = [];

    /* regular expression for testing email address */
    let emailRegex = /[^\s]*@[a-z0-9.-]*/i;
    /* test email address */
    emailRegex = emailRegex.test(String(email).toLowerCase());
    if (!emailRegex) {
      errMsg.push('Email or password is Incorrect');
    } else if (email.length >= 50) {
      errMsg.push('Email Characters is too long');
    }

    /* Check for password */
    if (!password || typeof password !== 'string') {
      errMsg.push('Email or password is incorrect');
    } else if (password.length >= 20) {
      errMsg.push('Password characters cannot be more than 20');
    }
    if (errMsg.length === 0) {
      next();
    } else {
      res.status(400).json({
        message: errMsg,
      });
    }
  }
}

export default Validation;
