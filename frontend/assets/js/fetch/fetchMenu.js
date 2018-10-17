// REFERENCES
// https://stackoverflow.com/questions/19210665/getelementsbyclassname-is-not-working
const editMenu = (id) => {
  // const button = document.getElementById('shitt');
  const elements = document.getElementsByClassName('menu_links');
  for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener('click', (e) => {
      e.preventDefault();
      window.location.replace(`/admin/edit_food.html?id=${id}`);
    }, false);
  }

  // button.addEventListener('click', (e) => {
  //   e.preventDefault();
  //   // window.location.href = '/admin/edit_food.html';
  //   window.location.replace(`/admin/edit_food.html?id=${menus.id}`);
  // });
};
class fetchAPI {
  static getAllMenus() {
    let menuData;
    fetch('http://localhost:3000/api/v1/menus', { mode: 'cors' })
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
              const adminMenu = '';
              menuData = data.result;
              const truncate = (str, words) => str.split(' ').splice(0, words).join(' ');
              let counter = 0;
              // console.log(truncate('The quick brown fox jumps over the lazy dog', 4));
              menuData.forEach((menus) => {
                const descpt = menus.description;
                // descpt.substring(0, 100 - ending.length);
                output += `
                <div class="menu-section">
                    <div class="menu-food">
                        <h3>${menus.name}</h3>
                        <p>${truncate(descpt, 15)}</p>
                    </div>
                    <div class="menu-price">
                        <p><strike>N</strike>${menus.price}</p>
                        <a href="checkout.html"> <span class="menu-order">Make Order</span></a>
                    </div>
                    
                </div>`;
                counter += 1;
                if (counter >= 6) {
                  return false;
                }
              });
              document.getElementById('menu-body').innerHTML = output;
            });
        },
      )
      .catch((err) => {
        console.log('Fetch Error :-S', err);
      });
  }


  static getCategory() {
    fetch('http://localhost:3000/api/v1/menus', { mode: 'cors' })
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
              const menuData = data.result;
              const truncate = (str, words) => str.split(' ').splice(0, words).join(' ');

              // console.log(truncate('The quick brown fox jumps over the lazy dog', 4));
              menuData.forEach((menus) => {
                const descpt = menus.description;
                // descpt.substring(0, 100 - ending.length);
                output += `
              <div class="menu-section">
                  <div class="menu-food">
                      <h3>${menus.name}</h3>
                      <p>${truncate(descpt, 15)}</p>
                  </div>
                  <div class="menu-price">
                      <p><strike>N</strike>${menus.price}</p>
                      <a href="checkout.html"> <span class="menu-order">Make Order</span></a>
                  </div>
                  
              </div>`;
              });
              document.getElementById('menu-body-all').innerHTML = output;
            });
        },
      )
      .catch((err) => {
        console.log('Fetch Error :-S', err);
      });
  }

  static getMenus() {
    let menuData;
    fetch('http://localhost:3000/api/v1/menus', { mode: 'cors' })
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
              menuData = data.result;
              let adminMenu = '';
              const truncate = (str, words) => str.split(' ').splice(0, words).join(' ');
              // console.log(truncate('The quick brown fox jumps over the lazy dog', 4));
              menuData.forEach((menus) => {
                const descpt = menus.description;
                adminMenu += `
                <tr>
                <td>${menus.name}</td>
                <td>${truncate(descpt, 15)}</td>
                <td><strike>N</strike>${menus.price}</td>
                
                <td>
                    <div class="menu_links btn-normal" onclick='editMenu(${menus.id})'>Edit</div>
                    <div class="btn-danger"><a href="">Delete</a></div>
                   
                    
                </td>
            </tr>
                `;
                document.getElementById('menu-table').innerHTML = adminMenu;
              });
            })
            .catch((err) => {
              console.log('Fetch Error :-S', err);
            });
        },
      );
  }
}
fetchAPI.getAllMenus();
fetchAPI.getCategory();
fetchAPI.getMenus();
