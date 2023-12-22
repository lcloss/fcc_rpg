// let camperbot = 'Bot';
let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ['bastão'];

const button1 = document.querySelector('#button1');
const button2 = document.querySelector('#button2');
const button3 = document.querySelector('#button3');
const text = document.querySelector('#text');
const xpText = document.querySelector('#xpText');
const healthText = document.querySelector('#healthText');
const goldText = document.querySelector('#goldText');
const monsterStats = document.querySelector('#monsterStats');
const monsterName = document.querySelector('#monsterName');
const monsterHealthText = document.querySelector('#monsterHealth');
const weapons = [
    {
        name: 'bastão',
        article: 'o',
        power: 5
    },
    {
        name: 'punhal',
        article: 'o',
        power: 30
    },
    {
        name: 'martelo',
        article: 'o',
        power: 50
    },
    {
        name: 'espada',
        article: 'a',
        power: 100
    }
];
const monsters = [
    {
        name: 'geléia',
        level: 2,
        health: 15
    },
    {
        name: 'besta com presas',
        level: 8,
        health: 60
    },
    {
        name: 'dragão',
        level: 20,
        health: 300
    }
];

const locations = [
    {
        name: "praça da cidade",
        "button text": [
            'Vá para Loja',
            'Vá para a Caverna',
            'Lutar com o dragão'
        ],
        "button functions": [
            goStore,
            goCave,
            fightDragon
        ],
        "text": "Você está na Praça da cidade. Você vê uma placa a dizer: \"Loja\"."
    },
    {
        name: "store",
        "button text": [
            'Compre 10 saúdes (10 ouros)',
            'Compre uma arma (30 ouros)',
            'Vá para a Praça da cidade'
        ],
        "button functions": [
            buyHealth,
            buyWeapon,
            goTown
        ],
        "text": "Você entrou na loja."
    },
    {
        name: "cave",
        "button text": [
            'Lutar com a geléia',
            'Lutar com a besta com presas',
            'Vá para Praça da cidade'
        ],
        "button functions": [
            fightSlime,
            fightBeast,
            goTown
        ],
        "text": "Você entrou na caverna. Você vê alguns monstros."
    },
    {
        name: "fight",
        "button text": [
            'Atacar',
            'Esquivar',
            'Correr'
        ],
        "button functions": [
            attack,
            dodge,
            goTown
        ],
        "text": "Você está lutando com o monstro."
    },
    {
        name: "kill monster",
        "button text": [
            'Vá para Praça da cidade',
            'Vá para Praça da cidade',
            'Vá para Praça da cidade'
        ],
        "button functions": [
            goTown,
            goTown,
            easterEgg
        ],
        "text": 'O monstro gritou "Arghh!" enquanto morria. Você obteve pontos de experiência e encontrou ouro.'
    },
    {
        name: "lose",
        "button text": [
            'NOVAMENTE?',
            'NOVAMENTE?',
            'NOVAMENTE?'
        ],
        "button functions": [
            restart,
            restart,
            restart
        ],
        "text": 'Você morreu. ☠️'
    },
    {
        name: "win",
        "button text": [
            'NOVAMENTE?',
            'NOVAMENTE?',
            'NOVAMENTE?'
        ],
        "button functions": [
            restart,
            restart,
            restart
        ],
        "text": 'Você derrotou o dragão! VOCÊ VENCEU O JOGO! 🎉'
    },
    {
        name: "easter egg",
        "button text": [
            '2',
            '8',
            'Ir para Praça da cidade?'
        ],
        "button functions": [
            pickTwo,
            pickEight,
            goTown
        ],
        "text": 'Você encontrou um jogo secreto. Escolha um número acima. Dez números serão escolhidos aleatoriamente entre 0 e 10. Se o número que você escolheu corresponder a um dos números aleatórios, você ganha!'
    }
];

function update(location) {
    monsterStats.style.display = "none";

    button1.innerText = location["button text"][0];
    button2.innerText = location["button text"][1];
    button3.innerText = location["button text"][2];

    button1.onclick = location["button functions"][0];
    button2.onclick = location["button functions"][1];
    button3.onclick = location["button functions"][2];

    text.innerText = location.text;
}
function buyHealth() {
    if ( gold >= 10 ) {
        gold -= 10;
        health += 10;
        goldText.innerText = gold;
        healthText.innerText = health;
    } else {
        text.innerText = "Você não tem ouro suficiente para comprar saúde.";
    
    }
}
function buyWeapon() {
    if ( currentWeapon < weapons.length - 1 ) {
        if ( gold >= 30 ) {
            gold -= 30;
            currentWeapon++;
            goldText.innerText = gold;
            let newWeapon = weapons[currentWeapon].name;
            text.innerText = "Agora você tem " + weapons[currentWeapon].article + " " + newWeapon + ".";
            inventory.push(newWeapon);
            text.innerText += " No seu inventário você tem: " + inventory.join(", ");
        } else {
            text.innerText = "Você não tem ouro suficiente para comprar uma arma.";
        }
    } else {
        text.innerText = "Você já tem a arma mais poderosa!";
        button2.innerText = "Venda a sua arma por 15 ouros";
        button2.onclick = sellWeapon;
    }
}
function sellWeapon() {
    if (inventory.length > 1) {
        gold += 15;
        goldText.innerText = gold;
        let currentWeapon = inventory.shift();
        text.innerText = "Você vendeu a " + currentWeapon + ".";
        text.innerText += " No seu inventário você tem: " + inventory.join(", ");
    } else {
        text.innerText = "Não venda a sua única arma!";
    }
}
function goTown() {
    update(locations[0]);
}
function goStore() {
    update(locations[1]);
}
function goCave() {
    update(locations[2]);
}
function goFight() {
    update(locations[3]);
    monsterHealth = monsters[fighting].health;
    monsterStats.style.display = "block";
    monsterName.innerText = monsters[fighting].name;
    monsterHealthText.innerText = monsterHealth;
}
function fightSlime() {
    fighting = 0;
    goFight();
}
function fightBeast() {
    fighting = 1;
    goFight();
}
function fightDragon() {
    fighting = 2;
    goFight();
}
function attack() {
    text.innerText = "O " + monsters[fighting].name + " atacou.";
    text.innerText += " Você o atacou com " + weapons[currentWeapon].article + " " + weapons[currentWeapon].name + ".";
    health -= getMonsterAttackValue(monsters[fighting].level);
    if ( isMonsterHit() ) {
        monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
    } else {
        text.innerText += " Você falhou.";
    }
    healthText.innerText = health;
    monsterHealthText.innerText = monsterHealth;
    if ( health <= 0 ) {
        lose();
    } else if ( monsterHealth <= 0 ) {
        fighting === 2 ? winGame() : defeatMonster();
    }
    if ( inventory.length !== 1 && Math.random() <= .1 ) {
        text.innerText += "A sua arma " + inventory.pop() + " quebrou.";
        currentWeapon--;
    }
}
function getMonsterAttackValue(level) {
    const hit = (level * 5) - (Math.floor(Math.random() * xp));
    return hit > 0 ? hit : 0;
}
function isMonsterHit() {
    // return Math.floor(Math.random() * 2) === 0 || health < 20;
    return Math.random() > .2 || health < 20;
}
function dodge() {
    text.innerText = "Você se esquivou do ataque do " + monsters[fighting].name + ".";
}
function lose() {
    update(locations[5]);
}
function winGame() {
    update(locations[6])
}
function defeatMonster() {
    gold += Math.floor( monsters[fighting].level * 6.7 );
    xp += monsters[fighting].level;
    goldText.innerText = gold;
    xpText.innerText = xp;
    update(locations[4]);
}
function restart() {
    xp = 0;
    health = 100;
    gold = 50;
    currentWeapon = 0;
    inventory = ['bastão'];
    goldText.innerText = gold;
    healthText.innerText = health;
    xpText.innerText = xp;
    goTown();
}
function easterEgg() {
    update(locations[7]);
}
function pick(guess) {
    let numbers = [];
    while (numbers.length < 10) {
        numbers.push(Math.floor(Math.random() * 11));
    }
    text.innerText = "Você escolhou o " + guess + ". Aqui estão os números aleatórios:\n";
    for (let i = 0; i < 10; i++) {
        text.innerText += numbers[i] + "\n";
    }
    if ( numbers.indexOf(guess) !== -1 ) {
        text.innerText += "Certo! Você ganhou 20 ouros!";
        gold += 20;
        goldText.innerText = gold;
    } else {
        text.innerText += "Errado! Você perdeu 10 saúdes.";
        health -= 10;
        healthText.innerText = health;
        if ( health <= 0 ) {
            lose();
        }
    }
}
function pickTwo() {
    pick(2);
}
function pickEight() {
    pick(8);
}
// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;