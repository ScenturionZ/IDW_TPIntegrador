//MODAL
if(document.getElementById("inscripcionTablaModal")){
    var inscripcionTablaModal = bootstrap.Modal.getOrCreateInstance(document.getElementById("inscripcionTablaModal"));
}

if(document.getElementById("inscripcionModal")){
    var inscripcionModal = bootstrap.Modal.getOrCreateInstance(document.getElementById("inscripcionModal"));
}

function loadInscripcionEstadoMateriaTable(carreraId){
    let cuatriCheck = 2;
    let id = document.getElementById("inscripcionEstudianteId").value;
    let tablaInsc = document.getElementById("tablaInscripcionMateria");
    let tableBody = tablaInsc.getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';
    if(document.getElementById("check-cuatrimestre").checked){
        cuatriCheck = 1;
    }
    for(let m of getMaterias()){
        if(m.cuatrimestre == cuatriCheck && m.id_carrera == carreraId){
            let row = tableBody.insertRow(-1);
            row.insertCell(-1).innerHTML = m.nombre;
            if(checkMateriasInscriptas(m.id, id)){
                let estadoCell = row.insertCell(-1);
                estadoCell.innerHTML = "INSCRIPTO";
                estadoCell.classList.add("table-success");
                let accionCell = row.insertCell(-1);
                accionCell.innerHTML = '<button type="button" class="btn delete-inscription btn-outline-danger rounded-pill" id="materia-' + id + '-' + m.id +'">Eliminar</button>';
            }else{
                let estadoCell = row.insertCell(-1);
                estadoCell.innerHTML = "NO INSCRIPTO";
                estadoCell.classList.add("table-danger");
                let accionCell = row.insertCell(-1);
                accionCell.innerHTML = '<button type="button" class="btn create-inscription btn-outline-info rounded-pill" id="materia-' + id + '-' + m.id +'">Inscribirse</button>';
            }
        }
    }
}

function loadInscripcionEstadoMateria(){
    let carreraId = document.getElementById("inscripcionCarrera").value;
    if(carreraId == 0){
        let tablaInsc = document.getElementById("tablaInscripcionMateria");
        let tableBody = tablaInsc.getElementsByTagName('tbody')[0];
        tableBody.innerHTML = '';
        let id = document.getElementById("inscripcionEstudianteId").value;
        let voidOption = '<option selected disabled value="0">Seleccione una carrera</option>';
        let selectCarrera = document.getElementById("inscripcionCarrera");
        let html = '';
        for(c of getInscripcionesCarreras()){
            if(c.estudiante_id == id){
                html += '<option value="' + c.carrera_id + '">' + getCarreraById(c.carrera_id).nombre + '</option>';
            }
        }
        selectCarrera.innerHTML = voidOption + html;
    }else{
        loadInscripcionEstadoMateriaTable(carreraId);
    }    
}

function loadInscripcionEstadoCarrera(){
    let tablaInsc = document.getElementById("tablaInscripcionCarrera");
    let tableBody = tablaInsc.getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';
    let id = document.getElementById("inscripcionEstudianteId").value;
    for(let c of getCarreras()){
        let row = tableBody.insertRow(-1);
        row.insertCell(-1).innerHTML = c.nombre;
        if(checkCarreraInscriptas(c.id, id)){
            let estadoCell = row.insertCell(-1);
            estadoCell.innerHTML = "INSCRIPTO";
            estadoCell.classList.add("table-success");
            let accionCell = row.insertCell(-1);
            accionCell.innerHTML = '<button type="button" class="btn delete-inscription btn-outline-danger rounded-pill" id="carrera-' + id + '-' + c.id +'">Eliminar</button>';
        }else{
            let estadoCell = row.insertCell(-1);
            estadoCell.innerHTML = "NO INSCRIPTO";
            estadoCell.classList.add("table-danger");
            let accionCell = row.insertCell(-1);
            accionCell.innerHTML = '<button type="button" class="btn create-inscription btn-outline-info rounded-pill" id="carrera-' + id + '-' + c.id +'">Inscribirse</button>';
        }
    }
}

//FUNCTIONS
function checkMateriasInscriptas(materiaId, estudianteId){
    let array = getInscripcionesMaterias();
    return array.find(i => i.materia_id == materiaId && i.estudiante_id == estudianteId);
}

function checkCarreraInscriptas(carreraId, estudianteId){
    let array = getInscripcionesCarreras();
    return array.find(i => i.carrera_id == carreraId && i.estudiante_id == estudianteId);
}

function addEstudiante(element){
    addItem(element);
}

function getNameEstudianteById(id){
    let estudiante = getElementById(id);
    return estudiante.nombre + ' ' + estudiante.apellido;
}

//OVERRIDES
getVoidElement = function(){
    return {
        id : 0,
        nombre : '',
        apellido : '',
        dni : '',
        email : '',
        telefono: 0,
        nacionalidad: '',
        nacimiento: '',
    }
}

loadElementTable = function (){
    getTable().getElementsByTagName('tbody')[0].innerHTML = '';
    let array = getEstudiantes();
    if(array == null){
        readJSON(GLOBAL_VALUES.ESTUDIANTES_JSON, function(text){
            let estudiantes = JSON.parse(text);
            setJSON(estudiantes);
            for (let e of getEstudiantes()) {
                appendElementTable(e);
            }
        });
    }else{
        for (let e of array) {
            appendElementTable(e);
        }
    }
}

getElementById = function (id){
    return getEstudianteById(id);
}

removeElementById = function(id){
    let inscripcionesM = getInscripcionesMaterias();
    let inscripcionesC = getInscripcionesCarreras();
    let removeList = [];
    for (let i of inscripcionesM) {
        if(i.estudiante_id == id){
            removeList.push(i);
        }
    }

    for (let r of removeList) {
        inscripcionesM.splice(inscripcionesM.indexOf(r), 1);
    }
    
    removeList = [];
    for (let i of inscripcionesC) {
        if(i.estudiante_id == id){
            removeList.push(i);
        }
    }

    for (let r of removeList) {
        inscripcionesC.splice(inscripcionesC.indexOf(r), 1);
    }

    localStorage.setItem(GLOBAL_KEYS.INSCRIPCIONES_MATERIAS, JSON.stringify(inscripcionesM));
    localStorage.setItem(GLOBAL_KEYS.INSCRIPCIONES_CARRERAS, JSON.stringify(inscripcionesC));
    removeItem(id);
}

getTitleElementModal = function(id){
    let value = 'Nuevo estudiante'
    if(id !== 0){
        value = 'Editar a ' + getNameEstudianteById(id);
    }
    return value;
}

setElementNameDelete = function(id){
    document.getElementById("estudianteName").innerHTML = getNameEstudianteById(id);
}

//EVENTS
document.addEventListener("DOMContentLoaded", function(){
    globalKey = GLOBAL_KEYS.ESTUDIANTES;
    loadElementTable();
});

document.getElementById("tablaEstudiantes").addEventListener('click', (e) => {
    if(e.target && e.target.tagName == 'BUTTON'){
        if(e.target.classList.contains("inscripcion")){
            let id = e.target.id.replace("inscripcion-", "");
            document.getElementById("inscripcionEstudianteId").value = id;
            document.getElementById("inscripcionCarrera").value = 0;
            loadInscripcionEstadoMateria();
            loadInscripcionEstadoCarrera();
            inscripcionTablaModal.show();
        }
    }
});

document.getElementById("cheksCuatrimestres").addEventListener('click', (e) => {
    if(e.target && e.target.tagName == 'INPUT'){
        let id = document.getElementById("inscripcionCarrera").value;
        loadInscripcionEstadoMateriaTable(id);
    }else if(e.target && e.target.tagName == 'SELECT' && e.target.value != 0){
        loadInscripcionEstadoMateriaTable(e.target.value);
    }
});

document.getElementById("myTabContent").addEventListener('click', (e) => {
    if(e.target && e.target.tagName == 'BUTTON'){
        let titleModal = document.getElementById("inscripcionModalLabel");
        let bodyModal = document.getElementById("inscripcionBody");
        let title = "";
        let body = "";
        let data = e.target.id.split("-");
        let alumnoName = getNameEstudianteById(data[1]);
        document.getElementById("inscripcionMateriaId").value = 0;
        document.getElementById("inscripcionCarreraId").value = 0;
        if(e.target.classList.contains("create-inscription")){
            title = "Dar de alta";
            body = 'dar de alta a <span class="fw-bold">' + alumnoName + '</span> en la ';
        }else{
            title = "Dar de baja";
            body = "dar de baja a " + alumnoName + " de la ";
        }
        if(data[0] == "materia"){
            body += 'materia <span class="fw-bolder">' + getMateriaById(data[2]).nombre + '</span>';
            document.getElementById("inscripcionMateriaId").value = data[2];
        }else{
            body += 'carrera <span class="fw-bold">' + getCarreraById(data[2]).nombre + '</span>';
            document.getElementById("inscripcionCarreraId").value = data[2];
        }
        bodyModal.innerHTML = body;
        titleModal.innerHTML = title;
        inscripcionModal.show();
    }
});

if(document.getElementById("inscripcionModalButton")){
    document.getElementById("inscripcionModalButton").addEventListener("click", function(){
        let estudianteId = Number(document.getElementById("inscripcionEstudianteId").value);
        let inscripcionId = 0;
        let array = [];
        let element;
        let key = "";
        if(document.getElementById("inscripcionMateriaId").value != 0){
            inscripcionId = Number(document.getElementById("inscripcionMateriaId").value);
            array = getInscripcionesMaterias();
            key = GLOBAL_KEYS.INSCRIPCIONES_MATERIAS;
            element = array.find(inc => inc.materiaId == inscripcionId && inc.estudiante_id == estudianteId);
        }else{
            inscripcionId = Number(document.getElementById("inscripcionCarreraId").value);
            array = getInscripcionesCarreras();
            element = array.find(inc => inc.carrera_id == inscripcionId && inc.estudiante_id == estudianteId);
            key = GLOBAL_KEYS.INSCRIPCIONES_CARRERAS;
        }

        let index = array.indexOf(element);
        if(element != undefined && index > -1){
            array.splice(index, 1);
            if(key == GLOBAL_KEYS.INSCRIPCIONES_CARRERAS){
                let inscripcionesC = getInscripcionesMaterias();
                let removeList = [];
                for (let i of inscripcionesC) {
                    if(i.estudiante_id == estudianteId && getMateriaById(i.materia_id).id_carrera == element.carrera_id){
                        removeList.push(i);
                    }
                }

                for (let r of removeList) {
                    inscripcionesC.splice(inscripcionesC.indexOf(r), 1);
                }

                localStorage.setItem(GLOBAL_KEYS.INSCRIPCIONES_MATERIAS, JSON.stringify(inscripcionesC));
                document.getElementById("inscripcionCarrera").value = 0;
            }
        }else{
            if(key == GLOBAL_KEYS.INSCRIPCIONES_MATERIAS){
                element = {
                    estudiante_id : estudianteId,
                    materia_id : inscripcionId
                };
            }else{
                element = {
                    estudiante_id : estudianteId,
                    carrera_id : inscripcionId
                };
                document.getElementById("inscripcionCarrera").value = 0;
            }
            array.push(element);
        }

        localStorage.setItem(key, JSON.stringify(array));
        loadInscripcionEstadoMateria();
        loadInscripcionEstadoCarrera();
    });
}