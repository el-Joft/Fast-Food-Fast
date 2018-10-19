const getLocalData = name => localStorage.getItem(name);
const setLocalData = (name, value) => {
  if (value != null) { localStorage.setItem(name, value); } else { localStorage.removeItem(name); }
};


let cartObj = null; // global pointer to cart
let cartCI = 0;
const cart = document.getElementById('cartSystem');
let counter = localStorage.getItem('cart_counter');
cart.innerHTML = counter;
let menus;

const addToCart = () => {
  cartObj = [];
  cartCI = 0;
  // Check in browser memory if there are a saved cart
  if (getLocalData('cart') != null) {
    // if previoys cart is present load it
    cartCI = getLocalData('cart_counter');
    cartObj = JSON.parse(getLocalData('cart'));
    console.log(cartObj);
  } else {
    console.log('Cart is empty!');
  }
};


const addMenu = (id) => {
  // const counter = localStorage.getItem('cart_counter');
  cart.innerHTML = counter++;
  fetch(`/api/v1/menus/${id}`, { mode: 'cors' })
    .then(
      (response) => {
        if (response.status !== 200) {
          console.log(`Looks like there was a problem. Status Code: ${
            response.status}`);
          return;
        }

        // Examine the text in the response
        response.json()
          .then((data) => {
            const menu = data.result;
            cartObj[cartCI++] = menu;
          });
      },
    )
    .catch((err) => {
      console.log(err);
    });
  // add new item to cart
  // save cart in localStorage
  setLocalData('cart', JSON.stringify(cartObj));
  setLocalData('cart_counter', cartCI);
};

const getTotal = (price, count) => {
  const quantity = document.getElementById(`quantity${count}`).value;
  const subTotal = document.getElementById(`subTotal${count}`);
  const addSubtotal = document.getElementById('addSubtotal');
  const totalCost = document.getElementById('totalCost');
  const total = quantity * price;
  subTotal.innerHTML = total;

  const elements = document.getElementsByClassName('subTotal');
  const eachQuantity = [];
  for (let i = 0, length = elements.length; i < length; i++) {
    const ans = parseFloat((elements[i].innerHTML));
    eachQuantity[i] = ans;
  }

  const add = (a, b) => a + b;
  // use reduce to sum our array
  const sum = eachQuantity.reduce(add);
  if (isNaN(sum)) {
    addSubtotal.innerHTML = total;
  } else {
    addSubtotal.innerHTML = sum;
    const addSub = parseInt(addSubtotal.innerHTML, 10);
    const allTotal = addSub + 500;
    totalCost.innerHTML = allTotal;
  }
  return total;
};

const decodeToken = (token) => {
  const playload = JSON.parse(atob(token.split('.')[1]));
  return playload;
};

const getUser = () => {
  const token = localStorage.getItem('token');
  const tokenUser = decodeToken(token);
  return tokenUser.id;
};
getUser();


const getMenuCart = () => {
  const data = getLocalData('cart');
  const result = JSON.parse(data);
  let output = '';
  const menuID = [];


  if (result === null || result.length < 1) {
    output += '<h2> Kindly Make an Order by clicking the Add to cart button on the Menu Page</h2>';
    document.getElementById('checkout').innerHTML = output;
  } else if (result.length === 1) {
    result.forEach((element) => {
      let count = 1;
      output += `
      <div class="checkout-header">
      <div class="checkout-item top-header">
          
          <h3>Item</h3>
          <p>${element.name}, ${element.description}</p>
      </div>
      <div class="top-header checkout-quantity">
          <h3>Quantity</h3>
          <input type="number" id="quantity${count}" onkeyup="getTotal(${element.price}, ${count})" class="checkout-input"/>
      </div>
      <div class="top-header checkout-price">
          <h3>Price</h3>
          <p><strike>N</strike>${element.price}</p>
      </div>
      <div class="top-header checkout-subtotal">
          <h3>Sub-Total</h3>
          <p class="subTotal" id="subTotal${count}"></p>
      </div>
  </div>
        `;
      menuID.push(element.id);
      count += 1;
      document.getElementById('checkout').innerHTML = output;
    });
  } else {
    let count = 1;
    for (const key in result) {
      if (result.hasOwnProperty(key)) {
        const element = result[key];

        output += `
      <div class="checkout-header">
      <div class="checkout-item top-header">
          
          <h3>Item</h3>
          <p>${element.name}, ${element.description}</p>
      </div>
      <div class="top-header checkout-quantity">
          <h3>Quantity</h3>
          <input type="number" id="quantity${count}" onkeyup="getTotal(${element.price}, ${count})" class="checkout-input"/>
      </div>
      <div class="top-header checkout-price">
          <h3>Price</h3>
          <p><strike>N</strike>${element.price}</p>
      </div>
      <div class="top-header checkout-subtotal">
          <h3>Sub-Total</h3>
          <p class="subTotal" id="subTotal${count}"></p>
      </div>
  </div>
        `;
        document.getElementById('checkout').innerHTML = output;
        count += 1;
        menuID.push(element.id);
      }
    }
  }
  menus = menuID;
};


const makeOrder = () => {
  const menuId = document.getElementById('menuId').value;
  const token = localStorage.getItem('token');

  if (menuId.length === 1) {
    const quantity = document.getElementById('quantity').value;
    if (!quantity) {
      alert('specify quantity joor');
      return console.log('please specify the quanity');
    }
    const userid = getUser();
    const formData = {
      menuid: menuId,
      quantity,
      orderedby: userid,
    };
    const formdata = JSON.stringify(formData);
    fetch('api/v1/orders', {
      method: 'POST',
      body: formdata,
      headers: {
        'Content-Type': 'application/json',
        token,
      },
      credentials: 'same-origin',
    }).then((response) => {
      response.json().then((data) => {
        if (response.status !== 201) {
          messageHTML.classList.add('message-failure');
          messageHTML.classList.remove('message-success');
          messageHTML.innerHTML = data.message;
          return null;
        }
        cancelOrder();
        window.setTimeout(() => { window.location.href = '/success.html'; }, 1000);
        return null;
      });
    })
      .catch((err) => {
        console.log(err);
      });
    return null;
  }
  const data = getLocalData('cart');
  const result = JSON.parse(data);

  if (result === null || result.length < 1) {
    console.log('sorry add some items to the cart');
  } else if (result.length === 1) {
    const userid = getUser();
    let quantity;
    let menuid;
    result.forEach((element) => {
      menuid = element.id;
    });

    const formData = {
      menuid,
      quantity,
      orderedby: userid,
    };
    const formdata = JSON.stringify(formData);
    fetch('api/v1/orders', {
      method: 'POST',
      body: formdata,
      headers: {
        'Content-Type': 'application/json',
        token,
      },
      credentials: 'same-origin',
    }).then((response) => {
      response.json().then((data) => {
        if (response.status !== 201) {
          messageHTML.classList.add('message-failure');
          messageHTML.classList.remove('message-success');
          messageHTML.innerHTML = data.message;
          return null;
        }
        cancelOrder();
        window.setTimeout(() => { window.location.href = '/success.html'; }, 1000);
        return null;
      });
    })
      .catch((err) => {
        console.log(err);
      });
  } else {
    for (const key in result) {
      if (result.hasOwnProperty(key)) {
        const element = result[key];
      }
    }
  }
};


const cancelOrder = () => {
  localStorage.removeItem('cart');
  localStorage.removeItem('cart_counter');
};
