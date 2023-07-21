// Wait for the DOM to be fully loaded



let date1 = new Date().toLocaleDateString('fr-FR',{
    weekday: 'long',
    year:"numeric",
    month:"numeric",
    day:"numeric"
});
document.querySelector('#date').textContent = date1 ;

//*********** Horloge

// HORLOGE
// rafraichi toutes les secondes
setInterval(setClock, 1000)
// récupere l'aiguille des heures , des minutes, et secondes
const hourHand = document.querySelector('#hour_clock')
const minuteHand = document.querySelector('#minute_clock')
const secondHand = document.querySelector('#seconde_clock')



// Met à jour l'horloge et l'affiche
function setClock() {
    const currentDate = new Date();
    const secondsRatio = currentDate.getSeconds() / 60;
    const minutesRatio = (secondsRatio + currentDate.getMinutes()) / 60;
    const hoursRatio = (minutesRatio + currentDate.getHours()) / 12;
    setRotation(secondHand, secondsRatio);
    setRotation(minuteHand, minutesRatio);
    setRotation(hourHand, hoursRatio);
  
    // Rafraîchit l'horloge lors de la prochaine animation du navigateur
    requestAnimationFrame(setClock);
  }
  
  // Applique la rotation à l'élément
  function setRotation(element, rotationRatio) {
    element.style.setProperty('--rotation', rotationRatio * 360);
  }
  
  // Démarre l'horloge
  requestAnimationFrame(setClock);



  