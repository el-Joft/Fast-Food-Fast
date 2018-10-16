const appUrl = '/api/v1/auth/login';


const getFormData = (form) => {
  const inputs = form.getElementsByTagName('input');

  const formData = {};
  for (let i = 0; i < inputs.length;
    (i += 1)) {
    formData[inputs[i].name] = inputs[i].value;
  }
  return formData;
};

const decodeToken = (token) => {
  const playload = JSON.parse(atob(token.split('.')[1]));
  return playload;
};

const login = () => {
  const form = document.getElementsByTagName('form')[0];
  const messageHTML = document.getElementById('message');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = getFormData(form);
    const formdata = JSON.stringify(formData);
    // loginBtn.disabled = true;
    // loginBtn.innerHTML = '..Signing in..';
    fetch(appUrl, {
      method: 'POST',
      body: formdata,
      headers: { 'Content-Type': 'application/json' },
    }).then((response) => {
      response.json().then((message) => {
        if (response.status !== 200) {
          messageHTML.classList.add('message-failure');
          messageHTML.classList.remove('message-success');
          messageHTML.innerHTML = message.message;
        } else {
          localStorage.setItem('token', message.token);
          const tokenRole = decodeToken(message.token);
          window.setTimeout(() => {
            if (tokenRole.role === 1) {
              window.location.href = '/admin/index.html';
            } else {
              window.location.href = '/user-dashboard.html';
            }
          }, 1000);
        }
      });
    })
      .catch((err) => {
        console.log(err);
      });
    return null;
  });
};
login();
