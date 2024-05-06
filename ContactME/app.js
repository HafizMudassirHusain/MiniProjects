
const form = document.querySelector("form");
const fullName = document.querySelector("#name");
const email = document.querySelector("#email");
const phone = document.querySelector("#phone");
const subject = document.querySelector("#subject");
const message = document.querySelector("#message");

function sendEmail() {
    const bodyMessage = `Full Name: ${fullName.value}<br> Email: ${email.value}<br> Phone Number: ${phone.value}<br> Subject: ${subject.value}<br> Message: ${message.value}<br>`;

    Email.send({
        SecureToken : "---------------------------",  // ===========Attach your own token from elastic mail===========
        To: '----------------------------', // write your own email
        From: "----------------------------", // write your own email
        Subject: subject.value,
        Body: bodyMessage
    }).then(
        //   message => alert(message)
        message => {
            if (message == "OK") {
                Swal.fire({
                    title: "SuccessFull!",
                    text: "Message send successFully!",
                    icon: "success"
                });
            }
        }

    );
}

function checkInputs() {
    const items = document.querySelectorAll(".item");

    for (const item of items) {
        if (item.value == "") {
            item.classList.add("error");
            item.parentElement.classList.add("error");
        }
        if (items[1].value != "") {
            checkEmail();
        }
        items[1].addEventListener("keyup", () => {
            checkEmail();
        })
        item.addEventListener("keyup", () => {
            if (item.value != "") {
                item.classList.remove("error");
                item.parentElement.classList.remove("error");
            }
            else {
                item.classList.add("error");
                item.parentElement.classList.add("error");
            }
        });
    }
}
function checkEmail() {
    const emailRegex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,3})(\.[a-z]{2,3})?$/;
    const errorTxtEmail = document.querySelector(".error-txt.email");

    if (!email.value.match(emailRegex)) {
        email.classList.add("error");
        email.parentElement.classList.add("error");

        if (email.value != "") {
            errorTxtEmail.innerText = "Enter a valid Email Address";
        } else {
            errorTxtEmail.innerText = "email Address cant be Blank";
        }

    } else {
        email.classList.remove("error");
        email.parentElement.classList.remove("error");
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    checkInputs();

    if (!fullName.classList.contains("error") && !email.classList.
    contains("error") && !phone.classList.contains("error") && 
    !subject.classList.contains("error") && !message.classList.contains("error")) {
        sendEmail();
        form.reset();
        return false;
    }

  

});