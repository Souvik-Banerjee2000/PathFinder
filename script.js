
const form = document.querySelector('#base-form');
const democlassform = 'form-head'
// let cities = [];
let formGroup = document.querySelector('.form-group');
let firstHeading = document.getElementById('first-heading');
// var selection = document.getElementById('selection');
//Global Variables
//1.distanceMatrix,2.cityLength,3.counter,4.citiesObject


loadEventListeners();

function loadEventListeners(){

    form.addEventListener('submit',getValue);

}

function getValue(e){
    window.distanceMatrix = [];
    window.cities = form.firstElementChild.value.split(',');
    e.preventDefault();
    form.remove();
    firstHeading.textContent = 'Enter The Respective City Distances Leave a 0 if two cities are not connected';
    getDistances(cities);
    window.cityLength = cities.length;
    loadMatrix(window.cityLength);
    
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




function getDistances(cities){
    cityLength = cities.lenght;
    window.counter = 1;
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
    let ctr = 1;
    for(var i=0;i<window.cityLength;i++){
        for(var j=i+1;j<window.cityLength;j++){

                distanceMatrix[i][j] = Number(citiesObject[ctr]);
                distanceMatrix[j][i] = Number(citiesObject[ctr]);
                ctr++;

                
            }
        }
        // console.log(distanceMatrix);
        window.inf = 11111;
        for(var i=0;i<cityLength;i++){
            for(var j=0;j<cityLength;j++){
                if(i===j)
                    continue;
                
                else if(distanceMatrix[i][j] === 0){
                    distanceMatrix[i][j] = inf;
                }
            }
        }

    // console.log(distanceMatrix);
    // calculate(distanceMatrix,cityLength,inf);
    createSource(inf);
}

function createSource(){

    var selectionForm = document.getElementById('selection-form');
    // console.log(selectionForm);
    
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

function chooseSource(){
    var selectionForm = document.getElementById('selection-form');
    // console.log(selectionForm);
    
    selectionForm.addEventListener('submit',(e)=>{
    var optionValue = e.target.firstElementChild.value;
    // console.log(cities.indexOf(optionValue));
    console.log("The Input Matrix Formed");
    console.log(distanceMatrix);
    
        removeFormAndCallCalculate(distanceMatrix, cityLength, inf, cities.indexOf(optionValue))
        e.preventDefault();
        
    })
}

function removeFormAndCallCalculate(distanceMatrix, cityLength, inf,source){

    var selectionForm = document.getElementById('selection-form');
    selectionForm.remove();
    calculate(distanceMatrix, cityLength, inf, source);
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
        if (i === 0)
            propagationMatrix[i][j] = source;
        else if (i === source)
            continue;
        else
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

    let firstHeading = document.getElementById('first-heading');
    firstHeading.textContent = 'Result Of your Graph is:-'
    var results = document.getElementById('showresults');
    for(var i=1;i<cityLength;i++){
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
}
