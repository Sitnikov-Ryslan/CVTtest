// Tabs

const tabs = document.querySelectorAll('.tabs__item');
const movies = document.querySelector('.movies');
const channels = document.querySelector('.channels');


tabs.forEach((item) => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        
        tabs.forEach((elem) => {
            elem.classList.remove('active');
        })
        movies.classList.add('hidden');
        channels.classList.add('hidden');

        item.classList.add('active');

        let showBlock = function() {
            let contentBlock = document.querySelector(`${item.getAttribute('href')}`);
            contentBlock.classList.remove('hidden');
        }

        showBlock();
    })
});

// Show Modal

const body = document.querySelector('body');
const autBtn = document.querySelector('.header__authorization-btn');
const modal = document.querySelector('.modal');
const modalForm = document.querySelector('.modal__form');

let stopProp = function(evt) {
    evt.stopPropagation();
}

let closeModal = function(evt) {
    evt.preventDefault();
    body.classList.remove('no-scroll');
    modal.classList.add('hidden');
    modal.removeEventListener('click', closeModal);
    modalForm.removeEventListener('click', stopProp)
}

autBtn.addEventListener('click', function(evt) {
    evt.preventDefault();
    body.classList.add('no-scroll');
    modal.classList.remove('hidden');

    modal.addEventListener('click', closeModal)
    modalForm.addEventListener('click', stopProp)
});

// Submit form
const modalLogin = document.querySelector('.modal__login');
const modalPass = document.querySelector('.modal__password');
const userName = document.querySelector('.header__user-name');
const checkbox = document.querySelector('.modal__checkbox');
const user = document.querySelector('.header__user');
const search = document.querySelector('.header__search');

let postData = function(URL) {
    let data = `${userName.value}`;
    
    let response = fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {'user-name': data})
    })
        .then(response => {
            if (response.ok) {
                response.json();
                }
        })
        .catch(error => console.log(error))
}

let addName = function() {
    if (userName.value == '') {
        sessionStorage.removeItem(`${userName.name}`);
        userName.classList.remove('added');

        postData('URLserver');
    } else {
        sessionStorage.setItem(`${userName.name}`, `${userName.value}`);
        userName.classList.add('added');

        postData('URLserver');
    }
};

let checkEnterInputs = function(ev) {
    if (modalLogin.value.trim() !== '' && modalPass.value.trim() !== '') {
        sessionStorage.setItem(`${modalLogin.name}`, `${modalLogin.value}`);
        sessionStorage.setItem(`${modalPass.name}`, `${modalPass.value}`);
       
        if (sessionStorage.getItem(`${userName.name}`) !== null) {
            userName.value = sessionStorage.getItem(`${userName.name}`);
            userName.classList.add('added');
        } else {
            userName.classList.remove('added');
        }

        closeModal(ev);
        autBtn.classList.add('hidden');
        user.classList.remove('hidden');
        search.classList.add('thin');

        userName.addEventListener('change', addName);
    } else {
        ev.preventDefault();
    }
}

modalForm.addEventListener('submit', function(event) {
    event.preventDefault();

    if (checkbox.checked) {
        let postResponse = function() {
            let URL = modalForm.action;

            let response = fetch(URL, {
                method: 'POST',
                body: new FormData(modalForm)
            })
                .then(response => {
                    if (response.ok) {
                        response.json();
                        }
                })
                .catch(error => console.log(error))
        }

        postResponse();
    } else {
        checkEnterInputs(event);
    }
});

// Check user enter

document.addEventListener('DOMContentLoaded', (ev) => {
    if (sessionStorage.getItem(`${modalLogin.name}`) !== null) {
        closeModal(ev);
        autBtn.classList.add('hidden');
        user.classList.remove('hidden');
        search.classList.add('thin');

        userName.addEventListener('change', addName);
    }
})

// Exit user

const exitBtn = document.querySelector('.header__user-exit');

exitBtn.addEventListener('click', (evt) => {
    evt.preventDefault();

    sessionStorage.removeItem(`${modalLogin.name}`);
    sessionStorage.removeItem(`${modalPass.name}`);
    sessionStorage.removeItem(`${userName.name}`);

    autBtn.classList.remove('hidden');
    user.classList.add('hidden');
    search.classList.remove('thin');

    userName.removeEventListener('change', addName);
})