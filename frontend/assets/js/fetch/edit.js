const token = localStorage.getItem('token');

// REFERENCE
// https://stackoverflow.com/questions/979975/how-to-get-the-value-from-the-get-parameters
const urlString = window.location.href;
const url = new URL(urlString);
const id = url.searchParams.get('id');

const getFormData = (form) => {
  const inputs = form.getElementsByTagName('input');
  const textarea = document.getElementById('description');
  const formData = {};
  for (let i = 0; i < inputs.length;
    (i += 1)) {
    formData[inputs[i].name] = inputs[i].value;
  }
  const textValue = textarea.value;
  formData.description = textValue;
  return formData;
};


const editMenu = () => {
  fetch(`/api/v1/menus/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      token,
    },
    credentials: 'same-origin',
  }).then((response) => {
    response.json().then((data) => {
      const messageHTML = document.getElementById('message');
      if (response.status !== 200) {
        messageHTML.classList.add('message-failure');
        messageHTML.classList.remove('message-success');
        messageHTML.innerHTML = data.message;
        return null;
      }
      const menuData = data.result;
      const output = `
      <li>
          <label>Product Name <span class="required">*</span></label>
          <input type="text" name="name" value="${menuData.name}" class="form-control field-long" required />
      </li>
      <li>
          <label>Description<span class="required">*</span></label>
          <textarea name="description" id="description" rows="3" required="required" class="field-long field-textarea">${menuData.description}</textarea>
      </li>
      <li>
          <label>Product Image <span class="required">*</span></label>
          <input type="file" value="${menuData.image}" name="image" class="form-control field-long" />
      </li>
      <li>
          <label>Product Price <span class="required">*</span></label>
          <input type="text" value="${menuData.price}" name="price" class="form-control field-long" required />
      </li>
      <li>
        <label>Product Category<span class="required">*</span></label>
        <input type="number" value="1" name="categoryid" class="form-control field-long" disabled/>
      </li>
      <li>
          <label>Is Available <span class="required">*</span></label>
          <input type="checkbox" value="true" name="isAvailable" class="form-control field-long" required />
      </li>
       
      <li>
        <input type="submit" value="Submit" />
      </li>
      `;
      document.getElementById('editForm').innerHTML = output;
    });
  });


  const form = document.getElementsByTagName('form')[0];
  const messageHTML = document.getElementById('message');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = getFormData(form);
    const formdata = JSON.stringify(formData);
    fetch(`/api/v1/menus/${id}`, {
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
          messageHTML.classList.add('message-failure');
          messageHTML.classList.remove('message-success');
          messageHTML.innerHTML = data.message;
          return null;
        }

        window.setTimeout(() => { window.location.href = '/admin/index.html'; }, 1000);
        return null;
      });
    })
      .catch((err) => {
        console.log(err);
      });
    return null;
  });
};
editMenu();
