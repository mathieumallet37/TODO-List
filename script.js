//******** Header DATE */

const date1 = new Date().toLocaleDateString('fr-FR',{
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


/** récupération de l'input */

const input = document.querySelector('input');
let id=1;
let done;
let trash;

let listArray = [{
    name,
    id: id,
    done,
    trash
}];


document.addEventListener('keyup',function(e){
    if(e.key=="Enter" && input.value !=''){
        const toDo = input.value;
        addToList(toDo,id,done,trash);
        listArray.push({
            name : toDo,
            id : id,
            done : false,
            trash : false
        });
        saveListToLocalStorage()
        input.value ="";
        id++;
        
    } 
});
/*** Selection de la liste */

/*** Fonction d'ajout */
const list = document.querySelector('#list');

function addToList( toDo, id){
    if (trash) { return; }

    const text = `
    <li class="item" id=item-${id}>
        <i class="co fa fa-circle-thin " job="complete"></i>
        <p class="text"> ${toDo} </p>
        <i class="de fa fa-trash-o" job="delete"></i>
    </li>
    `
    const position = 'beforeend';
    list.insertAdjacentHTML(position,text);

};

// Fonction pour supprimer un élément de la liste
function removeFromList(id) {
    listArray = listArray.filter(item => item.id !== id);
    const listItem = document.getElementById(`item-${id}`);
    listItem.remove();
    
  }
  
  // Gestionnaire d'événement pour le clic sur l'icône de la poubelle
  list.addEventListener('click', function(event) {
    const element = event.target;
    const elementJob = element.attributes.job.value;
    const elementClass = element.classList;
    const check = 'fa-circle-check';
    const thin = "fa-circle-thin";
    const listItem = element.parentNode;
    const itemText = listItem.querySelector('.text');
    
    if (elementJob === 'delete') {
        const id = parseInt(element.parentNode.id.split('-')[1]);
        removeFromList(id);
        saveListToLocalStorage()
    }
    if (elementJob === 'complete'){
        if(elementClass.contains(thin)){
            elementClass.remove(thin);
            elementClass.add(check);   
            itemText.classList.add('completeItem'); 
        }else{
            elementClass.remove(check);
            elementClass.add(thin);
            itemText.classList.remove('completeItem'); 
        }
    }
  });
