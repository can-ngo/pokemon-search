const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
const randomBtn = document.getElementById("random-button");
const prevBtn = document.getElementById("prev-button");
const nextBtn = document.getElementById("next-button");
const pokemonInfo = document.getElementById("pokemon-info");
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const pokemonWeight = document.getElementById("weight");
const pokemonHeight = document.getElementById("height");
const pokemonSprite = document.getElementById("sprite");
const pokemonTypes = document.getElementById("types");
const hpBox = document.getElementById("hp");
const attackBox = document.getElementById("attack");
const defenseBox = document.getElementById("defense");
const specialAttackBox = document.getElementById("special-attack");
const specialDefenseBox = document.getElementById("special-defense");
const speedBox = document.getElementById("speed"); 
const pokeApiProxy = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";
const pokeApi = "https://pokeapi.co/api/v2/pokemon";
let totalPokemon;
//Because pokemon id lies between 2 ranges: [1-1025] and [10001-10277]
const arrOne = Array(1025).fill().map((_,i)=> i + 1);
const arrTwo = Array(277).fill().map((_,i)=>i + 1 + 10000);
const totalPokemonIdArray = arrOne.concat(arrTwo);
let index = 0;

const searchPokemon = () => {
  const searchValue = searchInput.value.toLowerCase();
  
  fetchData(pokeApiProxy).then(totalData => {

  if(!searchValue){    
    alert("Pokemon not found");
    return
  } 
    else 
    {
      let pokemonUrl = "";
      
      pokemonUrl = pokeApiProxy + `/${searchValue}`;
  
      fetchData(pokemonUrl).then(data=>{
      const {base_experience,
      height,
      id,
      name,
      order,
      sprites,
      stats,
      types,
      weight} = data;
      
      showFullPokemonInfo(name,id,weight,height,types,stats,sprites);
      
      index = totalPokemonIdArray.indexOf(id);

      }); 
    }
  })
   
}

const randomPokemon = () => {

  fetchData(pokeApiProxy).then(totalData => {
      let randomIndex = Math.floor(Math.random()*totalPokemonIdArray.length);
      let randomId = totalPokemonIdArray[randomIndex];
      let pokemonUrl = "";

      index = randomIndex;
      
      pokemonUrl = pokeApiProxy + `/${randomId}`;
      
      fetchData(pokemonUrl).then(data=>{
      const {base_experience,
      height,
      id,
      name,
      order,
      sprites,
      stats,
      types,
      weight} = data;
      
      showFullPokemonInfo(name,id,weight,height,types,stats,sprites);
      
      }); 
    })
}


const prevPokemon = () => {
  
  if (index === 0){
    index = totalPokemonIdArray.length;
  }  
  
  index -= 1;

  let pokemonUrl = "";
      
      pokemonUrl = pokeApiProxy + `/${totalPokemonIdArray[index]}`;
      
      fetchData(pokemonUrl).then(data=>{
      const {base_experience,
      height,
      id,
      name,
      order,
      sprites,
      stats,
      types,
      weight} = data;
      
      showFullPokemonInfo(name,id,weight,height,types,stats,sprites);     
  })
    
}

const nextPokemon = () => {
  if (index === totalPokemonIdArray.length-1){
    index = 0;
  }
  
  let pokemonUrl = "";
      
  pokemonUrl = pokeApiProxy + `/${totalPokemonIdArray[index]}`;
      
      fetchData(pokemonUrl).then(data=>{
      const {base_experience,
      height,
      id,
      name,
      order,
      sprites,
      stats,
      types,
      weight} = data;
      
      showFullPokemonInfo(name,id,weight,height,types,stats,sprites);
      index += 1;
    })
  
}

async function fetchData (url) {
  try {
    const res = await fetch(url);
    const data = await res.json(); 
    return data;
  }
  catch (err) {
    console.log(err);
    alert("Pokemon not found");
  }
};

const showFullPokemonInfo = (name,id,weight,height,types,stats,sprites) => {
  pokemonName.textContent = name.toUpperCase();
      pokemonId.textContent = ` #${id}`;
      pokemonWeight.textContent = `Weight: ${weight} `;
      pokemonHeight.textContent = `Height: ${height}`;
      // pokemonSprite.src = sprites.front_default;
      pokemonSprite.src = `./showdown/${id}.gif`;
      
      //Whenever a .gif not found, we use .png for that pokemon
      pokemonSprite.onerror = (e) => {
        pokemonSprite.src = sprites.front_default;
      }

      let type = [];
      types.forEach(obj =>{
        type.push(obj.type.name);
      });

      pokemonTypes.innerHTML = ``;
      type.forEach(item => {
        pokemonTypes.innerHTML += `<span class="types ${item}">${item}</span>`
      })


      let pokemonStats = {};
      stats.forEach(obj=>{
        pokemonStats[obj.stat.name] = obj.base_stat;
      })
      
      const {hp,
      attack,
      defense,
      'special-attack': specialAttack,
      'special-defense': specialDefense,
      speed
      } = pokemonStats;

      hpBox.innerText = hp;
      attackBox.innerText = attack;
      defenseBox.innerText = defense;
      specialAttackBox.innerText = specialAttack;
      specialDefenseBox.innerText = specialDefense;
      speedBox.innerText = speed;
}

searchBtn.addEventListener("click",searchPokemon);

randomBtn.addEventListener("click",randomPokemon);

prevBtn.addEventListener("click",prevPokemon);

nextBtn.addEventListener("click",nextPokemon);