// get search elem
const searchInput = document.querySelector('#header-search-bar');

// when user presses enter on search
searchInput.addEventListener('search', async function (event) {
    const userText = searchInput.value; // grab user text
    const data = await fetchRandomPerson();
    console.log(data.filter(name => name.first == userText));
});

async function fetchRandomPerson() {
    const url = await fetch(`https://randomuser.me/api?results=50&&gender=male`);
    const json = await url.json();
    console.log(json.results)
    return json.results;
}



// fetch(url).then(
//     function(response){
//         return response.json();
//     }
// ).then(function(myJson){
//     for(i = 0; i< myJson.results.length; i++){
// let createLi = document.createElement("li");
// createLi.innerHTML += `<li><a href=""> ${myJson.results[i].name.first} </a></li>`

// document.querySelector("ul").append(createLi);


//     }
   
// });


