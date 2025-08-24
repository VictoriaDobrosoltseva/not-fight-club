const name = document.querySelector('.textInput');
const buttonLogin = document.querySelector('.registerButton');
const login = document.getElementById('login');
const home = document.getElementById('home');
const buttonFight = document.querySelector('.buttonFight');

const characterName = localStorage.getItem('name');
const characterNamespan = document.querySelector('.characterInformation__Data--name');
characterNamespan.textContent = characterName;



buttonLogin.addEventListener('click', function() {
    const inputValue = name.value;
    if (inputValue) 
        {
            localStorage.setItem('name', inputValue)
            login.style.display = 'none';
            home.style.display = 'flex';
        }
    else {
        alert('Enter character name')
    };
  });

const heroName = document.querySelector('.heroName');
const fight = document.getElementById('fight');

  buttonFight.addEventListener('click', function() {
    home.style.display = 'none';
    fight.style.display = 'flex';
    heroName.textContent = characterName;
});

const homeButton = document.querySelector('.homeButton');

homeButton.addEventListener('click', function() {
    fight.style.display = 'none';
    home.style.display = 'flex';
});

const mainImage = document.querySelector('.characterInformation__Avatar--image');
const popup = document.getElementById('popup');
const closeBtn = document.querySelector('.closePopup');
const options = document.querySelectorAll('.selectable');
const character = document.getElementById('character');
const heroImage = document.querySelector('.hero');
const characterHomeBtn = document.querySelector('.characterHome');
const CharacterPageBtn = document.querySelector('.CharacterPage');
const CharacterPageFight = document.querySelector('.CharacterPageFight');
const userNameDisplay = document.querySelector('.userNameDisplay');

mainImage.addEventListener('click', function() {
    popup.style.display = 'flex';
});

closeBtn.addEventListener('click', function() {
    popup.style.display = 'none';
});

options.forEach(option => {
    option.addEventListener('click', function() {
        const newSrc = option.getAttribute('src');
        mainImage.src = newSrc;
        popup.style.display = 'none'; 
        localStorage.setItem('selectedAvatar', newSrc);
        const savedSrc = localStorage.getItem('selectedAvatar');
        heroImage.src = savedSrc;
    });
});

characterHomeBtn.addEventListener('click', function() {
    home.style.display = 'flex';
    character.style.display = 'none';
});

CharacterPageBtn.addEventListener('click', function() {
    home.style.display = 'none';
    character.style.display = 'flex';
})

CharacterPageFight.addEventListener('click', function() {
    fight.style.display = 'none';
    character.style.display = 'flex';
});

function updateDisplayedName(name) {
    if (userNameDisplay) {
        userNameDisplay.textContent = name;
    }
}

if (localStorage.getItem('name')) {
    if (login) {
        login.style.display = 'none';
        home.style.display = 'flex';
    }
}

const CharacterBtnChr = document.querySelector('.CharacterBtnChr');
const settings = document.getElementById('settings');

const SettingsPage = document.querySelector('.SettingsPage');

SettingsPage.addEventListener('click', function() {
    settings.style.display = 'flex';
    home.style.display = 'none';
});

CharacterBtnChr.addEventListener('click', function() {
    settings.style.display = 'none';
    character.style.display = 'flex';
})

