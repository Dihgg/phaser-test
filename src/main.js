// VARIABLES
var player,
	score = 0,
	scoreTxt,

	audioCoin;

// GAME INIT
var Game = new Phaser.Game( {
	type: Phaser.AUTO,
	width: 600,
	height: 400,
	physics: {
		default: 'arcade'
	},
	scene: {
		preload: preload,
		create: create,
		update: update
	}
} );

// FUNCTIONS
function preload () {
	// preload them'all
	this.load.spritesheet( 'ramona', 'assets/images/ramona.png', {
		frameWidth 	: 77,
		frameHeight	: 80
	} );
	this.load.image( 'coin', "assets/images/coin.png" )
	this.load.audio( 'coin', "assets/audio/coin.wav" );
}

function create () {

	player	= new Player( this, 100, 100, 'ramona' ); // Create the Player Object

	coins	= this.physics.add.staticGroup(); // create the coins group

	// create a bunch of coins
	for (var i = 0; i < 10; i++) coins.create( Phaser.Math.Between( 0, this.cameras.main.width ), Phaser.Math.Between( 0, this.cameras.main.height ), 'coin');

	// create the physics overlap bewteen the player and the coins
	this.physics.add.overlap( player.sprite, coins, collectCoin, null, this );

	// create the score
	scoreTxt = this.add.text( 16, 16, 'score: 0', { fontSize: '16px', fill: '#fff' } );

	audioCoin	= this.sound.add( 'coin' ); // add the sound fx

}

function update () {
	player.update(); // call player update methods
}

// EVENTS
// overlap between player and coin
function collectCoin(player, coin) {
	coin.disableBody(true, true); // hide the coin
	score += 10; // update the score
	scoreTxt.setText('score: ' + score); // update the score text

	audioCoin.play(); // play the sound Fx

	// upon collecting all the coins
	if (coins.countActive( true ) === 0 ) {
		let _camera = this.cameras.main; // get main camera reference
		// re-enable an reposition the coins
		coins.children.iterate( function ( child ) {
			child.enableBody( true, Phaser.Math.Between( 0, _camera.width ), Phaser.Math.Between( 0, _camera.height ), true, true );
		});
	}
}
