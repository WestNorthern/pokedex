
class Pokedex {
	constructor(pokemonArray){
		this.pokemonArray = pokemonArray;
	}

	showDetails(){

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

	testDex.listAllPokemon();



}); // End of document ready function

