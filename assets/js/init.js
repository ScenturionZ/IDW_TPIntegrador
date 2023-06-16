document.addEventListener("DOMContentLoaded", function(){
    if(localStorage.getItem(GLOBAL_KEYS.ESTUDIANTES) == null){
        readJSON(GLOBAL_VALUES.ESTUDIANTES_JSON, function(text){
            let estudiantes = JSON.parse(text);
            estudiantes.sort(function(a, b){ 
                return a.id - b.id;
            });
            localStorage.setItem(GLOBAL_KEYS.ESTUDIANTES, JSON.stringify(estudiantes));
        });
    }

    if(localStorage.getItem(GLOBAL_KEYS.CARRERAS) == null){
        readJSON(GLOBAL_VALUES.CARRERAS_JSON, function(text){
            let carreras = JSON.parse(text);
            carreras.sort(function(a, b){ 
                return a.id - b.id;
            });
            localStorage.setItem(GLOBAL_KEYS.CARRERAS, JSON.stringify(carreras));
        });
    }

    if(localStorage.getItem(GLOBAL_KEYS.MATERIAS) == null){
        readJSON(GLOBAL_VALUES.MATERIAS_JSON, function(text){
            let materias = JSON.parse(text);
            materias.sort(function(a, b){ 
                return a.id - b.id;
            });
            localStorage.setItem(GLOBAL_KEYS.MATERIAS, JSON.stringify(materias));
        });
    }

    if(localStorage.getItem(GLOBAL_KEYS.INSCRIPCIONES_CARRERAS) == null){
        localStorage.setItem(GLOBAL_KEYS.INSCRIPCIONES_CARRERAS, JSON.stringify([]));
    }
    
    if(localStorage.getItem(GLOBAL_KEYS.INSCRIPCIONES_MATERIAS) == null){
        localStorage.setItem(GLOBAL_KEYS.INSCRIPCIONES_MATERIAS, JSON.stringify([]));
    }
});