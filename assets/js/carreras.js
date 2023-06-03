function getCarreras(){
    return getJSON(GLOBAL_KEYS.CARRERAS);
}

function removeCarrera(id){
    removeItem(GLOBAL_KEYS.CARRERAS, id)
}

function addCarrera(element){
    addItem(GLOBAL_KEYS.CARRERAS, element);
}

function createCarrera(){
    //leemos inputs y seteamos ID
    //creas element
    addEstudiante(element);
}

function loadCarreraTable(){
    let array = getCarreras();
    for (let e of array) {
        appendElementTable(GLOBAL_KEYS.CARRERAS, e);
    }
}

document.addEventListener("DOMContentLoaded", function(){
    loadCarreraTable()
});