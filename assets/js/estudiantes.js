function getEstudiantes(){
    return getJSON(GLOBAL_KEYS.ESTUDIANTES);
}

function removeEstudiante(id){
    removeItem(GLOBAL_KEYS.ESTUDIANTES, id)
}

function addEstudiante(element){
    addItem(GLOBAL_KEYS.ESTUDIANTES, element);
}

function createEstudiante(){
    //leemos inputs y seteamos ID
    //creas element
    addEstudiante(element);
}

function loadEstudianteTable(){
    let array = getEstudiantes();
    for (let e of array) {
        appendElementTable(GLOBAL_KEYS.ESTUDIANTES, e);
    }
}

document.addEventListener("DOMContentLoaded", function(){
    loadEstudianteTable()
});