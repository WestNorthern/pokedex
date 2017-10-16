$(function(){


/*
cachedFetch(url) 
.then(r => r.json()) 
.then(res => { //your code here where res is the json response with your pokemon data })
*/

// These two are equivalent
/*
$.ajax({
	url: 'asdf',
	type: 'GET',
	success: function(res){
		console.log(res);
	}
});
*/

class Pokedex {
	constructor(pokemonArray){
		this.pokemonArray = pokemonArray;
	}

	showDetails(){

	}

	makeFavorite(){

	}

	listAllPokemon(){

	}

	sortPokemon(){

	}
	
	cacheCall(url, func){
		cachedFetch(url) 
		.then(r => r.json()) 
		.then(res => { func() })
	}
}

console.log(pokemonArray);

let testDex = new Pokedex();

testDex.

}); // End of document ready function