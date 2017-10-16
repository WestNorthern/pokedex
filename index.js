
class Pokedex {
	constructor(pokemonArray){
		this.pokemonArray = pokemonArray;
	}

	getInfo(id){
		cachedFetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
		.then(r => r.json()) 
		.then(res => { 
			console.log(res);
			$('#pokeInfo').append(`
				<div class='pokeInfo'>No. ${res.id}: ${res.name}</div>
				<div class='pokeInfo'>Weight: ${res.weight}</div>
				<div class='pokeInfo'>Moves: 
					<ul>
						<li>${res.moves[0].move.name}</li>
						<li>${res.moves[1].move.name}</li>
						<li>${res.moves[2].move.name}</li>
						<li>${res.moves[3].move.name}</li>
					</ul>
				</div>
				<div class='pokeInfo'>Height: ${res.height}</div>
				<div class='pokeInfo'>Experience: ${res.base_experience}</div>
				<div class='pokeInfo'>Type: ${res.types[0].type.name}</div>

			`);
		})
	}

	listImages(){
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
				<img src="${res.sprites.front_default}" />
			`);
		 })
			
	}

	makeFavorite(){

	}

	listAllPokemon(){
		for (var i = 0; i < pokemonArray.length; i++) {
			$('#names').append(`
					<div class="pokeName" data-count="${i}"> ${pokemonArray[i]} </div>
			`);
		}
	}

	sortPokemon(){

	}

	cacheCall(url, func){
		cachedFetch(url) 
		.then(r => r.json()) 
		.then(res => { func() })
	}
}



$(function(){ // Document Ready Function

	let testDex = new Pokedex();

	$(document).on('click', '.pokeName', function() {
		let id = $(this).data('count');
		testDex.getSprite(id + 1);
	});
  
  $(document).on('click', '.pokeName', function() {
		let id = $(this).data('count');
		testDex.getInfo(id + 1);
	});

	testDex.listAllPokemon();



}); // End of document ready function

// Empty cache and hard reset for nidoran

