let base_url = "https://pokeapi.co/api/v2/pokemon/?limit=5";

let nav = false;
function fetchPokemon(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      for (let i = 0; i < data.results.length; i++) {
        renderPokemonCards(data.results[i].url);
      }
      document.getElementById("container").innerHTML = "";
      document.getElementById("forward").innerHTML = "";
      document.getElementById("back").innerHTML = "";
      if (data.previous != undefined) {
        document.getElementById("back").insertAdjacentHTML(
          "afterbegin",
          `<div id="#arrow-back" style="font-size:50px; color:white;" onclick="fetchPokemon(
            '${data.previous}'
          )"><i class="fas fa-arrow-left"></i><i class="fas fa-arrow-left"></i></div>`
        );
        document.getElementById("back").style.background =
          "rgba(255, 255, 255, 0.2)";
      } else {
        document.getElementById("back").style.background =
          "rgba(255, 255, 255, 0)";
      }

      document.getElementById("forward").insertAdjacentHTML(
        "beforeend",
        `<div id="#arrow-forward" style="font-size:50px; color:white;" onclick="fetchPokemon(
            '${data.next}'
          )"><i class="fas fa-arrow-right"></i><i class="fas fa-arrow-right"></i></div>`
      );
    });
}

let colors = {
  ghost: "#9f70ed",
  poison: "#d18fe6",
  water: "#629ae5",
  ice: "#b8cff7",
  bug: "#9bc67c",
  steel: "#b1b7c8",
  ground: "#75838c",
  rock: "#c0a242",
  dark: "#88867f",
  flying: "#54c7e1",
  fire: "#f1873b",
  grass: "#8be479",
  fight: "#f4716b",
  psychic: "#e73ea2",
  fairy: "#f665cd",
  electric: "#d4db1b",
  dragon: "#4c6d92",
  normal: "#b1b8a0",
};

document.querySelector(".fa-search").addEventListener("click", search);
let searchBar = document.getElementById("search");
searchBar.addEventListener("click", function () {
  document.querySelector(".search-error").classList.remove("active");
});

document.body.addEventListener("click", function () {
  document.querySelector(".search-error").classList.remove("active");
});

function search() {
  pokemon = searchBar.value.toLowerCase();
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`).then((response) => {
    if (response.ok) {
      console.log(response);
      if (response.url == `https://pokeapi.co/api/v2/pokemon/`) {
        document.querySelector(".search-error").classList.add("active");
      } else {
        document.getElementById("container").innerHTML = "";
        renderPokemonCards(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
      }
    } else {
      document.querySelector(".search-error").classList.add("active");
    }
  });
}
document.querySelector(".fa-redo-alt").addEventListener("click", function () {
  fetchPokemon(base_url);
});
fetchPokemon(base_url);

function renderPokemonCards(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let types = "";
      for (let type = 0; type < data.types.length; type++) {
        types += `<span>${data.types[type].type.name}</span>`;
      }

      let bg = "";
      if (data.types.length > 1) {
        bg = `background: linear-gradient(120deg, ${
          colors[data.types[0].type.name]
        } 40%, ${colors[data.types[1].type.name]} 40%);`;
      } else {
        bg = bg = `background: ${colors[data.types[0].type.name]}`;
      }

      let abilities = "";
      for (let x = 0; x < data.abilities.length; x++) {
        if (x < data.abilities.length - 1) {
          abilities += `${data.abilities[x].ability.name}, `;
        } else {
          abilities += `${data.abilities[x].ability.name}`;
        }
      }
      document.getElementById(
        "container"
      ).innerHTML += `<div class="pokeball-container">
        <div class="pokeball">
          <div class="line"></div>
          <div class="button"></div>
        </div>
        <div class="card" style="${bg}">
          <div class="title-info">
            <h1>${data.name}</h1>
            <div class="types">${types}</div>
          </div>
          <span class="imgContainer">
            <img
              src="${data.sprites.other["official-artwork"].front_default}"
              alt=""
            />
          </span>
          <div class="detailsContainer">
            <h3>Details</h3>
            <div class="details">
              <div class="detailHeading">
                <p>Height</p>
                <p>Weight</p>
                <p>Base stat</p>
                <p>Abilities</p>
              </div>
              <div class="description">
                <p>${data.height}</p>
                <p>${data.weight}</p>
                <p>${data.stats[0].base_stat}</p>
                <p>${abilities}</p>
              </div>
            </div>
          </div>
        </div>
        <h2 class="name">${data.name}</h2>
      </div>`;
      let pokeball = document.querySelectorAll(".pokeball");
      let card = document.querySelectorAll(".card");
      let pokeName = document.querySelectorAll(".name");

      for (let i = 0; i < pokeball.length; i++) {
        pokeball[i].addEventListener("click", function () {
          console.log(i);
          pokeball[i].classList.toggle("active");
          card[i].classList.toggle("active");
          pokeName[i].classList.toggle("active");
          document.querySelector(".search-error").classList.remove("active");
        });
        card[i].addEventListener("click", function () {
          pokeball[i].classList.toggle("active");
          card[i].classList.toggle("active");
          pokeName[i].classList.toggle("active");
          document.querySelector(".search-error").classList.remove("active");
        });
      }
    });
}
