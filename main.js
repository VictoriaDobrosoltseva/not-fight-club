const name = document.querySelector('.textInput');
const buttonLogin = document.querySelector('.registerButton');
const login = document.getElementById('login');
const home = document.getElementById('home');
const buttonFight = document.querySelector('.buttonFight');

const nameInput = document.querySelector('.ChangeName');
const saveButton = document.querySelector('.saveNameBtn');

const characterName = localStorage.getItem('name');
const characterNamespan = document.querySelector('.characterInformation__Data--name');
const heroName = document.querySelector('.heroName');
characterNamespan.textContent = characterName;



buttonLogin.addEventListener('click', function() {
    const inputValue = name.value.trim();
    if (inputValue) 
        {
            localStorage.setItem('name', inputValue);
            if (heroName) {
                heroName.textContent = inputValue;
            }
            updateAllNameDisplays(inputValue);
            login.style.display = 'none';
            home.style.display = 'flex';
        }
    else {
        alert('Enter character name')
    };
  });


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

function updateAllNameDisplays(name) {
    if (characterNamespan) {
        characterNamespan.textContent = name;
    }
    if (heroName) {
        heroName.textContent = name;
    }
    if (userNameDisplay) {
        userNameDisplay.textContent = name;
    }
}

const storedName = localStorage.getItem('name');
if (storedName) {
    updateAllNameDisplays(storedName);
}

saveButton.addEventListener('click', function() {
    const newName = nameInput.value.trim();
    if (newName) {
        localStorage.setItem('name', newName);
        updateAllNameDisplays(newName);
    } else {
        alert('Name?');
    }
});



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

const attackRadios = document.querySelectorAll('input[name=attack]');
const DefenseRadios = document.querySelectorAll('.radiodefense');
const fightBtn = document.querySelector('.buttonAttack');
const enemyImg = document.querySelector('.enemy');
const heroProgress = document.querySelector('.heroHealth');
const enemyProgress = document.querySelector('.enemyHealth');
const battleLogDiv = document.getElementById('battleLog');

let heroHealth = 100;
let enemyHealth = 100;

const enemies = [
    { id: 'Murlok', image: 'img/enemy1.jpg', health: 100 },
    { id: 'Naga', image: 'img/enemy2.jpg ', health: 100 },
];

let currentEnemyIndex=0;

function initBattle() {
    heroHealth = 100;
    const enemy = enemies[currentEnemyIndex];
    enemyHealth = enemy.health;
    updateProgress();
    enemyImg.src = enemy.image;
    log(`Start of the battle with ${enemy.id}`);
}

function updateProgress() {
    heroProgress.value = heroHealth;
    enemyProgress.value = enemyHealth;
    document.querySelector('.healtBarLabelHero').textContent = heroHealth;
    document.querySelector('.healtBarLabelEnemy').textContent = enemyHealth;
}

function log(message, color) {
    const p = document.createElement('p');
    p.innerHTML = message;
    p.style.color = color;
    battleLogDiv.appendChild(p);
    battleLogDiv.scrollTop = battleLogDiv.scrollHeight;
}

DefenseRadios.forEach(radio => {
    radio.addEventListener('change', function() {
        const checkedRadios = Array.from(DefenseRadios).filter(def => def.checked);
        if (checkedRadios.length > 2) {
            const lastCheckedRadio = radio;

            Array.from(DefenseRadios).forEach(defch => {
                if (defch !== lastCheckedRadio && defch.checked) {
                    defch.checked = false;
                }
            });
        }
    });
});

fightBtn.onclick = () => {
    const attackRadio = Array.from(attackRadios).find(att => att.checked);
    if (!attackRadio) {
        alert('Select attack type');
        return;
    }

    const selectedDefenses = Array.from(DefenseRadios).filter(defs => defs.checked);
    if(selectedDefenses.length !== 2){
        alert('Select exactly two types of protection');
        return;
    }

    const attackType = attackRadio.value;
    const defenses = selectedDefenses.map(at => at.value);

    log(`Attack zone: ${attackType}. Defenses zones: ${defenses.join(', ')}`);

    const currentEnemy=enemies[currentEnemyIndex];

    let damageToEnemy;
    if (currentEnemy.id == 'Naga'){
        damageToEnemy = Math.floor(Math.random() * 21) + 10;
    } else {
        damageToEnemy = Math.floor(Math.random() * 21) + 20;
    }

    let damageToHero;
    if (currentEnemy.id == 'Naga'){
        damageToHero= Math.floor(Math.random() * 11) + 15;
    } else {
        damageToHero= Math.floor(Math.random() * 11) + 5;
    }

    if (defenses.includes(attackType)){
        damageToEnemy -= 5;
        if(damageToEnemy < 0) damageToEnemy = 0;
    }

    enemyHealth -= damageToEnemy;
    if (enemyHealth < 0) enemyHealth = 0;

    heroHealth -= damageToHero;
   if (heroHealth < 0) heroHealth = 0;
   const enemy = enemies[currentEnemyIndex];

   log(`<span style="color:#006400;"> You <span style="color:black;"> have inflicted damage on the <span style="color:#800080;"> ${enemy.id} <span style="color:#8B0000;">${damageToEnemy} damage.<span style="color:#800080;"> ${enemy.id} <span style="color:black;"> hit you <span style="color:#8B0000;"> ${damageToHero} damage.`);

   updateProgress();

   if (enemyHealth == 0 || heroHealth == 0){
       if (enemyHealth == 0){
           log(`You win!`, 'green');
           changeEnemy();
       } else {
           log(`You loose!`, '#8B0000');
       }
       initBattle();

       attackRadios.forEach(att => att.checked=false);
       DefenseRadios.forEach(def => def.checked=false);
       return;
   }
};

function changeEnemy() {
   currentEnemyIndex++;
   if (currentEnemyIndex >= enemies.length){
       currentEnemyIndex = 0;
   }
   const newEnemy = enemies[currentEnemyIndex];
   enemyImg.src = newEnemy.image;
   enemyHealth = newEnemy.health;
   updateProgress();
   document.querySelector('.enemyName').textContent = newEnemy.id;
   log(`New enemy: ${newEnemy.id}`);
}

document.querySelector('.enemyName').textContent = enemies[currentEnemyIndex].id;
initBattle();


