const appUrl = '/api/v1/orders';
const token = localStorage.getItem('token');

const getAllOrders = () => {
  fetch(appUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      token,
    },
    credentials: 'same-origin',
  }).then(
    (response) => {
      if (response.status !== 200) {
        console.log(`Looks like there was a problem. Status Code: ${
          response.status}`);
        return;
      }
      // Examine the text in the response
      response.json()
        .then((data) => {
          const orderData = data.result;
          const table = document.getElementById('table-insert');
          orderData.forEach((element) => {
            const fetchMenu = fetch(`/api/v1/menus/${element.menuid}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                token,
              },
              credentials: 'same-origin',
            }).then(res => res.json());
            const fetchUser = fetch(`/api/v1/users/${element.orderedby}`, {
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
              const output = `
              <tr>
                <td>${menu.name}</td>
                <td>${truncate(descpt, 5)}</td>
                <td>${menu.price}</td>
                <td>${element.quantity}</td>
                <td>${user.firstname}</td>
                <td>${element.totalprice}</td>
                <td>${element.created_date}</td>
                <td>
                    <div class="btn-normal"><a href="edit_food.html">Accept</a></div>
                    <div class="btn-danger"><a href="">Reject</a></div>
                    <div class="complete-label">
                        <label for="complete">Mark as complete</label>
                        <input type="checkbox" name="complete" id="">
                    </div>
                </td>
            </tr>
            `;
              table.innerHTML = output;
            });
          });
        })
        .catch((err) => {
          console.log('Fetch Error :-S', err);
        });
    },
  );
};
getAllOrders();





const getOrders = () => {
  fetch(appUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      token,
    },
    credentials: 'same-origin',
  }).then(
    (response) => {
      if (response.status !== 200) {
        console.log(`Looks like there was a problem. Status Code: ${
          response.status}`);
        return;
      }
      // Examine the text in the response
      response.json()
        .then((data) => {
          const orderData = data.result;
          const orderHistory = document.getElementById('table-insert-history');
          orderData.forEach((element) => {
            const fetchMenu = fetch(`/api/v1/menus/${element.menuid}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                token,
              },
              credentials: 'same-origin',
            }).then(res => res.json());
            const fetchUser = fetch(`/api/v1/users/${element.orderedby}`, {
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
              const allorders = `
              <tr>
                  <td>${menu.name}</td>
                  <td>${truncate(descpt, 5)}</td>
                  <td>${menu.price}</td>
                  <td>${element.quantity}</td>
                  <td>${user.firstname}</td>
                  <td>${element.totalprice}</td>
                  <td>${element.created_date}</td>
                  <td>${element.status}</td>
                  
              </tr>
              `;
              orderHistory.innerHTML = allorders;
            });
          });
        })
        .catch((err) => {
          console.log('Fetch Error :-S', err);
        });
    },
  );
};
getOrders();
