const appUrl = '/api/v1/auth/signup';


const getFormData = (form) => {
  const inputs = form.getElementsByTagName('input');
  const textarea = document.getElementById('address');
  const formData = {};
  for (let i = 0; i < inputs.length;
    (i += 1)) {
    formData[inputs[i].name] = inputs[i].value;
  }
  const textValue = textarea.value;
  formData.address = textValue;
  return formData;
};

const signup = () => {
  const form = document.getElementsByTagName('form')[0];
  const messageHTML = document.getElementById('message');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = getFormData(form);
    const formdata = JSON.stringify(formData);
    const { password, confirmPassword } = formData;
    if (password !== confirmPassword) {
      messageHTML.classList.add('message-failure');
      messageHTML.classList.remove('message-success');
      messageHTML.innerHTML = 'Password and Confirm password fields are not the same';
      return null;
    }
    fetch(appUrl, {
      method: 'POST',
      body: formdata,
      headers: { 'Content-Type': 'application/json' },
    }).then((response) => {
      response.json().then((data) => {
        if (response.status !== 201) {
          messageHTML.classList.add('message-failure');
          messageHTML.classList.remove('message-success');
          messageHTML.innerHTML = data.message;
          return null;
        }
        localStorage.setItem('token', message.token);
        console.log('====================================');
        console.log(message.token);
        console.log('====================================');
        // messageBox.classList.add('message-success');
        // messageBox.classList.remove('message-failure');
        // messageBox.innerHTML = 'Account created successfully';
        // messageBox.classList.remove('hide');
        window.setTimeout(() => { window.location.href = '/user-dashboard.html'; }, 1000);
        return null;
      });
    })
      .catch((err) => {
        console.log(err);
      });
    return null;
  });
};

signup();
