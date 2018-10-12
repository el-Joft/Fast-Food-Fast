
const app = {};

// Slide Show

app.getCurrentYear = ()=>{   
    const CURRENT_YEAR = (new Date()).getFullYear();
    let year  = document.getElementById("year");
    year.insertAdjacentHTML('afterbegin', CURRENT_YEAR)
}
    app.mobileNavbar =()=>{
    /* Toggle between showing and hiding the navigation menu links when the user clicks on the hamburger menu / bar icon */
        const btns = Array.from(document.getElementsByClassName('js__navbar__toggler'));
        const navBarCollaspe = document.querySelector('.navbar__collapse');

        btns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            if (navBarCollaspe.style.display === 'none') {
            navBarCollaspe.style.display = 'block';
            } else {
            navBarCollaspe.style.display = 'none';
            }
        });
    });
}


