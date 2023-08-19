const emailTnput = document.getElementById("loginEmail");
const passwordInput = document.getElementById("loginPassword");
const passToggleBtn = document.getElementById("pass-toggle-btn");
const form = document.querySelector(".form");
const loader = document.querySelector(".loader");
// Toggling password visibility
passToggleBtn.addEventListener('click', () => {
    passToggleBtn.className = passwordInput.type === "password" ? "fa-solid fa-eye-slash" : "fa-solid fa-eye";
    passwordInput.type = passwordInput.type === "password" ? "text" : "password";
});

const showError = (field, errorText) => {
    field.classList.add("error");
    const errorElement = document.createElement("small");
    errorElement.classList.add("error-text");
    errorElement.innerText = errorText;
    field.closest(".form-group").appendChild(errorElement);
}


import { app, auth, signInWithEmailAndPassword, onAuthStateChanged } from "./fireBase.js"


let loginBtn = document.querySelector(".login")
let checkInputCheckBox = document.getElementById("checkbox");
checkInputCheckBox.addEventListener("change", ()=>{
    if(checkInputCheckBox.checked){
        loginBtn.disabled = false;
        loginBtn.classList.remove("disable");
    }
    else{
        loginBtn.disabled = true;
        loginBtn.classList.add("disable");
    }
})

loginBtn.addEventListener("click", ()=>{
    if(emailTnput.value == "".trim() && passwordInput.value == "".trim()){
        showError(emailTnput, "Enter a Email")
        showError(passwordInput, "Enter a Password")
    }
    else{
        loader.style.display = "block";
        signInWithEmailAndPassword(auth, emailTnput.value, passwordInput.value)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user)
          if (location.pathname == "/login/index.html") {
              location.href = "../dashboard/dashboard.html"
            }
        })
        .catch((error) => {
            loader.style.display = "none";
          const errorCode = error.code;
          swal ( "Oops" ,  errorCode ,  "error" );
        })
    }
});
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log(user)
        const uid = user.uid;
       if(location.pathname == '/login/index.html'){
            location.href = "../dashboard/dashboard.html"
        }
    } else {
//console.log("...")
    }})