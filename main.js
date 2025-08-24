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

const fightSet = document.querySelector('.fightSet');

fightSet.addEventListener('click', function() {
    fight.style.display = 'none';
    settings.style.display = 'flex';
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

const charSet = document.querySelector('.charSet');

charSet.addEventListener('click', function() {
    settings.style.display = 'flex';
    character.style.display = 'none';
})


const SetHome = document.querySelector('.SetHome');

SetHome.addEventListener('click', function() {
    settings.style.display = 'none';
    home.style.display = 'flex';
})

const attackRadios = document.querySelectorAll('input[name=attack]');
const DefenseRadios = document.querySelectorAll('.radiodefense');
const fightBtn = document.querySelector('.buttonAttack');
const enemyImg = document.querySelector('.enemy');
const heroProgress = document.querySelector('.heroHealth');
const enemyProgress = document.querySelector('.enemyHealth');
const battleLogDiv = document.getElementById('battleLog');

const winsSpan = document.querySelector('.characterInformation__Data--Results-Wins');
const losesSpan = document.querySelector('.characterInformation__Data--Results-Loses');


let winsCount = parseInt(localStorage.getItem('wins')) || 0;
let losesCount = parseInt(localStorage.getItem('loses')) || 0;

updateResultsDisplay();


let heroHealth = 100;
let enemyHealth = 100;

const storedAvatar = localStorage.getItem('selectedAvatar');
if (storedAvatar) {
    mainImage.src = storedAvatar;
    heroImage.src = storedAvatar;
}

const zones = ['Head', 'Neck', 'Body', 'Belly', 'Legs'];

let enemyAttackZone = '';
let enemyBlockZones = [];

const enemies = [
    { 
        id: 'Murlok', 
        image: 'img/enemy1.jpg', 
        health: 100,
        attackZones: ['Head', 'Body'],
        blockZones: ['Neck'] 
    },
    { 
        id: 'Naga', 
        image: 'img/enemy2.jpg', 
        health: 100,
        attackZones: ['Head'],
        blockZones: ['Head', 'Neck', 'Legs']
    },
];

function getRandomZones(zonesArray, count) {
    const zonesCopy = [...zonesArray];
    const selected = [];
    for (let i = 0; i < count; i++) {
        if (zonesCopy.length == 0) break;
        const index = Math.floor(Math.random() * zonesCopy.length);
        selected.push(zonesCopy.splice(index, 1)[0]);
    }
    return selected;
}

let currentEnemyIndex=0;

function updateResultsDisplay() {
    if (winsSpan) winsSpan.textContent = winsCount;
    if (losesSpan) losesSpan.textContent = losesCount;
}

function initBattle() {
    heroHealth = 100;
    const enemy = enemies[currentEnemyIndex];

    enemyAttackZone = getRandomZones(enemy.attackZones, 1)[0];
    enemyBlockZones = getRandomZones(enemy.blockZones, Math.min(3, enemy.blockZones.length));

    enemyHealth = enemy.health;
    updateProgress();
    document.querySelector('.enemyName').textContent = enemy.id;
    enemyImg.src = enemy.image;
    log(`Battle starts at ${enemy.id}.`);
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

updateResultsDisplay();

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

    log(`Attack zone: <span style="color:#6A5ACD;"> ${attackType}.<span style="color:black;"> Defenses zones: <span style="color:#FF8C00;">${defenses.join(', ')}`);

    const currentEnemy=enemies[currentEnemyIndex];

    let damageToEnemy;
    if (currentEnemy.id == 'Naga'){
        damageToEnemy = Math.floor(Math.random() * 21) + 5;
    } else {
        damageToEnemy = Math.floor(Math.random() * 21) + 20;
    }

    let damageToHero;
    if (currentEnemy.id == 'Naga'){
        damageToHero= Math.floor(Math.random() * 11) + 20;
    } else {
        damageToHero= Math.floor(Math.random() * 11) + 5;
    }

    let playerHitsEnemy=false;

    if (attackType === enemyAttackZone) {
        log(`Your damage <span style="color:#6A5ACD;"> ${attackType} <span style="color: black;"> was blocked by the enemy!`);
        damageToEnemy = 0; 
        playerHitsEnemy = false; 
      } else if (enemyBlockZones.includes(attackType)) {
        log(`You blocked an attack in <span style="color:#6A5ACD;"> ${attackType}!`);
        damageToHero = 0; 
      } else {
        log(`Your damage <span style="color:#6A5ACD;">${attackType} <span style="color: black;">was a success!`);
        playerHitsEnemy = true; 
      }

      if (enemyAttackZone === attackType) {
          log(`Attack of the enemy in <span style="color:#6A5ACD;">${enemyAttackZone} <span style="color: black;">was blocked by your protection!`, 'orange');
          damageToHero = 0; 
       } else if (defenses.includes(enemyAttackZone)) {
           log(`You blocked an enemy attack in <span style="color:#6A5ACD;">${enemyAttackZone}!`);
           damageToHero = 0; 
       } else {
           log(`Attack of the enemy in <span style="color:#6A5ACD;">${enemyAttackZone} <span style="color: black;">got it!`);
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
            winsCount++;
            localStorage.setItem('wins', winsCount);
            updateResultsDisplay();
            log(`You win!`, 'green');
            changeEnemy();
       } else {
            losesCount++;
            localStorage.setItem('loses', losesCount);
            updateResultsDisplay();
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


