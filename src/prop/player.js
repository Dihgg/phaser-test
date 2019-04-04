class Player {
	constructor( Game, x, y, name) {
		this.Game = Game;
		this.x = x || 0;
		this.y = y || 0;
		this.velocity = 200;

		this.sprite = this.Game.add.sprite( this.x, this.y, name );

		this.Game.physics.world.enable( this.sprite );

		this.sprite.body.collideWorldBounds = true;

		[
			{
				'key'	: "idle",
				'start'	: 8,
				'end'	: 14,
				'loop'	: true
			},
			{
				'key'	: "running",
				'start'	: 1,
				'end'	: 7,
				'loop'	: true
			}
		].forEach( (anim) => {
			this.Game.anims.create({
				'key'		: anim.key,
				'frames'	: this.Game.anims.generateFrameNumbers( "ramona", { 'start' : anim.start, 'end': anim.end } ),
				'frameRate'	: 10,
				'repeat'	: (anim.loop == true)? -1 : anim.loop
			});
		} );
	}

	update() {
		let cursors = this.Game.input.keyboard.createCursorKeys();
		// animations
		if ( cursors.left.isDown || cursors.right.isDown || cursors.up.isDown || cursors.down.isDown ) {
			this.sprite.anims.play( "running", true );
		} else this.sprite.anims.play( "idle", true );

		// moviment
		if ( cursors.left.isDown ) {
			this.sprite.body.setVelocityX(-this.velocity);
			this.sprite.flipX = true;
		} else if ( cursors.right.isDown ) {
			this.sprite.body.setVelocityX(this.velocity);
			this.sprite.flipX = false;
		} else this.sprite.body.setVelocityX(0);

		if ( cursors.up.isDown ) this.sprite.body.setVelocityY(-this.velocity);
		else if ( cursors.down.isDown ) this.sprite.body.setVelocityY(this.velocity);
		else this.sprite.body.setVelocityY(0);
	}
}
