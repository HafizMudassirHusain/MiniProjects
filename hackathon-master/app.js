// ===================================My Navbar======================================
function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }
// ======================================text TYPING====================================

window.onload = function() {
    // Typing animation
    const typingText = document.querySelector('.typing-text');
    const words = ['Developer','Programmer','Freelancer'];
    let wordIndex = 0;
    let charIndex = 0;

    function type() {
      if (charIndex < words[wordIndex].length) {
        typingText.textContent += words[wordIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, 200); // Typing speed (adjust as needed)
      } else {
        setTimeout(erase, 2000); // Pause before erasing (adjust as needed)
      }
    }

    function erase() {
      if (charIndex > 0) {
        typingText.textContent = words[wordIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, 100); // Erasing speed (adjust as needed)
      } else {
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(type, 500); // Pause before typing new word (adjust as needed)
      }
    }

    type(); // Start typing animation
  };



// ==============================Project Picture expand section=====================================
  function expandImage(imageUrl) {
    var expandedImage = document.querySelector('.expanded-image');
    expandedImage.src = imageUrl;
    document.querySelector('.expanded-image-container').style.display = 'flex';
}

function closeExpandedImage() {
    document.querySelector('.expanded-image-container').style.display = 'none';
}




// ========================================COntact me section====================================
const form = document.querySelector("form");
const fullName = document.querySelector("#name");
const email = document.querySelector("#email");
const phone = document.querySelector("#phone");
const subject = document.querySelector("#subject");
const message = document.querySelector("#message");

function sendEmail() {
    const bodyMessage = `Full Name: ${fullName.value}<br> Email: ${email.value}<br> Phone Number: ${phone.value}<br> Subject: ${subject.value}<br> Message: ${message.value}<br>`;

    Email.send({
        SecureToken : "cc5b16e1-4cf5-4391-9286-da529c592342",
        To: 'hmudassir511@gmail.com',
        From: "hmudassir511@gmail.com",
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





