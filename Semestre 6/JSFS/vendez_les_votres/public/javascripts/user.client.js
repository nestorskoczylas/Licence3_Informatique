let userloginInput;
let usermoney;

const setup = () => {
  userloginInput = document.getElementById('userlogin');
  getUser();
  document.getElementById('update').addEventListener('click', update);
  document.getElementById('logout').addEventListener('click', logout);
}
window.addEventListener('DOMContentLoaded', setup);



const getUser = async () => {
  const requestOptions = {
                           method :'GET',
                         };
  const response = await fetch('/user/me', requestOptions);
  if (response.ok) {
    const user = await response.json();
    userloginInput.value = user.login || '';
  }
  else {
    const error = await response.json();
    handleError(error);
  }
}

// appelée par le bouton update dans user.pug
const update =  async () => {
  const userData = { login : userloginInput.value };
  const body = JSON.stringify(userData);
  const requestOptions = {
                         method :'PUT',
                         headers : { "Content-Type": "application/json" },
                         body : body
                       };
  const response = await fetch('/user/me', requestOptions);
  if (response.ok) {
    const updatedUser = await response.json();
    console.log(`user updated : ${JSON.stringify(updatedUser)}`);
  }
  else {
    const error = await response.json();
    handleError(error);
  }
}

const logout = async () => {
  const response = await fetch(`/access/logout`, { method :'GET' });
  if (response.ok) {
    window.location.href= '/user';
  }
}

const handleError = error => {
  if (error.redirectTo)
    window.location.href= error.redirectTo;
  else
    console.log(`erreur : ${error.message}`);
}
