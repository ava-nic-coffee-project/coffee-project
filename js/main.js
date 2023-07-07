"use strict"

function renderCoffee(coffee) {
    let html = '<div class="coffee-card">';
    if(coffee.roast === 'light'){
        html += '<img src="../img/light-roast.jpeg" alt="light roast">'
    } else if(coffee.roast === 'medium'){
        html += '<img src="../img/medium-roast.jpeg" alt="medium roast">'
    }else if(coffee.roast === 'dark') {
        html += '<img src="../img/dark-roast.jpeg" alt="dark roast">'
    }
    html += '<h3 class="coffee-name">' + coffee.name + '</h3>';
    html += '<p class="coffee-roast">' + coffee.roast + '</p>';
    html += '</div>';
    return html;
}

function ghostFloat(){
    let html = '<div class="ghost" id="ghost">';
    html += '<img class="ghost-img" src="../img/cute-ghost.png" alt="cute ghost">'
    html += '</div>';
    return html;
}

function renderCoffees(coffees) {
    let html = '';
    for (let i = 0; i < coffees.length; i++) {
        html += renderCoffee(coffees[i]);
    }
    return html;
}

function updateCoffees(e) {
    e.preventDefault(); // don't submit the form, we just want to update the data
    let selectedRoast = roastSelection.value;
    let filteredCoffees = [];
    coffees.forEach(function (coffee) {
        if (coffee.roast === selectedRoast) {
            filteredCoffees.push(coffee);
        } else if(selectedRoast === 'all'){
            filteredCoffees.push(coffee);
        }
    });
    mainContent.innerHTML = renderCoffees(filteredCoffees);
}

function searchCoffeeByName(e) {
    e.preventDefault();
    let searchedCoffee = searchBox.value.toLowerCase();
    let filteredCoffeeName = [];
    coffees.forEach(function (coffee) {
        if (coffee.name.toLowerCase().includes(searchedCoffee)) {
            filteredCoffeeName.push(coffee);
        }
    });
    mainContent.innerHTML = renderCoffees(filteredCoffeeName);
}

function addCoffee (e) {
    e.preventDefault();
    let newCoffee = {id: (coffees.length + 1), name: addCoffeeName.value, roast: addCoffeeRoast.value};
    coffees.push(newCoffee);
    mainContent.innerHTML = renderCoffees(coffees);
    localStorage.setItem('coffeeStorage', JSON.stringify(coffees));
    alert(`Adding ${newCoffee.name} to coffee list!`)
}

// NR function to reload default page
function resetCoffees() {
    coffees = coffeesDefaultBackUp;
    localStorage.setItem('coffeeStorage', JSON.stringify(coffees));
    alert('Coffees reset to default!');
    location.reload();
}


// from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
let coffees = [
    {id: 1, name: 'Pumpkin Spice Latte', roast: 'light'},
    {id: 2, name: 'Monster Mash Macchiato', roast: 'light'},
    {id: 3, name: 'London Fog Latte', roast: 'light'},
    {id: 4, name: 'Spider Eye Latte', roast: 'medium'},
    {id: 5, name: 'Beetlejuice Macchiato', roast: 'medium'},
    {id: 6, name: 'Boogie Man Cappuccino', roast: 'medium'},
    {id: 7, name: 'Witches Brew Latte', roast: 'dark'},
    {id: 8, name: 'Frankenstein Cappuccino', roast: 'dark'},
    {id: 9, name: 'Morticia Macchiato', roast: 'dark'},
    {id: 10, name: 'Poltergeist Cappuccino', roast: 'dark'},
    {id: 11, name: 'Lycanthropy Latte', roast: 'dark'},
    {id: 12, name: 'Moon Macchiato', roast: 'dark'},
    {id: 13, name: 'Hocus Pocus Cappuccino', roast: 'dark'},
    {id: 14, name: 'Bones Latte', roast: 'dark'},
];

let coffeesDefaultBackUp = coffees;
coffees = JSON.parse(localStorage.getItem('coffeeStorage'));

let mainContent = document.querySelector('#coffees');
let submitButton = document.querySelector('#submit');
let roastSelection = document.querySelector('#roast-selection');
let searchBox = document.querySelector('#search-box');
let addCoffeeRoast = document.querySelector('#add-coffee-roast');
let addCoffeeName = document.querySelector('#add-coffee-name');
let addButton = document.querySelector('#add-btn');
let ghostImg = document.querySelector('#ghost');
let title = document.querySelector('#title');

mainContent.innerHTML = renderCoffees(coffees);
ghostImg.innerHTML = ghostFloat();

submitButton.addEventListener('click', updateCoffees);
document.addEventListener('keydown', (event) => {
    let keyCode = event.code;
    if(keyCode === 'Enter'){
        updateCoffees();
    }
});
searchBox.addEventListener('input', searchCoffeeByName);
addButton.addEventListener('click', addCoffee);

// NR - variable for reset button
let resetButton = document.querySelector('#reset')

// NR listener for reset button
resetButton.addEventListener('click', resetCoffees);

title.addEventListener('click', ghostFloat);