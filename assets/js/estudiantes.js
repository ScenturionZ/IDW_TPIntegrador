function getAlumnos(){
    return getJSON("estudiantes");
}

function removeAlumno(id){
    removeItem("estudiantes",id)
}

function addEstudiante(element){
    addItem("estudiantes",element);
}

function createEstudiante(){
    //leemos inputs y seteamos ID
    //creas element
    addEstudiante(element);
}

