const token = localStorage.getItem('token');

// REFERENCE
// https://stackoverflow.com/questions/979975/how-to-get-the-value-from-the-get-parameters
const urlString = window.location.href;
const url = new URL(urlString);
const id = url.searchParams.get('id');


const getAllOrdersIn = () => {
  let orderData;
  fetch(`/api/v1/orders/${id}`, {
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
            // const descpt = order.description;
            // descpt.substring(0, 100 - ending.length);
            const fetchMenu = fetch(`/api/v1/menus/${orderData.menuid}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                token,
              },
              credentials: 'same-origin',
            }).then(res => res.json());
            const fetchUser = fetch(`/api/v1/users/${orderData.orderedby}`, {
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
                  <td>${orderData.quantity}</td>
                  <td>${user.firstname}</td>
                  <td>${orderData.totalprice}</td>
                  <td>${orderData.created_date}</td>
                  <td>${orderData.status}</td>
              </tr>`;
              document.getElementById('specific_order').innerHTML = output;
            });
          });
      },
    )
    .catch((err) => {
      console.log('Fetch Error :-S', err);
    });
};
getAllOrdersIn();
