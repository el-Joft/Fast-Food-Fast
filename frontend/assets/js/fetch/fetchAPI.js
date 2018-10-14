
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
              menuData = data.result;
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
              document.getElementById('menu-body').innerHTML = output;
            });
        },
      )
      .catch((err) => {
        console.log('Fetch Error :-S', err);
      });
  }
}
fetchAPI.getAllMenus();
