// Selecting form and input elements
const form = document.querySelector(".form");
const passwordInput = document.getElementById("password");
const passToggleBtn = document.getElementById("pass-toggle-btn");
const loader = document.querySelector(".loader");
// Function to display error messages
const showError = (field, errorText) => {
    field.classList.add("error");
    const errorElement = document.createElement("small");
    errorElement.classList.add("error-text");
    errorElement.innerText = errorText;
    field.closest(".form-group").appendChild(errorElement);
}

// Function to handle form submission
const handleFormData = (e) => {

    // Retrieving input elements
    const firstnameInput = document.getElementById("firstname");
    const lastnameInput = document.getElementById("lastname");
    const emailInput = document.getElementById("email");
    const dateInput = document.getElementById("date");
    const genderInput = document.getElementById("gender");
    const countryInput = document.getElementById("country");
const repeatpassword = document.getElementById("repeatpassword")
    // Getting trimmed values from input fields
    const firstname = firstnameInput.value.trim();
    const lastname = lastnameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const checkrepeatpassword = repeatpassword.value.trim();
    const date = dateInput.value;
    const gender = genderInput.value;
    const country = countryInput.value;
    // Regular expression pattern for email validation
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    // Clearing previous error messages
    document.querySelectorAll(".form-group .error").forEach(field => field.classList.remove("error"));
    document.querySelectorAll(".error-text").forEach(errorText => errorText.remove());

    // Performing validation checks
    if (firstname === "") {
        showError(firstnameInput, "Enter your first name");
    }
    if (lastname === "") {
        showError(lastnameInput, "Enter your last name");
    }
    if (!emailPattern.test(email)) {
        showError(emailInput, "Enter a valid email address");
    }
    if (password === "") {
        showError(passwordInput, "Enter your password");
    }
    if (checkrepeatpassword === "") {
        showError(repeatpassword, "Enter your password");
    }
    if (date === "") {
        showError(dateInput, "Select your date of birth");
    }
    if (gender === "") {
        showError(genderInput, "Select your gender");
    }
    if (country === "") {
        showError(countryInput, "Select your country");
    }

    // Checking for any remaining errors before form submission
    const errorInputs = document.querySelectorAll(".form-group .error");
    if (errorInputs.length > 0) return;

    // Submitting the form
}

// Toggling password visibility
passToggleBtn.addEventListener('click', () => {
    passToggleBtn.className = passwordInput.type === "password" ? "fa-solid fa-eye-slash" : "fa-solid fa-eye";
    passwordInput.type = passwordInput.type === "password" ? "text" : "password";
});

// Now call fireBase Function to register the user


import { app, auth, db, createUserWithEmailAndPassword, collection, addDoc, onAuthStateChanged } from "./fireBase.js"
let registerBtn = document.getElementById("register");
registerBtn.addEventListener("click", () => {
    handleFormData()
    if (email.value == "" && password.value != repeatpassword.value && date.value == "" && gender.value == "" && country.value == "") {
      swal ( "Oops" ,  "Enter same password" ,  "error" );
    } else {
        loader.style.display = "block";
        let userInfo = {
            firstname: firstname.value,
            lastname: lastname.value,
            email: email.value,
            password: password.value,
            date: date.value,
            gender: gender.value,
            country: country.value
        }
        console.log(userInfo)
        createUserWithEmailAndPassword(auth, userInfo.email, userInfo.password)
            .then(async (userCredential) => {
                const user = userCredential.user;
                try {
                    const docRef = await addDoc(collection(db, 'Hackathon'), {
                        ...userInfo,
                        uid: user.uid
                    });
                    localStorage.setItem("uid", uid)
                    console.log("Document written with ID: ", uid);
                        location.href = "/login/index.html"
                } catch (e) {
                    console.error("Error adding document: ", e);
                }
            })
            .catch((error) => {
                loader.style.display = "none"
                const errorCode = error.code;
                swal ( "Oops" ,  errorCode ,  "error" );
            });
    }
})

onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log(user)
        const uid = user.uid;
       if(location.pathname == '/login//registration.html'){
            location.href = "../dashboard/dashboard.html"
        }
    } else {
//console.log("...")
    }
  });