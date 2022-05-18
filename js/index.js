import {BASE_URL, AUTH_URL} from './constants.js';
import {helloworld, getTokenPayload} from './tokenUtil.js';

//Referencias
const inputCedula = document.getElementById('inputCedula');
const inputContrasena = document.getElementById('inputContrasena');
const loginButton = document.getElementById('loginButton');
const badLogin = document.getElementById('badLogin');

console.log(BASE_URL);

helloworld();


badLogin.style.visibility = 'hidden';

const goToHome = ()=>{
    //window.location.href = 'home.html';
}



const login = ()=>{
    let userObj = {
        username: inputCedula.value,
        password: inputContrasena.value
    };
    //POST
    let xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', ()=>{
        if(xhr.readyState == 4 && xhr.status == 200){
            console.log(xhr.responseText);
            goToHome();
        } else if (xhr.readyState == 4){
            badLogin.style.visibility = 'visible';
        }
    });
    xhr.open('POST', AUTH_URL);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(userObj));
}

loginButton.addEventListener('click', login);