const input1 = document.querySelector('.input1');
const inputs = document.querySelectorAll('.input1');
const validChars = document.querySelector('.validChars');
const firstName = document.querySelector('#nameInput');
const lastName = document.querySelector('#lastNameInput');
const email = document.querySelector('#emailInput');
const subject = document.querySelector('#subjectInput');
const message = document.querySelector('#messageInput');
const submitButton = document.querySelector('#submitButton');

const emailSent = document.querySelector('.email-sent');
const contactForm = document.querySelector('.contact-form');


function init() {
    message.addEventListener('keyup', updateCharsCount);
    submitButton.addEventListener('click', submitForm);
    inputs.forEach(input => addEventListener('change', validateForm));
}


function submitForm() {
    if (validateForm()) {
        contactForm.classList.add('hidden')
        emailSent.classList.remove('hidden');

    };
}

function validateForm() {

    clearErrors();

    let valids = 0;

    valids += validateText(firstName.value, 2)
        ? valid(firstName)
        : invalid(firstName);

    valids += validateText(lastName.value, 2)
        ? valid(lastName)
        : invalid(lastName);

    valids += validateEmail(email)
        ? valid(email)
        : invalid(email);

    valids += validateText(subject.value, 2, 20)
        ? valid(subject)
        : invalid(subject);

    valids += validateText(message.value, 5, 300)
        ? valid(message)
        : invalid(message);


    return valids === 5;
}

function clearErrors() {
    const errors = document.querySelectorAll('.alert-validate');

    errors.forEach(function(error){
        error.classList.remove('alert-validate');
    });
}

function updateCharsCount(event) {
    const charsLeft = 300 - event.target.value.length;

    if (charsLeft > 0) {
        validChars.textContent = charsLeft;
    } else {
        validChars.textContent = 0;
        invalid(message, 'Has more than 500 caracters')
    }
}

function validateText(str, min, max) {
    if (!isNaN(min) && !isNaN(max)) {
        return str.length > min && str.length < max;
    }

    if (!isNaN(min)) {
        return str.length > min;
    }

    return false;
}

function validateEmail(email) {
    var mailformat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (email.value.match(mailformat)) {
        return true;
    } else {
        return false;
    }
}

function valid(elem) {
    elem.parentNode.classList.remove('alert-validate');

    return true;
}

function invalid(elem) {
    elem.parentNode.classList.add('alert-validate');

    return false;
}

window.addEventListener('load', init);