
const form = document.querySelector('#base-form');
const democlassform = 'form-head'
// let cities = [];
let formGroup = document.querySelector('.form-group');
let firstHeading = document.getElementById('first-heading');
// var selection = document.getElementById('selection');
//Global Variables
//1.distanceMatrix,2.cities,3.counter,4.citiesObject


loadEventListeners();

function loadEventListeners(){

    form.addEventListener('submit',getValue);

}

function getValue(e){

    window.distanceMatrix = [];
    window.cities = form.firstElementChild.value.split(',');
    e.preventDefault();
    form.remove();
    window.cityLength = cities.length;
    loadMatrix(window.cityLength);
    window.inf = 11111;
    createSource(inf);
    
}

function loadMatrix(len) {
    for (var i = 0; i < len; i++) {
        distanceMatrix.push([]);
    }

    for (var i = 0; i < len; i++) {
        for (var j = 0; j < len; j++) {
            distanceMatrix[i][j] = 0;
        }
    }
}





function createSource() {

    var selectionForm = document.getElementById('selection-form');
    // console.log(selectionForm);

    let firstHeading = document.getElementById('first-heading');
    firstHeading.textContent = "Choose Your Source";
    var selection = document.createElement('select');
    var sub = document.createElement('input');
    selection.id = 'selection';
    for (i = 0; i < cityLength; i++) {

        sourceOption = document.createElement('option');
        sourceOption.id = `option${cities[i]}`;
        sourceOption.value = `${cities[i]}`;
        sourceOption.textContent = `${cities[i]}`
        selection.appendChild(sourceOption);
    }
    sub.type = 'submit';
    sub.value = 'Submit';

    selectionForm.appendChild(selection);
    selectionForm.appendChild(sub);
    // console.log(selectionForm);

    document.body.appendChild(selectionForm);
    chooseSource();
}



function chooseSource() {
    var selectionForm = document.getElementById('selection-form');
    // console.log(selectionForm);

    selectionForm.addEventListener('submit', (e) => {
        var optionValue = e.target.firstElementChild.value;
        // console.log("The Input Matrix Formed");
        // console.log(distanceMatrix);
        // console.log(optionValue);
        e.preventDefault();
        removeForm();
        cities = modifyCities(cities,optionValue);
        // console.log(cities);
        
        getDistances(cities);

    });

}

function removeForm(){

    var selectionForm = document.getElementById('selection-form');
    selectionForm.remove();

}
function modifyCities(cities,source){

    var temp = []
    // console.log(source);
    
    for (var i = 0; i < cityLength; i++) {
        if (cities[i] === source)
            continue;
        else
            temp[i] = cities[i];

    }
    temp.unshift(source);
    temp = temp.filter(function (e) { return e != null; });
    // console.log(temp);
    
    return temp;

}

function getDistances(cities){
    cityLength = cities.lenght;
    window.counter = 1;

    let firstHeading = document.getElementById('first-heading');
    firstHeading.textContent = 'Enter The Respective City Distances Leave a 0 if two cities are not connected';
    for(var i=0;i<cities.length;i++){
        for(j=i+1;j<cities.length;j++){
            distanceForm = document.createElement('form');
            distanceForm.className = democlassform;
            distanceForm.id = `${counter}`;
            currentCities = document.createTextNode(`Enter The distance between ${cities[i]} and ${cities[j]} `);
            currentCityDistance = document.createElement('input');
            currentCityDistance.type = 'number';
            sub = document.createElement('input');
            sub.type = 'submit';
            distanceForm.appendChild(currentCities);
            distanceForm.appendChild(currentCityDistance);
            distanceForm.appendChild(sub);

            formGroup.appendChild(distanceForm);
            counter+=1;
           


        }
    }
    
    saveDistance();
}

function saveDistance(){
    window.citiesObject = {};
    formGroup.addEventListener('submit',(e)=>{
        if(e.target.children[0].value === ''){
            alert('Value Missing');
        
        }
        else{
            citiesObject[`${e.target.id}`] = e.target.children[0].value;
            e.target.remove();
        }
        
        if(citiesObject[counter-1] === undefined){
            console.log("Something Still Missing");
            
        }
        else{
            firstHeading.textContent = 'Choose The Source Now:-';
            formMatrix();
        }
        
        e.preventDefault();
    });
    

}


function formMatrix() {
    console.log(`Cities According to your input, Source is ${cities[0]}`)
    console.log(cities);
    let ctr = 1;
    for(var i=0;i<cities.length;i++){
        for(var j=i+1;j<cities.length;j++){

                distanceMatrix[i][j] = Number(citiesObject[ctr]);
                distanceMatrix[j][i] = Number(citiesObject[ctr]);
                ctr++;
                // console.log(distanceMatrix);
                
            }
        }
        // console.log(distanceMatrix);
        
        for(var i=0;i<cities.length;i++){
            for(var j=0;j<cities.length;j++){
                if(i===j)
                    continue;
                
                else if(distanceMatrix[i][j] === 0){
                    distanceMatrix[i][j] = inf;
                }
            }
        }
    console.log("The Graph is (According to your input:-")
    console.log(distanceMatrix);

    calculate(distanceMatrix,cities.length,inf,0);
    
}


function calculate(distanceMatrix, noOfCities, inf, source) {

    //Cretae A PropagTION mATRIX for Maintainance
    let propagationMatrix = [];
    let visited = [];
    for (var i = 0; i < noOfCities; i++) {
        propagationMatrix.push([]);
        for (var j = 0; j < 3; j++) {
            propagationMatrix[i][j] = 0;
        }

    }
    //Fill the Propagation Matrix;
    //Filling the second column where stays shortest path from each vertices
    j = 1;
    for (var i = 0; i < noOfCities; i++) {
        if (i === 0) {
            propagationMatrix[i][j] = 0;
        }
        else {
            propagationMatrix[i][j] = inf
        }
    }

    //Filling the first column where each vertices stay
    j = 0;
    for (var i = 0; i < noOfCities; i++) {
            propagationMatrix[i][j] = i;
    }

    //Filling the unvisited Array such that every vertices is unvisited

    //Filling Done


    let currentPos = source;
    let totalDistance = 0;
    let shortest;
    for (var i = 0; i < noOfCities; i++) {

        let minimum = inf + 1;
        for (var j = 0; j < noOfCities; j++) {

            if (currentPos === j)
                continue;
            else if (distanceMatrix[currentPos][j] === inf)
                continue;
            else if (visited.includes(j))
                continue;
            else if (j === 0)
                continue;
            else if (propagationMatrix[j][1] > totalDistance + distanceMatrix[currentPos][j]) {
                propagationMatrix[j][1] = totalDistance + distanceMatrix[currentPos][j];
                propagationMatrix[j][2] = currentPos;

            }
            if (distanceMatrix[currentPos][j] < minimum) {
                minimum = distanceMatrix[currentPos][j];
                shortest = j;
            }
        }
        visited.push(currentPos);
        totalDistance += minimum;
        currentPos = shortest;

    }
    console.log('The Solution Matrix:-');
    console.log(propagationMatrix);
    console.log("First Column indicates the cityIndexes, second Column indicates shortest distance between source to that city")
    
    putResults(propagationMatrix,inf,source);
    // console.log(visited);


} 

function putResults(propagationMatrix,inf,source){
    // console.log(propagationMatrix);
    
    let firstHeading = document.getElementById('first-heading');
    firstHeading.textContent = 'Result Of your Graph is:-'
    var results = document.getElementById('showresults');
    for(var i=1;i<cities.length;i++){
        var currentNode = propagationMatrix[i][0];
        var currentCity = cities[currentNode];
        var currentResult = propagationMatrix[i][1];
        var tcon = document.createTextNode(' ');
        if(currentResult === inf){
            tcon.textContent = `Distance between ${cities[source]} to ${currentCity} is very Huge we considered it as Infinity`;
        }
        else{
            tcon.textContent = `Shortest Distance Between ${cities[source]} and ${currentCity} is ${currentResult}`;
        }
        var br = document.createElement('br')
        results.appendChild(tcon); 
        results.appendChild(br);
    }
    reloader();

}
function reloader(){

    var results = document.getElementById('showresults');
    var btn = document.createElement('button');
    btn.innerText = 'Go TO Home';
    btn.id = 'reloader';
    results.appendChild(btn);
    reloader = document.getElementById('reloader');
    reloader.addEventListener('click', (e) => {
        window.location.reload();

    });

}
