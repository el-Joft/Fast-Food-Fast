const token = localStorage.getItem('token');

const decodeToken = () => {
  const playload = JSON.parse(atob(token.split('.')[1]));
  return playload;
};

const userOrder = () => {
  let orderResult;
  const userDetails = decodeToken();
  const userid = userDetails.id;
  fetch(`/api/v1/users/${userid}/orders`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      token,
    },
    credentials: 'same-origin',
  }).then((response) => {
    if (response.status !== 200) {
      console.log(`Looks like there was a problem. Status Code: ${
        response.status}`);
      return;
    }
    response.json()
      .then((data) => {
        orderResult = data.result;
        let output = '';
        orderResult.forEach((element) => {
          const fetchMenu = fetch(`/api/v1/menus/${element.menuid}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              token,
            },
            credentials: 'same-origin',
          }).then(res => res.json());
          const combinedData = { fetchMenu: {} };
          Promise.all([fetchMenu]).then((values) => {
            combinedData.fetchMenu = values[0].result;
            const menu = combinedData.fetchMenu;
            const truncate = (str, words) => str.split(' ').splice(0, words).join(' ');
            const descpt = menu.description;
            output += `
            <tr>
                <td>${menu.name}</td>
                <td>${truncate(descpt, 5)}</td>
                <td>${menu.price}</td>
                <td>${element.quantity}</td>
                <td>${element.totalprice}</td>
                <td>${element.created_date}</td>
                <td>${element.status}</td>
            </tr>`;
            document.getElementById('history-body').innerHTML = output;
          });
        });
      });
  });
};

userOrder();
