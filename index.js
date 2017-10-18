
class Pokedex {
	constructor(pokemonArray){
		this.pokemonArray = pokemonArray;
		this.favorites = ['bulbasaur', 'pikachu', 'ditto'];
		this.currentPokemon = 'ditto';
		this.littleSprites = [];
	}

	getInfo(id){
		
		cachedFetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
		.then(r => r.json()) 
		.then(res => { 
			console.log(res);
			$('#pokeInfo').append(`
				<div class='pokeInfo'>数: ${res.id} -- ${res.name.charAt(0).toUpperCase() + res.name.slice(1)}</div>
				<div class='pokeInfo'>Weight: ${res.weight} キ -- Height: ${res.height} ウ</div>
				
				<div class='pokeInfo' id='exp'>Experience: ${res.base_experience}</br>
					<div id='this-exp' style='width: ${(res.base_experience / 320) * 50}%;'></div><div id='total-exp'></div>
				</div>
				<div class='pokeInfo'>Type: ${res.types[0].type.name}</div>
				<div class='pokeInfo'><span style='text-align: left;'>Moves:</span> 
					<ul>
						<li>${res.moves[0].move.name}</li>
						<li>${res.moves[1].move.name}</li>
						<li>${res.moves[2].move.name}</li>
						<li>${res.moves[3].move.name}</li>
					</ul>
				</div>

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

			this.littleSprites = [];
			this.currentPokemon = res.name;

			$('#sprites').empty();

			if(res.sprites.back_female !== null){
				this.littleSprites.push(res.sprites.back_female);
			}
			if(res.sprites.back_shiny_female !== null){
				this.littleSprites.push(res.sprites.back_shiny_female);
			}
			if(res.sprites.back_default !== null){
				this.littleSprites.push(res.sprites.back_default);
			}
			if(res.sprites.front_female !== null){
				this.littleSprites.push(res.sprites.front_female);
			}
			if(res.sprites.front_shiny_female !== null){
				this.littleSprites.push(res.sprites.front_shiny_female);
			}
			if(res.sprites.back_shiny !== null){
				this.littleSprites.push(res.sprites.back_shiny);
			}
			if(res.sprites.front_default !== null){
				this.littleSprites.push(res.sprites.front_default);
			}
			if(res.sprites.front_shiny !== null){
				this.littleSprites.push(res.sprites.front_shiny);
			}
      for (var i = 0; i < this.littleSprites.length; i++) {
				$('#sprites').append(`
				<img id="little-sprites" src=${this.littleSprites[i]} />
			  `);
			}
			if (this.favorites.includes(this.currentPokemon)){
				$('#favButton').attr('style', 'background: yellow;');
			}
			else{
				$('#favButton').attr('style', 'background: white;');
			}
		})
			
			console.log(this.littleSprites);
		
			
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

		if (this.favorites.includes(this.currentPokemon)){
				$('#favButton').attr('style', 'background: yellow;');
			}
			else{
				$('#favButton').attr('style', 'background: white;');
			}

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

