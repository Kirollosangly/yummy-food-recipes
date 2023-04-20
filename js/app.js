let navBarW = $('#navBarList').innerWidth();

$(window).on('load', ()=>{
    $('#navBar').animate({ left: `-${navBarW}px` }, 500);
    $('#bars').addClass('d-block');
    $('#bars').removeClass('d-none');
    $('#xmark').addClass('d-none');
})

$('#navBtn').click(() => {
    $('li').slideToggle(800);
    if ($('#navBar').css('left') === `0px`) {
        $('#navBar').animate({ left: `-${navBarW}px` }, 500);
        $('#bars').addClass('d-block');
        $('#bars').removeClass('d-none');
        $('#xmark').addClass('d-none');
    } else {
        $('#navBar').animate({ left: `0px` }, 500);
        $('#xmark').addClass('d-block');
        $('#xmark').removeClass('d-none');
        $('#bars').addClass('d-none');
    }
});

/* *** *** *** */
let mainRow = document.getElementById('cat-row');
let searchRow;
let searchID;
let searchContainer = [];
let mainContainer = [];
let mealsContainer = [];
let submealsCon = [];
let areaContainer = [];
let subAreaCon =[];
let ingreContainer = [];
let subIngreCon = [];
let recipeContainer =[];
let nameBool = false;
let emailBool = false;
let phoneBool = false;
let ageBool = false;
let passBool = false;
let rePassBool = false;

$(document).ready(()=> {
    $('#loadPage').fadeOut(800);
});

$('#search').click(()=> {
    $('#loadPage').fadeIn(50); 
    navClose();
    mainRow.innerHTML = `
    <div class="col-md-6">
        <input id="searchByName" oninput="searchByName(this.value)" class="form-control form-control-lg bg-black text-white" type="text" placeholder="Search by Name">
    </div>
    <div class="col-md-6">
        <input id="searchByLetter" oninput="searchByLetter(this.value)" maxlength="1" class="form-control form-control-lg bg-black text-white" type="text" placeholder="Search by First Letter">
    </div>
    <div class="container">
        <div id="search-row" class="row py-5">
        </div>
    </div>
    `;
    searchID = document.getElementById('searchByName');
    searchRow = document.getElementById('search-row');
    $('#loadPage').fadeOut(1000);
});

/* Search by First Letter */
async function searchByLetter(letter) {
    searchRow.innerHTML = ``;
    searchContainer = [];
    let searchLetter = await fetch (`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
    let letterResult = await searchLetter.json();
    searchContainer.push(letterResult);
    // console.log(searchContainer[0]);
    displaySearchName(searchContainer[0]);
    function getID() {
        document.querySelectorAll('.cardCon').forEach((card) => {
            card.addEventListener('click', () => {
                let id = card.dataset.id;
                getmeal(id);
            });
        });
    };
    getID();
};

/* Search by Name */
async function searchByName(name){
    searchRow.innerHTML = ``;
    searchContainer = [];
    let searchName = await fetch (`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
    let searchResult= await searchName.json();
    searchContainer.push(searchResult);
    // console.log(searchContainer[0].meals[0].idMeal);
    displaySearchName(searchContainer[0]);
    function getID() {
        document.querySelectorAll('.cardCon').forEach((card) => {
            card.addEventListener('click', () => {
                let id = card.dataset.id;
                getmeal(id);
            });
        });
    };
    getID();
};

function displaySearchName(container) {
    $('#loadPage').fadeIn(50);
    let cup = ``;
    for (let i = 0; i < container.meals.length; i++) {
        cup += `
        <div data-id="${container.meals[i].idMeal}" class="cardCon col-6 col-md-4 col-lg-3 p-2 rounded-2">
            <div class="crd inner-crd rounded-2 position-relative">
                <img class="w-100 rounded-2" src="${container.meals[i].strMealThumb}">
                <div class="crd-content text-center rounded-2 px-1 d-flex justify-content-start align-items-center overflow-hidden">
                    <h2 class="fw-semibold">${container.meals[i].strMeal}</h2>
                </div>
            </div>
        </div> 
        `
    }
    searchRow.innerHTML = cup;
    $('#loadPage').fadeOut(1000);
};

async function getmeal(id) {
    recipeContainer = [];
    let singlemeal = await fetch (`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    let getrec = await singlemeal.json();
    recipeContainer.push(getrec);
    console.log(recipeContainer);
    displayRecipe(recipeContainer[0]);
};

function displayRecipe(container) {
    $('#loadPage').fadeIn(50);
    mainRow.innerHTML = `
    <div id="detailsCon" class="row pt-4 text-white">
    <div class="col-md-4">
        <img src="${container.meals[0].strMealThumb}" class="w-100">
        <h2>${container.meals[0].strMeal}</h2>
    </div>
    <div class="col-md-8 py-4 py-md-0 text-white">
        <h2>Instructions</h2>
        <p class="spacing m-0 my-3 fs-5">
            ${container.meals[0].strInstructions}
        </p>
        <h3 class="m-0 mb-2 p-0">Area: ${container.meals[0].strArea}</h3>
        <h3 class="m-0 my-3 dBtn">Category: <span class="fw-semibold">${container.meals[0].strCategory}</span></h3>
        <div class="recipes">
            <h3 class="m-0 my-3 dBtn">Recipes:</h3>
            <span class="d-inline-block border-2 bg-success-subtle m-1 p-2 rounded-1 text-black">${container.meals[0].strMeasure1}${container.meals[0].strIngredient1}.</span>
            <span class="d-inline-block border-2 bg-success-subtle m-1 p-2 rounded-1 text-black">${container.meals[0].strMeasure2}${container.meals[0].strIngredient2}.</span>
            <span class="d-inline-block border-2 bg-success-subtle m-1 p-2 rounded-1 text-black">${container.meals[0].strMeasure3}${container.meals[0].strIngredient3}.</span>
            <span class="d-inline-block border-2 bg-success-subtle m-1 p-2 rounded-1 text-black">${container.meals[0].strMeasure4}${container.meals[0].strIngredient4}.</span>
            <span class="d-inline-block border-2 bg-success-subtle m-1 p-2 rounded-1 text-black">${container.meals[0].strMeasure5}${container.meals[0].strIngredient5}.</span>
            <span class="d-inline-block border-2 bg-success-subtle m-1 p-2 rounded-1 text-black">${container.meals[0].strMeasure6}${container.meals[0].strIngredient6}.</span>
            <span class="d-inline-block border-2 bg-success-subtle m-1 p-2 rounded-1 text-black">${container.meals[0].strMeasure7}${container.meals[0].strIngredient7}.</span>
        </div>
        <div class="btns my-2">
            <button type="button" class="py-2 px-4 btn btn-outline-success text-white">
                <a href="${container.meals[0].strSource}" class="text-decoration-none text-white">Source</a>
            </button>
            <button type="button" class="py-2 px-4 btn btn-outline-danger text-white">
                <a href="${container.meals[0].strYoutube}" class="text-decoration-none text-white">Youtube</a>
            </button>
        </div>
    </div>
</div>
    `
    $('#loadPage').fadeOut(1000);
};


async function mainPage() {
    let mainMeals = await fetch ('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    let mainMealsCat = await mainMeals.json();
    mainContainer.push(mainMealsCat);
    // console.log(mainContainer[0]);
    displayMainPage(mainContainer[0].meals);
    function getID() {
        document.querySelectorAll('.cardCon').forEach((card) => {
            card.addEventListener('click', () => {
                let id = card.dataset.id
                console.log(id);
                getmeal(id);
            });
        });
    };
    getID();
};
mainPage();
function displayMainPage(container) {
    let cup = ``;
    for (let i = 0; i < container.length; i++) {
        cup += `
        <div data-id="${container[i].idMeal}" class="cardCon col-6 col-md-4 col-lg-3 p-2 rounded-2">
            <div class="crd inner-crd rounded-2 position-relative">
                <img class="w-100 rounded-2" src="${container[i].strMealThumb}">
                <div class="crd-content text-center rounded-2 px-1 d-flex justify-content-start align-items-center overflow-hidden">
                    <h2 class="fw-semibold">${container[i].strMeal}</h2>
                </div>
            </div>
        </div> 
        `
    }
    mainRow.innerHTML = cup;
};


$('#categories').click(()=>{
    $('#loadPage').fadeIn(50); 
    navClose();
    async function getMealCat(){
        let meals = await fetch ('https://www.themealdb.com/api/json/v1/1/categories.php');
        let mealsCat = await meals.json();
        mealsContainer.push(mealsCat);
        // console.log(mealsContainer);
        displayMealsCat(mealsContainer[0].categories);
        function getID() {
            document.querySelectorAll('.cardCon').forEach((card) => {
                card.addEventListener('click', () => {
                    let id = card.dataset.id;
                    console.log(id);
                });
            });
        };
        getID();
    }
    getMealCat();
    $('#loadPage').fadeOut(1000);
});
function displayMealsCat(container) {
    let cup = ``;
    for (let i = 0; i < container.length; i++) {
        cup += `
        <div data-id="${container[i].strCategory}" class="cardCon col-6 col-md-4 col-lg-3 my-2 p-2 rounded-2">
            <div onclick="getMealCat('${container[i].strCategory}')" class="crd inner-crd rounded-2 position-relative">
                <img class="w-100" src="${container[i].strCategoryThumb}">
                <div class="crd-content text-center rounded-2 px-1 d-flex flex-column justify-content-center align-items-center overflow-hidden">
                    <h2 class="fw-semibold">${container[i].strCategory}</h2>
                    <p class="m-0">${container[i].strCategoryDescription.split(" ", 20).join(" ")}</p>
                </div>
            </div>
        </div> 
        `
    }
    mainRow.innerHTML = cup;
};
async function getMealCat(category) {
    $('#loadPage').fadeIn(50); 
    submealsCon = [];
    let mealCategory = await fetch (`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    let mealCategorySon = await mealCategory.json();
    submealsCon.push(mealCategorySon);
    console.log(submealsCon[0].meals.length);
    displayMealsbyCat(submealsCon[0].meals);
    $('#loadPage').fadeOut(1000);
}
function displayMealsbyCat(container) {
    let cup = ``;
    for (let i = 0; i < container.length; i++) {
        cup += `
        <div data-id="${container[i].idMeal}" class="cardCon col-6 col-md-4 col-lg-3 p-2 rounded-2">
            <div onclick="getmeal(${container[i].idMeal})" class="crd inner-crd rounded-2 position-relative">
                <img class="w-100 rounded-2" src="${container[i].strMealThumb}">
                <div class="crd-content text-center rounded-2 px-1 d-flex justify-content-start align-items-center overflow-hidden">
                    <h2 class="fw-semibold">${container[i].strMeal}</h2>
                </div>
            </div>
        </div> 
        `
    }
    mainRow.innerHTML = cup;
};


$('#areas').click(()=>{
    $('#loadPage').fadeIn(50); 
    navClose();
    async function getAreaCat(){
        let areas = await fetch ('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
        let areaCat = await areas.json();
        areaContainer.push(areaCat);
        // console.log(areaContainer);
        console.log(areaContainer[0].meals);
        displayAreaCat(areaContainer[0].meals);
        function getID() {
            document.querySelectorAll('.cardCon').forEach((card) => {
                card.addEventListener('click', () => {
                    let id = card.dataset.id
                    console.log(id);
                });
            });
        };
        getID();
    }
    getAreaCat();
    $('#loadPage').fadeOut(1000);
});

function displayAreaCat(container) {
    let cup = ``;
    for (let i = 0; i < container.length; i++) {
        cup += `
            <div onclick="getAreaMeal('${container[i].strArea}')" data-id="${container[i].strArea}" class="cardCon area-crd col-6 col-md-4 col-lg-3 my-2 p-2 rounded-2 text-center text-white">
                <div class="crd">
                    <i class="fa-solid fa-house-laptop fa-6x"></i>
                    <p class="m-0 fs-2">${container[i].strArea}</p>
                </div>
            </div> 
        `
    }
    mainRow.innerHTML = cup;
};
async function getAreaMeal(category) {
    $('#loadPage').fadeIn(50); 
    subAreaCon = [];
    console.log(category);
    let mealCategory = await fetch (`https://www.themealdb.com/api/json/v1/1/filter.php?a=${category}`);
    let mealCategorySon = await mealCategory.json();
    subAreaCon.push(mealCategorySon);
    console.log(subAreaCon[0].meals.length);
    displayMealsbyCat(subAreaCon[0].meals);
    $('#loadPage').fadeOut(1000);
};


$('#ingredients').click(()=>{
    $('#loadPage').fadeIn(50); 
    navClose();
    async function getIngreCat(){
        let ingre = await fetch ('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
        let ingreCat = await ingre.json();
        ingreContainer.push(ingreCat);
        // console.log(ingreContainer);
        console.log(ingreContainer[0].meals);
        displayIngreCat(ingreContainer[0].meals);
        function getID() {
            document.querySelectorAll('.cardCon').forEach((card) => {
                card.addEventListener('click', () => {
                    let id = card.dataset.id
                    console.log(id);
                });
            });
        };
        getID();
    }
    getIngreCat();
    $('#loadPage').fadeOut(1000);
});
function displayIngreCat(container) {
    let cup = ``;
    for (let i = 0; i < 24; i++) {
        cup += `
        <div onclick="getIngreMeal('${container[i].strIngredient}')" data-id="${container[i].idIngredient}" class="cardCon ingre-crd col-6 col-md-4 col-lg-3 my-2 p-2 rounded-2 text-center text-white">
            <div class="crd">
                <i class="fa-solid fa-drumstick-bite fa-5x m-2"></i>
                <h3>${container[i].strIngredient}</h3>
                <p class="m-0">${container[i].strDescription.split(" ", 20).join(" ")}</p>
            </div>
        </div> 
        `
    }
    mainRow.innerHTML = cup;
};
async function getIngreMeal(category) {
    $('#loadPage').fadeIn(50); 
    subAreaCon = [];
    console.log(category);
    let mealCategory = await fetch (`https://www.themealdb.com/api/json/v1/1/filter.php?i=${category}`);
    let mealCategorySon = await mealCategory.json();
    subAreaCon.push(mealCategorySon);
    console.log(subAreaCon[0].meals.length);
    displayMealsbyCat(subAreaCon[0].meals);
    $('#loadPage').fadeOut(1000);
};



$('#contact').click(()=>{
    $('#loadPage').fadeIn(50); 
    navClose();
    mainRow.innerHTML = `
    <div class="contantUs col-md-6 my-2">
        <input id="NameIn" oninput="ValidateData()" class="form-control form-control-lg" type="text" placeholder="Enter Your Name">
    <p id="nameAlert" class="d-none bg-danger-subtle text-center rounded-2 py-3 my-3">Please Enter a Valid Name</p>
    </div>
    <div class="contantUs col-md-6 my-2">
        <input id="EmailIn" oninput="ValidateData()" class="form-control form-control-lg" type="text" placeholder="Enter Your Email">
        <p id="emailAlert" class="d-none bg-danger-subtle text-center rounded-2 py-3 my-3">Please Enter a Valid Email</p>
    </div>
    <div class="contantUs col-md-6 my-2">
        <input id="PhoneIn" oninput="ValidateData()" class="form-control form-control-lg" type="text" placeholder="Enter Your Phone">
        <p id="phoneAlert" class="d-none bg-danger-subtle text-center rounded-2 py-3 my-3">Please Enter a Valid Phone</p>
    </div>
    <div class="contantUs col-md-6 my-2">
        <input id="AgeIn" oninput="ValidateData()" class="form-control form-control-lg" type="text" placeholder="Enter Your Age">
        <p id="ageAlert" class="d-none bg-danger-subtle text-center rounded-2 py-3 my-3">Please Enter a Valid Age</p>
    </div>
    <div class="contantUs col-md-6 my-2">
        <input id="PassIn" oninput="ValidateData()" class="form-control form-control-lg" type="text" placeholder="Enter Your Password">
        <p id="passAlert" class="d-none bg-danger-subtle text-center rounded-2 py-3 my-3">Please Enter a Valid Password</p>
    </div>
    <div class="contantUs col-md-6 my-2">
        <input id="RePassIn" oninput="ValidateData()" class="form-control form-control-lg" type="text" placeholder="Re-enter Your Password">
        <p id="rePassAlert" class="d-none bg-danger-subtle text-center rounded-2 py-3 my-3">Password Doesn't Match, Please re-enter</p>
    </div>
    <div class="col-12 text-center my-5">
        <button id="Submit" disabled class="btn btn-outline-danger py-2 px-5">Submit</button>
    </div>
`
submitBtn = document.getElementById("Submit");

document.getElementById("NameIn").addEventListener("focus", () => {nameBool = true});
document.getElementById("EmailIn").addEventListener("focus", () => {emailBool = true});
document.getElementById("PhoneIn").addEventListener("focus", () => {phoneBool = true});
document.getElementById("AgeIn").addEventListener("focus", () => {ageBool = true});
document.getElementById("PassIn").addEventListener("focus", () => {passBool = true});
document.getElementById("RePassIn").addEventListener("focus", () => {rePassBool = true});
$('#loadPage').fadeOut(1000);
});
function ValidateData() {
    if (nameBool) {
        if (regexName()) {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none")
        } else {document.getElementById("nameAlert").classList.replace("d-none", "d-block")}
    }
    if (emailBool) {
        if (regexEmail()) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none")
        } else {document.getElementById("emailAlert").classList.replace("d-none", "d-block")}
    }
    if (phoneBool) {
        if (regexPhone()) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
        } else {document.getElementById("phoneAlert").classList.replace("d-none", "d-block")}
    }
    if (ageBool) {
        if (regexAge()) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none")
        } else {document.getElementById("ageAlert").classList.replace("d-none", "d-block")}
    }
    if (passBool) {
        if (regexPassword()) {
            document.getElementById("passAlert").classList.replace("d-block", "d-none")
        } else {document.getElementById("passAlert").classList.replace("d-none", "d-block")}
    }
    if (rePassBool) {
        if (regexRePass()) {
            document.getElementById("rePassAlert").classList.replace("d-block", "d-none")
        } else {document.getElementById("rePassAlert").classList.replace("d-none", "d-block")}
    }
    if (regexName() && regexEmail() && regexPhone() && regexAge() && regexPassword() && regexRePass()) {
        submitBtn.removeAttribute("disabled")
    } else {submitBtn.setAttribute("disabled", true)}
};

function regexName() {return (/^[a-zA-Z ]+$/.test(document.getElementById("NameIn").value))};
function regexEmail() {return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("EmailIn").value))};
function regexPhone() {return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("PhoneIn").value))};
function regexAge() {return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("AgeIn").value))};
function regexPassword() {return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("PassIn").value))};
function regexRePass() {return document.getElementById("RePassIn").value == document.getElementById("PassIn").value};

function navClose() {
    $('li').slideToggle(800);
    $('#navBar').animate({ left: `-${navBarW}px` }, 500);
    $('#bars').addClass('d-block');
    $('#bars').removeClass('d-none');
    $('#xmark').addClass('d-none');
};