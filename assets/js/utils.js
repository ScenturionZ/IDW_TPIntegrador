void function readTextFile(file, callback) {
    let rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

function getJSON(key){
    return JSON.parse(localStorage.getItem(key));
}

function removeItem(key, id){
    let array = getJSON(key);
    let element = array.find(item => item.id == id);
    let index = array.indexOf(element);
    if(index > -1){
        array.splice(index, 1);
    }
    localStorage.setItem(key,JSON.stringify(array));
}

function addItem(key, element){
    let array = getJSON(key);
    array.push(element);
    localStorage.setItem(key, JSON.stringify(array));
}

function generateId(key){
    //TODO 
    //recorrer array, buscar mayor id y sumarle 1
    //retornar ID
}
