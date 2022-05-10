//Referencias
const inputCedula = document.getElementById('inputCedula');
const inputContrasena = document.getElementById('inputContrasena');
const loginButton = document.getElementById('loginButton');
const badLogin = document.getElementById('badLogin');
const BASE_URL = "http://6.tcp.ngrok.io:16584/lunchticket";
const AUTH_URL = "https://pi2sis.icesi.edu.co/saamfiapi/public/institutions/1/systems/4/users/login";

badLogin.style.visibility = 'hidden';

goToHome = ()=>{
    window.location.href = 'home.html';
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
        //verificamos si el inicio de sesión fue válido,
        //de ser así, pasamos a la página de home,
        //por el contrario, mostramos el mensaje de credenciales invalidas
    });
    xhr.open('POST', AUTH_URL);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(userObj));
}

loginButton.addEventListener('click', login);