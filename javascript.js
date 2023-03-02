let mainPage = document.querySelector(".art2");
let apiPage = document.querySelector(".art1");
let column1 = document.querySelector(".github-col-1");
let column2 = document.querySelector(".github-col-2"); // // Accessing elements by using class names
let input = document.querySelector(".github-input");
let submit = document.querySelector(".github-btn");
let repoStorage = document.querySelector(".github-row2");
let box = []; // Here we declare an array to store how many repos are there in & than we display it individually in html using for loop.
let repo_name = []; // storing names of the array & display it after indivdually in HTML using for loop.
let repo_info = []; // similar way
let repo_link = []; //  similar way
let github_sec = document.querySelector(".sec1");
let github_btn = document.querySelector(".github-toggle");
github_btn.addEventListener("click", function () {
  // Initail button for showing/hiding author section
  github_sec.classList.toggle("sec1-toggle");
  mainPage.classList.toggle("art2-toggle"); // Making the main section invisible whenever btn is clicked (see in css)
  github_sec.style.display = "block"; // Display all apis none except which is clicked.
  authorSection.style.display = "none";
  photoSection.style.display = "none";
  foodSection.style.display = "none";
});

username("ProgrammerOwais"); // defaul github user name

function username(name) {
  fetch(`https://api.github.com/users/${name}`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      while (column1.firstChild) {
        column1.removeChild(column1.firstChild); // Clear all the child element in column1 html div whenever username() function called
      }
      while (column2.firstChild) {
        column2.removeChild(column2.firstChild); // same method for column2 html div in
      }
      let img = document.createElement("img");
      let githubName = document.createElement("p");
      let para = document.createElement("p");
      img.src = data.avatar_url;
      img.alt = "github-img";
      img.classList.add("github-img");
      githubName.textContent = name;
      githubName.classList.add("github-name");
      para.classList.add("github-para");
      para.textContent = data.bio;
      column1.appendChild(img);
      column1.appendChild(githubName);
      column2.appendChild(para);

      fetch(`https://api.github.com/users/${name}/repos`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data);
          while (repoStorage.firstChild) {
            repoStorage.removeChild(repoStorage.firstChild); // Clear all previous repos whenever username() funcion called
          }
          for (let i = 0; i < data.length; i++) {
            box[i] = document.createElement("div");
            box[i].classList.add("repo-div");
            repo_name[i] = document.createElement("h2");
            repo_name[i].classList.add("repo-heading");
            repo_name[i].textContent = data[i].name;
            repo_info[i] = document.createElement("p");
            repo_info[i].classList.add("repo-info");
            repo_info[i].textContent = data[i].description;
            if (repo_info[i].textContent === "") {
              repo_info[i].textContent =
                "There is no description given about this repo but you can find out more by click given repo link.";
            }
            repo_link[i] = document.createElement("a");
            repo_link[i].classList.add("repo-link");
            repo_link[i].textContent = "Visit to Repo";
            repo_link[i].href = data[i].html_url;
            repo_link[i].target = "_blank";
            box[i].appendChild(repo_name[i]);
            box[i].appendChild(repo_info[i]);
            box[i].appendChild(repo_link[i]);
            repoStorage.appendChild(box[i]);
          }
        })
        .catch((e) => {
          console.log(e.message);
        });
    })
    .catch((e) => {
      console.log(e.message);
    });
}

// By clicking
submit.addEventListener("click", function () {
  // whenever github search submit button clicked
  if (input.value !== "") {
    // if input box contain value
    username(input.value); // call the function by passing user name using input values.
  } else {
    return; // else do nothing
  }
});
// By Pressing the Enter
input.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    username(input.value);
  }
});

/***************************************************  Author API Section ******************************************* */
let authorSection = document.querySelector(".sec2");
let author_img = document.createElement("img");
let authorName = document.querySelector(".author-name");
let authorInput = document.querySelector(".author-input"); // Accessing elements by using class names
let authorSubmit = document.querySelector(".author-btn");
let topWork = document.querySelector(".author-work");
let birthDate = document.querySelector(".author-birth");
let workCount = document.querySelector(".author-count");

let author_btn = document.querySelector(".author-toggle"); // Initail button for showing/hiding author section
author_btn.addEventListener("click", function () {
  authorSection.classList.toggle("sec2-toggle");
  mainPage.classList.toggle("art2-toggle");
  github_sec.style.display = "none";
  authorSection.style.display = "block";
  photoSection.style.display = "none";
  foodSection.style.display = "none";
});

authorfunction("john C. maxwell"); // Defaul author name

function authorfunction(name) {
  fetch(`https://openlibrary.org/search/authors.json?q=${name}`)
    .then((res) => {
      // Accessing author's data
      return res.json();
    })
    .then((data) => {
      console.log(data);
      while (authorName.firstChild) {
        // Clear all the contents of paragraph in html whenever authorfunction called.
        authorName.removeChild(authorName.firstChild);
      }
      while (topWork.firstChild) {
        topWork.removeChild(topWork.firstChild);
      }
      while (birthDate.firstChild) {
        birthDate.removeChild(birthDate.firstChild);
      }
      while (workCount.firstChild) {
        workCount.removeChild(workCount.firstChild);
      }

      author_para1 = document.createElement("p"); // Create new paras each time when authorfunction called
      author_para2 = document.createElement("p");
      author_para3 = document.createElement("p");
      author_para4 = document.createElement("p");
      fetch(
        `http://covers.openlibrary.org/a/olid/${data.docs[0].key}-M.jpg`
      ).then((res) => {
        // fetching author image & displaying with text
        console.log(res);
        author_img.src = res.url;
        author_img.alt = " there should be image";
        author_img.classList.add("author-img");
        authorName.appendChild(author_img);
        author_para1.textContent = `${data.docs[0].name}`;
        authorName.appendChild(author_para1);
      });

      author_para2.textContent = `Top Work : ${data.docs[0].top_work}`;
      topWork.appendChild(author_para2);
      if (data.docs[0].birth_date) {
        author_para3.textContent = `Birth-Date : ${data.docs[0].birth_date}`;
        birthDate.appendChild(author_para3);
      }
      if (data.docs[0].work_count) {
        author_para4.textContent = `Work Count : ${data.docs[0].work_count}`;
        workCount.appendChild(author_para4);
      }

      authorSection.appendChild(authorName);
      authorSection.appendChild(topWork);
      authorSection.appendChild(birthDate);
      authorSection.appendChild(workCount);
    })
    .catch((e) => {
      console.log(e.message);
    });
}

// By clicking on button
authorSubmit.addEventListener("click", function () {
  //  By clicking author submit button
  if (authorInput.value !== "") {
    // if input contain value
    authorfunction(authorInput.value); // call the function by passing name of the author using input box.
  } else {
    return;
  }
});
// By pressing Enter
authorInput.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    authorfunction(authorInput.value);
  }
});

/********************************************************* Photos API  ******************************************/
let photoSection = document.querySelector(".sec3");
let photoBtn = document.querySelector(".photo-toggle");
let pictureSearch = document.querySelector(".photo-input"); // Accessing elements by their class name
let pictureSubmit = document.querySelector(".photo-btn");
let pictureList = document.querySelector(".random-imgs");
let picturesItems = []; // making list of items i.e 'li' array to store individuallly in an array
let picture = []; // making list of images i.e 'img' array to store individuallly in an array
let pictureOwner = []; // making list of photographers i.e 'p' array to store individuallly in an array
let pictureLink = []; // making list of links i.e 'a' array to store individuallly in an array

photoBtn.addEventListener("click", function () {
  // Initail button for showing/hiding photos API section
  photoSection.classList.toggle("sec3-toggle");
  mainPage.classList.toggle("art2-toggle");
  github_sec.style.display = "none";
  authorSection.style.display = "none";
  photoSection.style.display = "block";
  foodSection.style.display = "none";
});

randomAutoImgs(); // Default images
function randomAutoImgs() {
  fetch("https://api.pexels.com/v1/curated", {
    //Getting new images day by day & hour by hour
    method: "GET", // methor for accessing somegthing
    headers: {
      // we call it header for putting some private info i.e keys etc.
      Authorization: "563492ad6f91700001000001f1f2fead15ad4340b3f9bd4209f797fb",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      while (pictureList.firstChild) {
        // Whenever randomAutoImgs() called clear all the childs in list i.e ul
        pictureList.removeChild(pictureList.firstChild);
      }
      console.log("The pexel auto data is :", data);
      for (let i = 0; i < data.photos.length; i++) {
        // Base on how many photos we have create elements
        picturesItems[i] = document.createElement("li"); // give them classes , attribute & append them in paranets.
        picturesItems[i].classList.add("random-img-list");
        picture[i] = document.createElement("img");
        picture[i].classList.add("random-img");
        picture[i].alt = "there should be image";
        picture[i].src = data.photos[i].src.large;
        pictureOwner[i] = document.createElement("p");
        pictureOwner[i].textContent = "Photo By " + data.photos[i].photographer;
        pictureLink[i] = document.createElement("a");
        pictureLink[i].href = data.photos[i].photographer_url;
        pictureLink[i].textContent =
          "Visit to  " + data.photos[i].photographer + " web";
        picturesItems[i].appendChild(picture[i]);
        picturesItems[i].appendChild(pictureOwner[i]);
        picturesItems[i].appendChild(pictureLink[i]);
        pictureList.appendChild(picturesItems[i]);
      }
    });
}

// By clicking on submit button
pictureSubmit.addEventListener("click", function () {
  if (pictureSearch.value !== "") {
    // if input box is not empty
    photoSearch(pictureSearch.value); // call the funcion
  } else {
    return;
  }
});
// By Pressing the Enter
pictureSearch.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    photoSearch(pictureSearch.value);
  }
});

function photoSearch(name) {
  // By using parameter 'name' you can access that paramenter type images.
  fetch(`https://api.pexels.com/v1/search?query=${name}&per_page=12`, {
    method: "GET", // All below process is same as randomAutoimg() function.
    headers: {
      Authorization: "563492ad6f91700001000001f1f2fead15ad4340b3f9bd4209f797fb",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      while (pictureList.firstChild) {
        pictureList.removeChild(pictureList.firstChild);
      }
      console.log("The pexel search data is :", data);
      for (let i = 0; i < data.photos.length; i++) {
        picturesItems[i] = document.createElement("li");
        picturesItems[i].classList.add("random-img-list");
        picture[i] = document.createElement("img");
        picture[i].classList.add("random-img");
        picture[i].alt = "there should be image";
        picture[i].src = data.photos[i].src.large;
        pictureOwner[i] = document.createElement("p");
        pictureOwner[i].textContent = "Photo By " + data.photos[i].photographer;
        pictureLink[i] = document.createElement("a");
        pictureLink[i].href = data.photos[i].photographer_url;
        pictureLink[i].target = "_blank";
        pictureLink[i].textContent =
          "Visit to  " + data.photos[i].photographer + " web";
        picturesItems[i].appendChild(picture[i]);
        picturesItems[i].appendChild(pictureOwner[i]);
        picturesItems[i].appendChild(pictureLink[i]);
        pictureList.appendChild(picturesItems[i]);
      }
    })
    .catch((e) => {
      console.log(e.message);
    });
}

//**************************************************************************** Food API SECTION ******************************** */
let foodSection = document.querySelector(".sec4");
let foodBtn = document.querySelector(".food-toggle");
foodBtn.addEventListener("click", function () {
  foodSection.classList.toggle("sec4-toggle");
  mainPage.classList.toggle("art2-toggle");
  github_sec.style.display = "none";
  authorSection.style.display = "none";
  photoSection.style.display = "none";
  foodSection.style.display = "block";
});
let recipeStorage = document.querySelector(".food-sec");

/***********************************************************  Random recipe section ********************************* */

function randomRecipes() {
  let hr1 = [];
  let hr2 = [];
  let box = [];
  let recipeImg = [];
  let recipeHead = [];
  let recipePara = [];
  let recipeIconDiv = [];
  let recipeIconTextDiv = [];
  let recipeIcon = [];
  let recipeIconText = [];

  // Variabel for recipe info i.e on clicking of any recipe ,show whole info about that recipe ///////////////////
  let recipeInfoStorage = document.querySelector(".food-info");
  let recipeStorage = document.querySelector(".food-sec");
  let headHeading = [];
  let recipe2Img = [];
  let recipe2Heading = [];
  let recipe2Para = [];
  let subHeading1 = [];
  let recipeNut = [];
  let nutList = [];
  let subHeading2 = [];
  let recipeItems = [];
  let itemPara = [];
  // let itemImg = [];
  let subHeading3 = [];
  let recipe2Urls = [];
  let recipe2Links = [];
  let boxtop; // Variable for finding position of clicked box from top.

  fetch(
    "https://api.spoonacular.com/recipes/random?number=12&tags=vegetarian,dessert&apiKey=d3f492ca2e974370860d47cf0eb89c51",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      // This include recipes data every recipe enclosed in box
      console.log(" Food  API data is : : ", data);
      while (recipeStorage.firstChild) {
        recipeStorage.removeChild(recipeStorage.firstChild);
      }
      for (let i = 0; i < data.recipes.length; i++) {
        box[i] = document.createElement("div");
        box[i].classList.add("recipe-container");
        recipeImg[i] = document.createElement("img");
        recipeImg[i].classList.add("recipe-img");
        recipeImg[i].alt = "recipe image";
        recipeImg[i].src = data.recipes[i].image;
        hr1[i] = document.createElement("hr");
        hr2[i] = document.createElement("hr");
        recipeHead[i] = document.createElement("h3");
        recipeHead[i].classList.add("recipe-heading");
        recipeHead[i].textContent = data.recipes[i].title;
        recipePara[i] = document.createElement("p");
        recipePara[i].classList.add("recipe-para");
        recipePara[i].innerHTML = data.recipes[i].summary;
        recipeIconDiv[i] = document.createElement("div");
        recipeIconDiv[i].classList.add("recipe-icons-div");
        /// In below we use weak approach due to different class name & other text so
        /// we want in every box 4 icons & four texts related to these icons so we have
        /// to create 4 times icon elements & 4 times text element with different class
        /// name & text respectively.

        // First Icon & First Text
        recipeIconTextDiv[0] = document.createElement("div");
        recipeIconTextDiv[0].classList.add("iconText-div");
        recipeIcon[0] = document.createElement("i");
        recipeIcon[0].classList.add("recipe-icon", "far", "fa-thumbs-up");
        recipeIconText[0] = document.createElement("span");
        recipeIconText[0].classList.add("icon-text");
        recipeIconText[0].textContent =
          "Likes:" + data.recipes[i].aggregateLikes;
        recipeIconTextDiv[0].appendChild(recipeIcon[0]);
        recipeIconTextDiv[0].appendChild(recipeIconText[0]);

        // 2nd Icon & 2nd Text
        recipeIconTextDiv[1] = document.createElement("div");
        recipeIconTextDiv[1].classList.add("iconText-div");
        recipeIcon[1] = document.createElement("i");
        recipeIcon[1].classList.add("recipe-icon", "fas", "fa-dollar-sign");
        recipeIconText[1] = document.createElement("span");
        recipeIconText[1].classList.add("icon-text");
        recipeIconText[1].textContent =
          "$" + data.recipes[i].pricePerServing + "  per serving";
        recipeIconTextDiv[1].appendChild(recipeIcon[1]);
        recipeIconTextDiv[1].appendChild(recipeIconText[1]);

        // 3rd Icon & 3rd Text
        recipeIconTextDiv[2] = document.createElement("div");
        recipeIconTextDiv[2].classList.add("iconText-div");
        recipeIcon[2] = document.createElement("i");
        recipeIcon[2].classList.add("recipe-icon", "far", "fa-clock");
        recipeIconText[2] = document.createElement("span");
        recipeIconText[2].classList.add("icon-text");
        recipeIconText[2].textContent =
          data.recipes[i].readyInMinutes + " mints";
        recipeIconTextDiv[2].appendChild(recipeIcon[2]);
        recipeIconTextDiv[2].appendChild(recipeIconText[2]);

        // $th Icon & $th Text
        recipeIconTextDiv[3] = document.createElement("div");
        recipeIconTextDiv[3].classList.add("iconText-div");
        recipeIcon[3] = document.createElement("i");
        recipeIcon[3].classList.add("recipe-icon", "fas", "fa-file-signature");
        recipeIconText[3] = document.createElement("span");
        recipeIconText[3].classList.add("icon-text");
        recipeIconText[3].textContent = "License:" + data.recipes[i].license;
        recipeIconTextDiv[3].appendChild(recipeIcon[3]);
        recipeIconTextDiv[3].appendChild(recipeIconText[3]);

        // Now put together in a div
        recipeIconDiv[i].appendChild(recipeIconTextDiv[0]);
        recipeIconDiv[i].appendChild(recipeIconTextDiv[1]);
        recipeIconDiv[i].appendChild(recipeIconTextDiv[2]);
        recipeIconDiv[i].appendChild(recipeIconTextDiv[3]);

        // & Now put all element in a box
        box[i].appendChild(recipeImg[i]);
        box[i].appendChild(hr1[i]);
        box[i].appendChild(recipeHead[i]);
        box[i].appendChild(recipePara[i]);
        box[i].appendChild(hr2[i]);
        box[i].appendChild(recipeIconDiv[i]);
        recipeStorage.appendChild(box[i]);
      }
      return data;
    })
    .then((data2) => {
      // This will include basic data of recipe i.e images , para , close btn etc.
      for (let i = 0; i < data2.recipes.length; i++) {
        box[i].addEventListener("click", function () {
          while (recipeInfoStorage.firstChild) {
            recipeInfoStorage.removeChild(recipeInfoStorage.firstChild);
          }

          boxtop = box[i].offsetTop; // Find the position of clicked box from top of root page
          recipeInfoStorage.style.top = boxtop + "px"; // show the recipe container in the area of selected box.
          recipeInfoStorage.style.left = " 50%";
          recipeInfoStorage.style.opacity = "1";

          let recipe2CloseBtn = document.createElement("button"); // Making close btn
          recipe2CloseBtn.classList.add("recipe2CloseBtn");
          recipe2CloseBtn.type = "button";
          recipe2CloseBtn.textContent = "X";
          recipeInfoStorage.appendChild(recipe2CloseBtn);
          recipeStorage.style.opacity = "0.4";

          recipe2CloseBtn.addEventListener("click", () => {
            //  Whenever closebtn cliked make the default behaviour of recipe as given below
            recipeInfoStorage.style.top = "15%";
            recipeInfoStorage.style.left = "-80%";
            recipeInfoStorage.style.opacity = "0";
            recipeStorage.style.opacity = "1";
          });

          // From now create the recipe elements & append it to the recipe container ( recipe whole info box).
          headHeading[i] = document.createElement("h1");
          headHeading[i].classList.add("recipe2-head");
          headHeading[i].textContent = "A Complete Guide To Your Recipe";
          recipe2Img[i] = document.createElement("img");
          recipe2Img[i].classList.add("recipe2-img");
          recipe2Img[i].alt = "recipes image";
          recipe2Img[i].src = data2.recipes[i].image;
          recipe2Heading[i] = document.createElement("h2");
          recipe2Heading[i].classList.add("recipe2-heading");
          recipe2Heading[i].textContent = data2.recipes[i].title;
          recipe2Para[i] = document.createElement("p");
          recipe2Para[i].classList.add("recipe2-para");
          recipe2Para[i].innerHTML = data2.recipes[i].summary;
          recipeInfoStorage.appendChild(headHeading[i]);
          recipeInfoStorage.appendChild(recipe2Img[i]);
          recipeInfoStorage.appendChild(recipe2Heading[i]);
          recipeInfoStorage.appendChild(recipe2Para[i]);
        });
      }
      return data2;
    })
    .then((data2) => {
      // This is data about recipe Nutrients.
      for (let i = 0; i < data2.recipes.length; i++) {
        box[i].addEventListener("click", function () {
          subHeading1[i] = document.createElement("h2");
          subHeading1[i].classList.add("recipe2-heading2");
          subHeading1[i].textContent = "Nutrients:";
          recipeNut[i] = document.createElement("div");
          recipeNut[i].classList.add("recipe2-nut");

          fetch(
            `https://api.spoonacular.com/recipes/${data2.recipes[i].id}/nutritionWidget.json?apiKey=d3f492ca2e974370860d47cf0eb89c51`
          )
            .then((res) => {
              return res.json();
            })
            .then((nutData) => {
              console.log("the nut data is :", nutData);
              nutList[0] = document.createElement("span");
              nutList[0].classList.add("nut-list");
              nutList[0].textContent = `Calories: ${nutData.calories}`;
              nutList[1] = document.createElement("span");
              nutList[1].classList.add("nut-list");
              nutList[1].textContent = `Protein: ${nutData.protein}`;
              nutList[2] = document.createElement("span");
              nutList[2].classList.add("nut-list");
              nutList[2].textContent = `Fat: ${nutData.fat}`;
              nutList[3] = document.createElement("span");
              nutList[3].classList.add("nut-list");
              nutList[3].textContent = `Carbs: ${nutData.carbs}`;
              recipeNut[i].appendChild(nutList[0]);
              recipeNut[i].appendChild(nutList[1]);
              recipeNut[i].appendChild(nutList[2]);
              recipeNut[i].appendChild(nutList[3]);
            })
            .catch((e) => {
              console.log("The error in nutrients section is :", e.message);
            });

          recipeInfoStorage.appendChild(subHeading1[i]);
          recipeInfoStorage.appendChild(recipeNut[i]);
        });
      }
      return data2;
    })
    .then((data2) => {
      // this is data about recipe ingredient
      for (let i = 0; i < data2.recipes.length; i++) {
        box[i].addEventListener("click", function () {
          subHeading2[i] = document.createElement("h2");
          subHeading2[i].classList.add("recipe2-heading2");
          subHeading2[i].textContent = "Ingredients:";

          fetch(
            `https://api.spoonacular.com/recipes/${data2.recipes[i].id}/ingredientWidget.json?apiKey=d3f492ca2e974370860d47cf0eb89c51`
          )
            .then((res) => {
              return res.json();
            })
            .then((ingreData) => {
              console.log("ingredient data is : ", ingreData);
              recipeInfoStorage.appendChild(subHeading2[i]);
              recipeItems[i] = document.createElement("div");
              recipeItems[i].classList.add("recipe2-items");
              for (let j = 0; j < ingreData.ingredients.length; j++) {
                itemPara[j] = document.createElement("span");
                itemPara[j].classList.add("item-para");
                itemPara[
                  j
                ].textContent = `${ingreData.ingredients[j].amount.us.value} ${ingreData.ingredients[j].amount.us.unit} ${ingreData.ingredients[j].name}`;
                recipeItems[i].appendChild(itemPara[j]);
                recipeInfoStorage.appendChild(recipeItems[i]);
              }
            })
            .catch((e) => {
              console.log("The error in Ingredient section is : ", e.message);
            });
        });
      }
      return data2;
    })
    .then((data2) => {
      // this is data about recipe related other links
      for (let i = 0; i < data2.recipes.length; i++) {
        box[i].addEventListener("click", function () {
          subHeading3[i] = document.createElement("h2");
          subHeading3[i].classList.add("recipe2-heading2");
          subHeading3[i].textContent = "Other Links of Same Recipe";
          recipe2Urls[i] = document.createElement("div");
          recipe2Urls[i].classList.add("recipe2-urls");
          recipe2Links[0] = document.createElement("a");
          recipe2Links[0].classList.add("recipe2-link");
          recipe2Links[0].href = data2.recipes[i].sourceUrl;
          recipe2Links[0].target = "_blank";
          recipe2Links[0].textContent = "Source Link1";
          recipe2Links[1] = document.createElement("a");
          recipe2Links[1].classList.add("recipe2-link");
          recipe2Links[1].href = data2.recipes[i].spoonacularSourceUrl;
          recipe2Links[1].target = "_blank";
          recipe2Links[1].textContent = "Spoonacular Source Link";
          recipe2Urls[i].appendChild(recipe2Links[0]);
          recipe2Urls[i].appendChild(recipe2Links[1]);
          recipeInfoStorage.appendChild(subHeading3[i]);
          recipeInfoStorage.appendChild(recipe2Urls[i]);
        });
      }
    })
    .catch((e) => {
      console.log("the error in recipe data is : ", e.message);
    });
}

randomRecipes();

/***********************************************************  Search recipe section ********************************* */

let inputData = document.querySelector(".food-input");
let searchBtn = document.querySelector(".food-search");

// By clicking on Button
searchBtn.addEventListener("click", () => {
  if (inputData.value !== "") {
    RecipeSearch(inputData.value);
  } else {
    return;
  }
});
// By Pressing the Enter
inputData.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    RecipeSearch(inputData.value);
  }
});

function RecipeSearch(recipeName) {
  let hr1 = [];
  let hr2 = [];
  let box = [];
  let recipeImg = [];
  let recipeHead = [];
  let recipePara = [];
  let recipeIconDiv = [];
  let recipeIconTextDiv = [];
  let recipeIcon = [];
  let recipeIconText = [];

  // Variabel for recipe info i.e on clicking of any recipe ,show whole info about that recipe ///////////////////
  let recipeInfoStorage = document.querySelector(".food-info");
  let recipeStorage = document.querySelector(".food-sec");
  let headHeading = [];
  let recipe2Img = [];
  let recipe2Heading = [];
  let recipe2Para = [];
  let subHeading1 = [];
  let recipeNut = [];
  let nutList = [];
  let subHeading2 = [];
  let recipeItems = [];
  let itemPara = [];
  // let itemImg = [];
  let subHeading3 = [];
  let recipe2Urls = [];
  let recipe2Links = [];
  let boxtop; // Variable for finding position of clicked box from top.

  fetch(
    `https://api.spoonacular.com/recipes/complexSearch?query=${recipeName}&number=6&apiKey=d3f492ca2e974370860d47cf0eb89c51`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((res) => {
      return res.json();
    })
    .then((searchData) => {
      console.log(" Food  API data is : : ", searchData);
      while (recipeStorage.firstChild) {
        recipeStorage.removeChild(recipeStorage.firstChild);
      }

      if (searchData.totalResults === 0) {
        recipeHead[0] = document.createElement("h3");
        recipeHead[0].classList.add("recipe-heading");
        recipeHead[0].textContent = "Recipe is not found";
        recipeStorage.appendChild(recipeHead[0]);
      } else {
        for (let i = 0; i < searchData.results.length; i++) {
          fetch(
            `https://api.spoonacular.com/recipes/${searchData.results[i].id}/information?apiKey=d3f492ca2e974370860d47cf0eb89c51`
          )
            .then((res) => {
              return res.json();
            })
            .then((data) => {
              // This include recipes data every recipe enclosed in box

              box[i] = document.createElement("div");
              box[i].classList.add("recipe-container");
              recipeImg[i] = document.createElement("img");
              recipeImg[i].classList.add("recipe-img");
              recipeImg[i].alt = "recipe image";
              recipeImg[i].src = data.image;
              hr1[i] = document.createElement("hr");
              hr2[i] = document.createElement("hr");
              recipeHead[i] = document.createElement("h3");
              recipeHead[i].classList.add("recipe-heading");
              recipeHead[i].textContent = data.title;
              recipePara[i] = document.createElement("p");
              recipePara[i].classList.add("recipe-para");
              recipePara[i].innerHTML = data.summary;
              recipeIconDiv[i] = document.createElement("div");
              recipeIconDiv[i].classList.add("recipe-icons-div");
              /// In below we use weak approach due to different class name & other text so
              /// we want in every box 4 icons & four texts related to these icons so we have
              /// to create 4 times icon elements & 4 times text element with different class
              /// name & text respectively.

              // First Icon & First Text
              recipeIconTextDiv[0] = document.createElement("div");
              recipeIconTextDiv[0].classList.add("iconText-div");
              recipeIcon[0] = document.createElement("i");
              recipeIcon[0].classList.add("recipe-icon", "far", "fa-thumbs-up");
              recipeIconText[0] = document.createElement("span");
              recipeIconText[0].classList.add("icon-text");
              recipeIconText[0].textContent = "Likes:" + data.aggregateLikes;
              recipeIconTextDiv[0].appendChild(recipeIcon[0]);
              recipeIconTextDiv[0].appendChild(recipeIconText[0]);

              // 2nd Icon & 2nd Text
              recipeIconTextDiv[1] = document.createElement("div");
              recipeIconTextDiv[1].classList.add("iconText-div");
              recipeIcon[1] = document.createElement("i");
              recipeIcon[1].classList.add(
                "recipe-icon",
                "fas",
                "fa-dollar-sign"
              );
              recipeIconText[1] = document.createElement("span");
              recipeIconText[1].classList.add("icon-text");
              recipeIconText[1].textContent =
                "$" + data.pricePerServing + "  per serving";
              recipeIconTextDiv[1].appendChild(recipeIcon[1]);
              recipeIconTextDiv[1].appendChild(recipeIconText[1]);

              // 3rd Icon & 3rd Text
              recipeIconTextDiv[2] = document.createElement("div");
              recipeIconTextDiv[2].classList.add("iconText-div");
              recipeIcon[2] = document.createElement("i");
              recipeIcon[2].classList.add("recipe-icon", "far", "fa-clock");
              recipeIconText[2] = document.createElement("span");
              recipeIconText[2].classList.add("icon-text");
              recipeIconText[2].textContent = data.readyInMinutes + " mints";
              recipeIconTextDiv[2].appendChild(recipeIcon[2]);
              recipeIconTextDiv[2].appendChild(recipeIconText[2]);

              // $th Icon & $th Text
              recipeIconTextDiv[3] = document.createElement("div");
              recipeIconTextDiv[3].classList.add("iconText-div");
              recipeIcon[3] = document.createElement("i");
              recipeIcon[3].classList.add(
                "recipe-icon",
                "fas",
                "fa-file-signature"
              );
              recipeIconText[3] = document.createElement("span");
              recipeIconText[3].classList.add("icon-text");
              recipeIconText[3].textContent = "License:" + data.license;
              recipeIconTextDiv[3].appendChild(recipeIcon[3]);
              recipeIconTextDiv[3].appendChild(recipeIconText[3]);

              // Now put together in a div
              recipeIconDiv[i].appendChild(recipeIconTextDiv[0]);
              recipeIconDiv[i].appendChild(recipeIconTextDiv[1]);
              recipeIconDiv[i].appendChild(recipeIconTextDiv[2]);
              recipeIconDiv[i].appendChild(recipeIconTextDiv[3]);

              // & Now put all element in a box
              box[i].appendChild(recipeImg[i]);
              box[i].appendChild(hr1[i]);
              box[i].appendChild(recipeHead[i]);
              box[i].appendChild(recipePara[i]);
              box[i].appendChild(hr2[i]);
              box[i].appendChild(recipeIconDiv[i]);
              recipeStorage.appendChild(box[i]);

              return data;
            })
            .then((data2) => {
              // This will include basic data of recipe i.e images , para , close btn etc.

              box[i].addEventListener("click", function () {
                while (recipeInfoStorage.firstChild) {
                  recipeInfoStorage.removeChild(recipeInfoStorage.firstChild);
                }

                boxtop = box[i].offsetTop; // Find the position of clicked box from top of root page
                recipeInfoStorage.style.top =
                  `calc(${boxtop}px - 50px)` || boxtop + "px"; // show the recipe container in the area of selected box.
                recipeInfoStorage.style.left = " 50%";
                recipeInfoStorage.style.opacity = "1";

                let recipe2CloseBtn = document.createElement("button"); // Making close btn
                recipe2CloseBtn.classList.add("recipe2CloseBtn");
                recipe2CloseBtn.type = "button";
                recipe2CloseBtn.textContent = "X";
                recipeInfoStorage.appendChild(recipe2CloseBtn);
                recipeStorage.style.opacity = "0.4";

                recipe2CloseBtn.addEventListener("click", () => {
                  //  Whenever closebtn cliked make the default behaviour of recipe as given below
                  recipeInfoStorage.style.top = "15%";
                  recipeInfoStorage.style.left = "-80%";
                  recipeInfoStorage.style.opacity = "0";
                  recipeStorage.style.opacity = "1";
                });

                // From now create the recipe elements & append it to the recipe container ( recipe whole info box).
                headHeading[i] = document.createElement("h1");
                headHeading[i].classList.add("recipe2-head");
                headHeading[i].textContent = "A Complete Guide To Your Recipe";
                recipe2Img[i] = document.createElement("img");
                recipe2Img[i].classList.add("recipe2-img");
                recipe2Img[i].alt = "recipes image";
                recipe2Img[i].src = data2.image;
                recipe2Heading[i] = document.createElement("h2");
                recipe2Heading[i].classList.add("recipe2-heading");
                recipe2Heading[i].textContent = data2.title;
                recipe2Para[i] = document.createElement("p");
                recipe2Para[i].classList.add("recipe2-para");
                recipe2Para[i].innerHTML = data2.summary;
                recipeInfoStorage.appendChild(headHeading[i]);
                recipeInfoStorage.appendChild(recipe2Img[i]);
                recipeInfoStorage.appendChild(recipe2Heading[i]);
                recipeInfoStorage.appendChild(recipe2Para[i]);
              });
              return data2;
            })
            .then((data2) => {
              // This is data about recipe Nutrients.

              box[i].addEventListener("click", function () {
                subHeading1[i] = document.createElement("h2");
                subHeading1[i].classList.add("recipe2-heading2");
                subHeading1[i].textContent = "Nutrients:";
                recipeNut[i] = document.createElement("div");
                recipeNut[i].classList.add("recipe2-nut");

                fetch(
                  `https://api.spoonacular.com/recipes/${data2.id}/nutritionWidget.json?apiKey=d3f492ca2e974370860d47cf0eb89c51`
                )
                  .then((res) => {
                    return res.json();
                  })
                  .then((nutData) => {
                    console.log("the nut data is :", nutData);
                    nutList[0] = document.createElement("span");
                    nutList[0].classList.add("nut-list");
                    nutList[0].textContent = `Calories: ${nutData.calories}`;
                    nutList[1] = document.createElement("span");
                    nutList[1].classList.add("nut-list");
                    nutList[1].textContent = `Protein: ${nutData.protein}`;
                    nutList[2] = document.createElement("span");
                    nutList[2].classList.add("nut-list");
                    nutList[2].textContent = `Fat: ${nutData.fat}`;
                    nutList[3] = document.createElement("span");
                    nutList[3].classList.add("nut-list");
                    nutList[3].textContent = `Carbs: ${nutData.carbs}`;
                    recipeNut[i].appendChild(nutList[0]);
                    recipeNut[i].appendChild(nutList[1]);
                    recipeNut[i].appendChild(nutList[2]);
                    recipeNut[i].appendChild(nutList[3]);
                  })
                  .catch((e) => {
                    console.log(
                      "The error in nutrients section is :",
                      e.message
                    );
                  });

                recipeInfoStorage.appendChild(subHeading1[i]);
                recipeInfoStorage.appendChild(recipeNut[i]);
              });

              return data2;
            })
            .then((data2) => {
              // this is data about recipe ingredient

              box[i].addEventListener("click", function () {
                subHeading2[i] = document.createElement("h2");
                subHeading2[i].classList.add("recipe2-heading2");
                subHeading2[i].textContent = "Ingredients:";

                fetch(
                  `https://api.spoonacular.com/recipes/${data2.id}/ingredientWidget.json?apiKey=d3f492ca2e974370860d47cf0eb89c51`
                )
                  .then((res) => {
                    return res.json();
                  })
                  .then((ingreData) => {
                    console.log("ingredient data is : ", ingreData);
                    recipeInfoStorage.appendChild(subHeading2[i]);
                    recipeItems[i] = document.createElement("div");
                    recipeItems[i].classList.add("recipe2-items");
                    for (let j = 0; j < ingreData.ingredients.length; j++) {
                      itemPara[j] = document.createElement("span");
                      itemPara[j].classList.add("item-para");
                      itemPara[
                        j
                      ].textContent = `${ingreData.ingredients[j].amount.us.value} ${ingreData.ingredients[j].amount.us.unit} ${ingreData.ingredients[j].name}`;
                      recipeItems[i].appendChild(itemPara[j]);
                      recipeInfoStorage.appendChild(recipeItems[i]);
                    }
                  })
                  .catch((e) => {
                    console.log(
                      "The error in Ingredient section is : ",
                      e.message
                    );
                  });
              });

              return data2;
            })
            .then((data2) => {
              // this is data about recipe related other links

              box[i].addEventListener("click", function () {
                subHeading3[i] = document.createElement("h2");
                subHeading3[i].classList.add("recipe2-heading2");
                subHeading3[i].textContent = "Other Links of Same Recipe";
                recipe2Urls[i] = document.createElement("div");
                recipe2Urls[i].classList.add("recipe2-urls");
                recipe2Links[0] = document.createElement("a");
                recipe2Links[0].classList.add("recipe2-link");
                recipe2Links[0].href = data2.sourceUrl;
                recipe2Links[0].target = "_blank";
                recipe2Links[0].textContent = "Source Link1";
                recipe2Links[1] = document.createElement("a");
                recipe2Links[1].classList.add("recipe2-link");
                recipe2Links[1].href = data2.spoonacularSourceUrl;
                recipe2Links[1].target = "_blank";
                recipe2Links[1].textContent = "Spoonacular Source Link";
                recipe2Urls[i].appendChild(recipe2Links[0]);
                recipe2Urls[i].appendChild(recipe2Links[1]);
                recipeInfoStorage.appendChild(subHeading3[i]);
                recipeInfoStorage.appendChild(recipe2Urls[i]);
              });
            })
            .catch((e) => {
              console.log("the error in recipe data is : ", e.message);
            });
        }
      }
    });
}
