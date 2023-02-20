// Inicializacion de variables
let turnedCard = 0;
let card1 = null;
let card2 = null;
let firstResult = null;
let secondResult = null;
let movements = 0;
let hits = 0;
let counter = false;
let timer = 35;
let InitialTimer = 35;
let regressivetimeId = null;
let showMovement = document.getElementById("movements");
let showhits = document.getElementById("hits");
let showTime = document.getElementById("timeleft");

// Generacion de numeros aleatorios
let numbers = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
numbers = numbers.sort(() => {
  return Math.random()-0.5;
});
console.log(numbers);

//Funcion del tiempo
function countTime() {
  regressivetimeId = setInterval(() => {
    timer--;
    showTime.innerHTML = `Time : ${timer} seconds`;
    if(timer == 0)
    {
        clearInterval(regressivetimeId);
        blockcard();
    }
  },1000);
}
//Funcion de bloqueo
function blockcard(){
    for (let c = 0; c <= 15; c++){
        let blockedCard = document.getElementById(c);
        blockedCard.innerHTML = `<img src="./images/${numbers[c]}.png" alt="">`;
        blockedCard.disabled = true;
    }
}

//Funcion Principal
function turned(id) {
  if (counter == false) {
    countTime();
    counter = true;
  }

  turnedCard++;
  console.log(turnedCard);
  //Muestra el primer resultado
  if (turnedCard == 1) {
    card1 = document.getElementById(id);
    firstResult = numbers[id];
    card1.innerHTML = `<img src="./images/${firstResult}.png" alt="">`;
    card1.disabled = true;

  } else if (turnedCard == 2) {
    card2 = document.getElementById(id);
    secondResult = numbers[id];
    card2.innerHTML = `<img src="./images/${secondResult}.png" alt="">`;
    //Desabilita el boton seleccionado
    card2.disabled = true;

    movements++;
    showMovement.innerHTML = `Movements: ${movements}`;

    if (firstResult == secondResult) {
      turnedCard = 0;

      //aumentar los aciertos
      hits++;
      showhits.innerHTML = `Hits: ${hits}`;

      if (hits == 8) {
        clearInterval(regressivetimeId);
        showhits.innerHTML = `Hits: ${hits} 👊`;
        showTime.innerHTML = `Awesome, this took you ${InitialTimer - timer} seconds 🤙⏱`
        showMovement.innerHTML = `Movements: ${movements} 🤺`;
      }
    } else {
      setTimeout(() => {
        card1.innerHTML = " ";
        card2.innerHTML = " ";
        card1.disabled = false;
        card2.disabled = false;
        turnedCard = 0;
      }, 1000);
    }
  }
}
