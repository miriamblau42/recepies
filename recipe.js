 //חילוץ הנתונים מהלינק
const searchParams = new URLSearchParams(location.search);
const recipeCode = parseInt(searchParams.get('recipeCode'));
//לא ניתן להכנס לדף ללא קוד מתכון
if (!recipeCode) {
    // אם אין הסטוריה לחזור אליה לנתב לעמוד של הארועים
    if (history.length <= 2) {
        location.href = '/index.html';
    } else {
        // לחזור מקום אחד אחורה בהסטרויה
        history.back();
    }
}

    $.ajax({
        url:'/data/data.json',
        success(data)
        {
            //חילוץ המתכן המתאים לנתון שהתקבל
            const recipe = data.recipies.find(recipe=>recipe.code==recipeCode);
            //הכנסת הנתונים המתאימים מהמתכון לדף המתכון
            document.querySelector('h1').innerHTML = recipe.name;
            document.querySelector('#level').innerHTML = recipe.level;
            document.querySelector('#preparingTime').innerHTML = recipe.preparationTime;
          
            const ingredientss=document.querySelector('#ingridients')
            
            recipe.ingredients.forEach(ingrid => {
               let ingridty = document.createElement('li');
                ingridty.classList.add('ingridient'); 
                ingridty.innerHTML =ingrid;
                ingredientss.appendChild(ingridty);
    
        });
            document.querySelector('p').innerHTML=recipe.howToPrapare;
            document.querySelector('img').src = `${recipe.image}`;
        }


    });