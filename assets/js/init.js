document.addEventListener("DOMContentLoaded", function() {
    if(localStorage.getItem("alumnos") == null){
        readTextFile("./assets/json/alumnos.json", function(text){
            localStorage.setItem("alumnos", text)
        });
    }
});