const token = localStorage.getItem('token');

const getAllOrdersIn = () => {
  let orderData;
  fetch('/api/v1/orders', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      token,
    },
    credentials: 'same-origin',
  })
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
            let output = '';
            orderData = data.result;
            // const truncate = (str, words) => str.split(' ').splice(0, words).join(' ');
            // console.log(truncate('The quick brown fox jumps over the lazy dog', 4));
            orderData.forEach((order) => {
              // const descpt = order.description;
              // descpt.substring(0, 100 - ending.length);
              const fetchMenu = fetch(`/api/v1/menus/${order.menuid}`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  token,
                },
                credentials: 'same-origin',
              }).then(res => res.json());
              const fetchUser = fetch(`/api/v1/users/${order.orderedby}`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  token,
                },
                credentials: 'same-origin',
              }).then(res => res.json());
              const combinedData = { fetchMenu: {}, fetchUser: {} };
              Promise.all([fetchMenu, fetchUser]).then((values) => {
                combinedData.fetchMenu = values[0].result;
                combinedData.fetchUser = values[1].result;
                const menu = combinedData.fetchMenu;
                const user = combinedData.fetchUser;
                const truncate = (str, words) => str.split(' ').splice(0, words).join(' ');
                const descpt = menu.description;

                output += `
                  <tr>
                    <td><div class="menu_links" onclick='fetchOrders(${order.id});'>${menu.name}</div></td>
                    <td>${truncate(descpt, 5)}</td>
                    <td>${menu.price}</td>
                    <td>${order.quantity}</td>
                    <td>${user.firstname}</td>
                    <td>${order.totalprice}</td>
                    <td>${order.created_date}</td>
                    <td>
                    
                        <form class="form-group" id="form">
                          <input type="hidden" name="orderId" value="${order.id}" />
                          <div class="custom-select" style="">
                            <select class="select" name="status">
                              <option value="0">Select Status:</option>
                              <option value="Processing">Processing</option>
                              <option value="Cancelled">Cancelled</option>
                              <option value="Completed">Completed</option>
                            </select>
                          </div>
                          <input type="button" class="btn-normal" name="submit" value="Update status" onclick="showElements(this.form);">
                          </form>
                       
                        <div class="btn-danger"><a href="">Delete</a></div>
                        
                    </td>
                </tr>
                `;
                document.getElementById('table-insert').innerHTML = output;
              });
              // document.getElementById('table-insert').innerHTML = output;
            });
            // document.getElementById('table-insert').innerHTML = output;
          });
      },
    )
    .catch((err) => {
      console.log('Fetch Error :-S', err);
    });
};
getAllOrdersIn();

const getAllOrdersHistory = () => {
  let orderData;
  fetch('/api/v1/orders', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      token,
    },
    credentials: 'same-origin',
  })
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
            let output = '';
            orderData = data.result;
            orderData.forEach((order) => {
              // const descpt = order.description;
              // descpt.substring(0, 100 - ending.length);
              const fetchMenu = fetch(`/api/v1/menus/${order.menuid}`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  token,
                },
                credentials: 'same-origin',
              }).then(res => res.json());
              const fetchUser = fetch(`/api/v1/users/${order.orderedby}`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  token,
                },
                credentials: 'same-origin',
              }).then(res => res.json());
              const combinedData = { fetchMenu: {}, fetchUser: {} };
              Promise.all([fetchMenu, fetchUser]).then((values) => {
                combinedData.fetchMenu = values[0].result;
                combinedData.fetchUser = values[1].result;
                const menu = combinedData.fetchMenu;
                const user = combinedData.fetchUser;
                const truncate = (str, words) => str.split(' ').splice(0, words).join(' ');
                const descpt = menu.description;

                output += `
                <tr>
                    <td>${menu.name}</td>
                    <td>${truncate(descpt, 5)}</td>
                    <td>${menu.price}</td>
                    <td>${order.quantity}</td>
                    <td>${user.firstname}</td>
                    <td>${order.totalprice}</td>
                    <td>${order.created_date}</td>
                    <td>${order.status}</td>
                </tr>`;
                document.getElementById('table-insert-history').innerHTML = output;
              });
            });
          });
      },
    )
    .catch((err) => {
      console.log('Fetch Error :-S', err);
    });
};
getAllOrdersHistory();


const showElements = (oForm) => {
  const values = oForm.elements.status;
  const orderid = oForm.elements.orderId;
  const id = orderid.value;
  const value = values.value;
  if (values.value === '0') {
    return alert('please select a status');
  }
  const formData = {
    status: value,
  };
  const formdata = JSON.stringify(formData);
  fetch(`/api/v1/orders/${id}`, {
    method: 'PUT',
    body: formdata,
    headers: {
      'Content-Type': 'application/json',
      token,
    },
    credentials: 'same-origin',
  }).then((response) => {
    response.json().then((data) => {
      if (response.status !== 200) {
        alert(data.message);
        // messageHTML.classList.add('message-failure');
        // messageHTML.classList.remove('message-success');
        // messageHTML.innerHTML = data.message;
        return null;
      }
      // localStorage.setItem('token', data.token);
      // messageBox.classList.add('message-success');
      // messageBox.classList.remove('message-failure');
      // messageBox.innerHTML = 'Account created successfully';
      // messageBox.classList.remove('hide');
      window.setTimeout(() => { window.location.href = '/admin/order_history.html'; }, 1000);
      return null;
    });
  })
    .catch((err) => {
      console.log(err.stack);
    });
  return null;
  // let str = `Form Elements of form ${oForm.name}: \n`;
  // for (i = 0; i < oForm.length; i++) { str += `${oForm.elements[i].name}\n`; }
  // alert(str);
};


const fetchOrders = (id) => {
  window.location.replace(`/admin/single_order.html?id=${id}`);
};
