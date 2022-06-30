
const searchtext = document.querySelector('#searchText');
const allRecipies = document.querySelector('#allRecipies');
const login = document.querySelector('#login');
const signup = document.querySelector('#signup');
const profile = document.querySelector('#profile');


const currentUserJson = sessionStorage.getItem('currentUser');

//משתמש ברירת מחדל כאשר אין משתמש נוכחי רשום במערכת
// const defaultUser = 
// {
// userName : "user",
// password : ""
// }

// המרה של המחרוזת לאובייקט
const currentUser = JSON.parse(currentUserJson) || '';



// שליפה של ערכי הקריטריון מהאחסון

  let   searchBy=sessionStorage.getItem(`sortBy_${currentUser.userName}_${currentUser.password}`) || '';


//הצגת שם המשתמש
// const user = {userName: "user" , password: ""};
// const userName=JSON.parse(sessionStorage.getItem("currentUser")) || JSON.stringify(user) ;
profile.innerHTML = currentUser.userName || " ";


//אוביקט שמכיל את טקסט החיפוש

//לתוכו יוכנס כל הערכים מהג'יסון
const recipieWebSite = 
{
    recipies : []

}

//חילוץ האובייקטים מה- json
    $.ajax({
        url: '/data/data.json',
        success : (data) =>
        {
            const {recipies} = data;
            recipieWebSite.recipies =recipies;
            SetRecipies();
        }
    })

    //יצירת מערך חדש שמתאים לחיפוש
    const  FilterRecipe = (recipies , searchBy)=>
    {
        return recipies.filter( recipies => recipies.name.includes(searchBy));
    }

    //הצגת כל המתכונים ! עם חיפוש ובלי
    const SetRecipies=()=>
    {
        const filteredRecipies = FilterRecipe(recipieWebSite.recipies , searchBy);
        allRecipies.innerHTML='';
        filteredRecipies.forEach(PrintRecipe);
        sessionStorage.setItem(`searchBy_${JSON.parse(sessionStorage.getItem("currentUser")).userName}`,searchBy);
    }

    //הדפסת מתכון בודד- אוביקט אחד-
    const PrintRecipe=(recipe)=>
    {
        const recipeContainer =document.createElement('a');
        recipeContainer.href = `/recipe.html?recipeCode=${recipe.code}`;
        recipeContainer.classList.add('recipeContainer');
       
        const recipeName = document.createElement('h3');
        recipeName.innerHTML = recipe.name;
        recipeContainer.append(recipeName);

        const img = document.createElement('img');
        img.classList.add('resimg');
        img.src = `${recipe.image}`;
        img.height ='50px';
        img.width = '70px';
        recipeContainer.append(img);

        allRecipies.append(recipeContainer);

    }

    //החיפוש של מתכון ע"פ שם המתכון
    searchtext.onchange = searchtext.onkeyup = () => 
    {
     
        const searchText = searchtext.value;
        searchBy = searchText; 
        SetRecipies();
    }

    login.onclick =() =>
    {
    location.href = '/login.html'
    }
    signup.onclick =() =>
    {
    location.href = '/signup.html'
    }
    //טיימר להצגת מודעת מתכון
    // const PopRecipe = () =>
    // {
    //  const popingRecipe = createElement('div');
    //  popingRecipe.classList.add('poping');
    //  popingRecipe.append('')

    // }

    setTimeout (()=>{
        const body = document.querySelector('body')

        const container = document.createElement('div');
        container.classList.add('popingCointainer');
        
        const opacity = document.createElement('div');
        opacity.classList.add('opacity');
        container.append(opacity);

        
        const poping = document.createElement('div');
        poping.classList.add('poping');
        container.append(poping);

        const button = document.createElement('button');
        button.classList.add('buttonPop');
        button.innerHTML = 'x';
        poping.append(button);

        const sentance = document.createElement('h3');
        sentance.innerHTML = 'נרשמתם כבר??????';
        poping.append(sentance);

        const a = document.createElement('a');
        a.classList.add('link');
        a.href = '/signup.html';
        a.innerHTML = 'להרשמה!';
        poping.append(a);
   

        body.append(container);

        button.onclick = () => {
            container.remove();
        }

        },3000);








