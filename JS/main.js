


if ($(document).ready()) {
    $(".loading").fadeOut(1500)
  

    
};


 

////////////////////////////nav part/////////////////////////////
 // close nav
function closeNav()
{
    if ($(".sideNav").css("left")=="0px") {
       
      let wBox= $(".sideNav .hiddenPart").outerWidth();
      $(".sideNav").animate({
       left:-wBox,
      })
      $(".open-close-icon").addClass("fa-align-justify");
        $(".open-close-icon").removeClass("fa-x");
    }
}
//click to open
$(".btnclose").click(function openNav () { 
    $(".sideNav").css({
            left:0,
           })  
           
    $(".open-close-icon").removeClass("fa-align-justify");
    $(".open-close-icon").addClass("fa-x");

});

closeNav();
//reclick on close button
$(".btnclose").click(()=>{
    if ( $(".sideNav").css("left")=="0px") {
        
        closeNav()
        $(".open-close-icon").addClass("fa-align-justify");
        $(".open-close-icon").removeClass("fa-x");
    }
})
/////////////////////////end nav/////////////////////////////

////////////////////////categoery link////////////////////////////


// api fetch for each link 
async function getAll(){
  
     let responce = await fetch("https://www.themealdb.com/api/json/v1/1/filter.php?a=Italian")
     responce=await responce.json();
     displayMeals(responce.meals)
   
   

}
getAll();


// 1- categories fetch 
$("#category").click(
    
    async function getCategories(){
       
        let responce = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
         responce = await responce.json();
        //  console.log(responce);
         displayCtegory(responce.categories)
        
         closeNav()
    }

)
 
 // display category
function displayCtegory(res){   // i tried to make it with append it didn"t work failed to return to link cat
    let categ =``; 
    for (let i = 0; i < res.length; i++) {
        categ+=
        `
     <div class="col-md-3 ">
   
             <div onclick="getmealsCat('${res[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 pointer">
                 <img class="w-100" src="${res[i].strCategoryThumb}">
                 <div class="meal-layer position-absolute text-center text-black p-2">
                     <h3>${res[i].strCategory}</h3>
                     <p>${res[i].strCategoryDescription}</p>
                 </div>
             </div>
     </div>
     ` 
        
    }
    document.querySelector("#displayData").innerHTML=categ;
 
}

// to click to get meals from each category 

    async function getmealsCat(category){
    let responce= await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    responce= await responce.json();
    displayMeals(responce.meals);
   

};


// displaymeals  // this is tha main design of each meal i want to show 

function displayMeals(meal)
{   let mealsC=``
    for (let i = 0; i < meal.length; i++) {
          mealsC+=   `
        <div class="col-md-3">
                <div onclick="getDetails('${meal[i].idMeal}')"  class="meal position-relative overflow-hidden rounded-2 pointer ">
                    <img class="w-100" src="${meal[i].strMealThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                        <h3>${meal[i].strMeal}</h3>
                    </div>
                </div>
        </div>
        `
    }
    
    document.querySelector("#displayData").innerHTML=mealsC;
   
};





// get detail by mail id 
async function getDetails(id){
    closeNav();
    let responce= await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    responce=await responce.json();
    displaydetails(responce.meals[0]);


}


function displaydetails(idmeal){
// to deal with the array of ingridiant 
let ingredients = ``

for (let i = 1; i <= 20; i++) {
    if (idmeal[`strIngredient${i}`]) {
        ingredients += `<li class="alert  text-dark alert-light m-2 p-1">${idmeal[`strMeasure${i}`]} ${idmeal[`strIngredient${i}`]}</li>`
    }

    let details=``;
      details+=`

      <div class="col-md-4">
                <img class="w-100 rounded-3" src="${idmeal.strMealThumb}"
                    alt="">
                    <h2>${idmeal.strMeal}</h2>
            </div>
            <div class="col-md-8">
                <h2>Instructions</h2>
                <p>${idmeal.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${idmeal.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${idmeal.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                
                    ${ingredients}
                </ul>


                <a target="_blank" href="${idmeal.strSource}" class="btn btn-info">Source</a>
                <a target="_blank" href="${idmeal.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>`
      
          document.querySelector("#displayData").innerHTML=details;
    }



}



///////////////////end of category/////////////////////////////////////////////



//////////////////Area link/////////////////////////////////////////



$("#Area").click( 
    async function getArea(){
        closeNav();
        let responce= await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
        responce = await responce.json();
        displayArea(responce.meals);
    }
    
);
// 

function displayArea(areaDis){
     let area=``;
     for (let i = 0; i < areaDis.length; i++) {
       area+=`
       <div  onclick="areaMeals('${areaDis[i].strArea}')"class="col-md-3">
       <div  class="rounded-2  pointer text-center ">
               <i class="fa-solid  fa-house-laptop fa-4x"></i>
               <h3>${areaDis[i].strArea}</h3>
       </div>
      </div>
       `
        
     } 

     document.querySelector("#displayData").innerHTML=area;
     
}




///////////////////////get meals of each area //////////////////////////////

    async function areaMeals(areaParam)
   {
      let responce = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaParam}`);
      responce=await responce.json();
      displayMeals(responce.meals)
        
   }



   ///// end of area link/////////////////////////////////////////


   ////////////////////ingridians link/////////////////////

   $("#ingrediants").click(
     async function getiingrid(){
      let responce = await fetch (`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
      responce= await responce.json();
      displayIngrid(responce.meals.slice(0,20))

     }

   );



   function displayIngrid(ingridParam){
    closeNav();
      let ingr=``
    //   onclick="getIngredientsMeals
   for (let i = 0; i < ingridParam.length; i++) {
     ingr+=`
     
     <div class="col-md-3  >
            <div class="row  ">
             <div  onclick="getIngMeals('${ingridParam[i].strIngredient}')"  ('${ingridParam[i].strIngredient}')" class="rounded-2  text-center pointer ">
             <i class=" fa-solid fa-bowl-food fa-4x "></i>  
              <h3>${ingridParam[i].strIngredient}</h3>
    </div>
    </div>
     </div>
     
     `
    
   }
   document.querySelector("#displayData").innerHTML=ingr;


   }

   // to get the meals from ingridoant window 
   async function getIngMeals(ingMeals)
   {

    let responce = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingMeals}`)
      responce= await responce.json();
      displayMeals(responce.meals);

   }


   //////////////////end ing link//////////////////

// search link////
//
   $("#search").click(
     function displaySearch(){
        document.querySelector("#displayData").innerHTML=
        `
        <div class="row py-4 ">
        <div class="col-md-6 ">
            <input onkeyup="searchByName(this.value) "class=" form-control bg-transparent text-white" type="text" placeholder="Search By Name">
        </div>
        <div class="col-md-6">
            <input onkeyup="searchByLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
        </div>
    </div>`


     closeNav();

     }


   );


 
     // search by name
      async function searchByName(name){
        let responce = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
        responce= await responce.json();
        responce.meals ? displayMeals(responce.meals) : displayMeals([])
      }

/// search by letter

async function searchByLetter(letter){
    let responce = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
    responce= await responce.json();
    responce.meals ? displayMeals(responce.meals) : displayMeals([])
  }







   //////linl contant/////

   // design 
   $("#contact").click(
  
    function displayContact(){
        document.querySelector("#displayData").innerHTML=`
        <div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 ">
        <div class="row g-4">
            <div class="col-md-10">
                <input id="nameInput" " type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
   
            <div class="col-md-10">
            <input id="emailInput" type="email" class="form-control " placeholder="Enter Your Email">
            <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                Email not valid *exemple@yyy.zzz
            </div>
        </div>
        <div class="col-md-10">
                <input id="phoneInput" " type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-10">
                <input id="ageInput" " type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-10">
                <input  id="passwordInput" " type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-10">
                <input  id="repasswordInput" " type="password" class="form-control " placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled class="btn  btn-info m-3 text-start">Submit</button>
    </div>
</div> 
    `
    closeNav();
    });
 

 























// to check the alert message 
// function validate()
// {
//     if (nameValidation()) {
//         document.getElementById("nameAlert").classList.replace("d-block", "d-none")

//     } else {
//         document.getElementById("nameAlert").classList.replace("d-none", "d-block")
//     }

// }


   
 
// /// the validation part "regular expression"
// function nameValidation() {
//   (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value))
// }


// function emailValidation() {
//     return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value))
// }



// function phoneValidation() {
//     return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value))
// }

// function ageValidation() {
//     return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value))
// }

// function passwordValidation() {
//     return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value))
// }

// function repasswordValidation() {
//     return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value
// }


   

//     // we have to check if the inputs meat the validation 
//     if (nameValidation() &&
//     emailValidation() &&
//     phoneValidation() &&
//     ageValidation() &&
//     passwordValidation() &&
//     repasswordValidation()) {
//     submitBtn.removeAttribute("disabled")
// } else {
//     submitBtn.setAttribute("disabled", true)
// }

// $("#nameInput").keyup(
//     nameValidation()
//    );