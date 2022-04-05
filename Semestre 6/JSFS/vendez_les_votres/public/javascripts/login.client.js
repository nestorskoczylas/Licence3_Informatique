let userlogin;
let userpassword;

const setup = () => {
  userlogin = document.getElementById('userlogin');
  userpassword = document.getElementById('userpassword');
  document.getElementById('login').addEventListener('click', login);
}
window.addEventListener('DOMContentLoaded', setup);

const login = async () => {
  const userData = { login : userlogin.value, password : userpassword.value};
  const body = JSON.stringify(userData);
  const requestOptions = {
                         method :'POST',
                         headers : { "Content-Type": "application/json" },
                         body : body
                       };
  const response = await fetch(`/access/login`, requestOptions);
  if (response.ok) {
    const loggedUser = await response.json();
    window.location.href = '/user';
  }
  else {
    const error = await response.json();
    document.getElementById('problem').textContent = `erreur : ${error.message}`;
  }
}
