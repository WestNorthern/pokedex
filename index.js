
class Pokedex {
	constructor(pokemonArray){
		this.pokemonArray = pokemonArray;
		this.favorites = ['bulbasaur', 'pikachu', 'ditto'];
		this.currentPokemon = 'ditto';
	}

	getInfo(id){
		
		cachedFetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
		.then(r => r.json()) 
		.then(res => { 
			console.log(res);
			$('#pokeInfo').append(`
				<div class='pokeInfo'>No. ${res.id} -- ${res.name.charAt(0).toUpperCase() + res.name.slice(1)}</div>
				<div class='pokeInfo'>Weight: ${res.weight} Kg -- Height: ${res.height} "</div>
				<div class='pokeInfo'>Moves: 
					<ul>
						<li>${res.moves[0].move.name}</li>
						<li>${res.moves[1].move.name}</li>
						<li>${res.moves[2].move.name}</li>
						<li>${res.moves[3].move.name}</li>
					</ul>
				</div>
				<div class='pokeInfo' id='exp'>Experience: ${res.base_experience}</br>
					<div id='this-exp' style='width: ${(res.base_experience / 320) * 50}%;'></div><div id='total-exp'></div>
				</div>
				<div class='pokeInfo'>Type: ${res.types[0].type.name}</div>

			`);
			this.currentPokemon = res.name;
		})
	}

	listImages(){ // Never Use This!
		for (var i = 0; i < pokemonArray.length; i++) {
			cachedFetch(`https://pokeapi.co/api/v2/pokemon/${pokemonArray[i]}`)
			.then(r => r.json()) 
			.then(res => { 
			console.log(res);
			let nonsense = res;
				$('#images').append(`
					<img src="${nonsense.sprites.front_default}" />
					`);
		 	})
		}
	}

	getSprite(id){
		
		cachedFetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
		.then(r => r.json()) 
		.then(res => { 
			console.log(res);
			$('#images').append(`
				<img id="sprite" src="${res.sprites.front_default}" />
			`);
		 })
			
	}

	makeFavorite(){
		if (this.favorites.includes(this.currentPokemon)){

			this.favorites.splice(this.favorites.indexOf(this.currentPokemon), 1);
		}
		else{
			this.favorites.push(this.currentPokemon);
		}
		$('#names').empty();
		this.listAllPokemon();
	}

	listAllPokemon(){
		for (var i = 0; i < pokemonArray.length; i++) {
			if (this.favorites.includes(pokemonArray[i])){
				$('#names').prepend(`
					<div class="pokeName" data-count="${i}"> ${pokemonArray[i].charAt(0).toUpperCase() + pokemonArray[i].slice(1)} <img src="star_full.png"></div>
				`);
			}
			else{
			$('#names').append(`
					<div class="pokeName" data-count="${i}"> ${pokemonArray[i].charAt(0).toUpperCase() + pokemonArray[i].slice(1)} <img src="star_empty.png"></div>
				`);
			}
		}
	}

	sortPokemon(){

	}
  
  emptyInfo(){
  	
  	$('#images').empty();
  	$('#pokeInfo').empty();
  }
}



$(function(){ // Document Ready Function

	let testDex = new Pokedex();

	$(document).on('click', '.pokeName', function() {
		let id = $(this).data('count');
		testDex.emptyInfo();
		testDex.getSprite(id + 1);
		testDex.getInfo(id + 1);
		
	});

	$(document).on('click', '#favButton', function() {
		testDex.makeFavorite();
		console.log(testDex.favorites);
	});
  

	testDex.listAllPokemon();



}); // End of document ready function

// Empty cache and hard reset for nidoran

