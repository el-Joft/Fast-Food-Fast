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
                    <td>${menu.name}</td>
                    <td>${truncate(descpt, 5)}</td>
                    <td>${menu.price}</td>
                    <td>${order.quantity}</td>
                    <td>${user.firstname}</td>
                    <td>${order.totalprice}</td>
                    <td>${order.created_date}</td>
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
              document.getElementById('table-insert-history').innerHTML = output;
            });
            document.getElementById('table-insert-history').innerHTML = output;
          });
      },
    )
    .catch((err) => {
      console.log('Fetch Error :-S', err);
    });
};
getAllOrdersHistory();





// const getAllOrders = () => {
//   fetch(appUrl, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//       token,
//     },
//     credentials: 'same-origin',
//   }).then(
//     (response) => {
//       if (response.status !== 200) {
//         console.log(`Looks like there was a problem. Status Code: ${
//           response.status}`);
//         return;
//       }
//       // Examine the text in the response
//       response.json()
//         .then((data) => {
//           const orderData = data.result;
//           const table = document.getElementById('table-insert');
//           orderData.forEach((element) => {
//             const fetchMenu = fetch(`/api/v1/order/${element.menuid}`, {
//               method: 'GET',
//               headers: {
//                 'Content-Type': 'application/json',
//                 token,
//               },
//               credentials: 'same-origin',
//             }).then(res => res.json());
//             const fetchUser = fetch(`/api/v1/users/${element.orderedby}`, {
//               method: 'GET',
//               headers: {
//                 'Content-Type': 'application/json',
//                 token,
//               },
//               credentials: 'same-origin',
//             }).then(res => res.json());
//             const combinedData = { fetchMenu: {}, fetchUser: {} };
//             Promise.all([fetchMenu, fetchUser]).then((values) => {
//               combinedData.fetchMenu = values[0].result;
//               combinedData.fetchUser = values[1].result;
//               const menu = combinedData.fetchMenu;
//               const user = combinedData.fetchUser;
//               const truncate = (str, words) => str.split(' ').splice(0, words).join(' ');
//               const descpt = menu.description;
//               const output = `
//               <tr>
//                 <td>${menu.name}</td>
//                 <td>${truncate(descpt, 5)}</td>
//                 <td>${menu.price}</td>
//                 <td>${element.quantity}</td>
//                 <td>${user.firstname}</td>
//                 <td>${element.totalprice}</td>
//                 <td>${element.created_date}</td>
//                 <td>
//                     <div class="btn-normal"><a href="edit_food.html">Accept</a></div>
//                     <div class="btn-danger"><a href="">Reject</a></div>
//                     <div class="complete-label">
//                         <label for="complete">Mark as complete</label>
//                         <input type="checkbox" name="complete" id="">
//                     </div>
//                 </td>
//             </tr>
//             `;
//               table.innerHTML = output;
//             });
//           });
//         })
//         .catch((err) => {
//           console.log('Fetch Error :-S', err);
//         });
//     },
//   );
// };
// getAllOrders();

// const getOrders = () => {
//   fetch(appUrl, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//       token,
//     },
//     credentials: 'same-origin',
//   }).then(
//     (response) => {
//       if (response.status !== 200) {
//         console.log(`Looks like there was a problem. Status Code: ${
//           response.status}`);
//         return;
//       }
//       // Examine the text in the response
//       response.json()
//         .then((data) => {
//           const orderData = data.result;
//           const orderHistory = document.getElementById('table-insert-history');
//           orderData.forEach((element) => {
//             const fetchMenu = fetch(`/api/v1/menus/${element.menuid}`, {
//               method: 'GET',
//               headers: {
//                 'Content-Type': 'application/json',
//                 token,
//               },
//               credentials: 'same-origin',
//             }).then(res => res.json());
//             const fetchUser = fetch(`/api/v1/users/${element.orderedby}`, {
//               method: 'GET',
//               headers: {
//                 'Content-Type': 'application/json',
//                 token,
//               },
//               credentials: 'same-origin',
//             }).then(res => res.json());
//             const combinedData = { fetchMenu: {}, fetchUser: {} };
//             Promise.all([fetchMenu, fetchUser]).then((values) => {
//               combinedData.fetchMenu = values[0].result;
//               combinedData.fetchUser = values[1].result;
//               const menu = combinedData.fetchMenu;
//               const user = combinedData.fetchUser;
//               const truncate = (str, words) => str.split(' ').splice(0, words).join(' ');
//               const descpt = menu.description;
//               const allorders = `
//               <tr>
//                   <td>${menu.name}</td>
//                   <td>${truncate(descpt, 5)}</td>
//                   <td>${menu.price}</td>
//                   <td>${element.quantity}</td>
//                   <td>${user.firstname}</td>
//                   <td>${element.totalprice}</td>
//                   <td>${element.created_date}</td>
//                   <td>${element.status}</td>

//               </tr>
//               `;
//               orderHistory.innerHTML = allorders;
//             });
//           });
//         })
//         .catch((err) => {
//           console.log('Fetch Error :-S', err);
//         });
//     },
//   );
// };
// getOrders();
