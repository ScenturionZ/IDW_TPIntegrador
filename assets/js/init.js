document.addEventListener("DOMContentLoaded", function(){
    if(localStorage.getItem(GLOBAL_KEYS.ESTUDIANTES) == null && globalKey == ""){
        globalKey = GLOBAL_KEYS.ESTUDIANTES;
        readJSON(GLOBAL_VALUES.ESTUDIANTES_JSON, function(text){
            if(globalKey == GLOBAL_KEYS.ESTUDIANTES){
                let estudiantes = JSON.parse(text);
                setJSON(estudiantes);
            }
        });
    }

    if(localStorage.getItem(GLOBAL_KEYS.CARRERAS) == null && globalKey == ""){
        globalKey = GLOBAL_KEYS.CARRERAS;
        readJSON(GLOBAL_VALUES.CARRERAS_JSON, function(text){
            if(globalKey == GLOBAL_KEYS.CARRERAS){
                let carreras = JSON.parse(text);
                setJSON(carreras);
            }
        });
    }

    if(localStorage.getItem(GLOBAL_KEYS.MATERIAS) == null && globalKey == ""){
        globalKey = GLOBAL_KEYS.MATERIAS;
        readJSON(GLOBAL_VALUES.MATERIAS_JSON, function(text){
            if(globalKey == GLOBAL_KEYS.MATERIAS){
                let materias = JSON.parse(text);
                setJSON(materias);
            }
        });
    }
    
});