const name = document.querySelector('.textInput');
const buttonLogin = document.querySelector('.registerButton');
const login = document.getElementById('login');
const home = document.getElementById('home');
const buttonFight = document.querySelector('.buttonFight');

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