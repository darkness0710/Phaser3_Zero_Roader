class gameScene {
  constructor() {
  	// code
  	this.player = null;
  	this.star = null;
  	this.cursors = null;
  }

  preload () {
  	this.load.image('player', 'assets/player2.png');
	this.load.image('sky', 'assets/sky.png');
	this.load.image('star', 'assets/star.png');
  }

  create () {
  	this.sky = this.add.sprite(0, 0, 'sky');
  	this.player = this.physics.add.sprite(100, 100, 'player');
  	this.star = this.physics.add.sprite(300, 300, 'star');

  	// Config location x,y
  	this.sky.setOrigin(0, 0);
  	this.player.setOrigin(0, 0);

  	// Load event curor
  	this.cursors = this.input.keyboard.createCursorKeys();

	this.physics.add.collider(this.player, this.bombs, this.break, null, this);
  }

  break() {
    this.star.destroy();
  }

  update (time, delta) {
	if (this.cursors.right.isDown) {
	  this.player.x += 3;
	} else if (this.cursors.left.isDown) {
	  this.player.x -= 3;
	} else if (this.cursors.down.isDown) {
	  this.player.y += 3;
	} else if (this.cursors.up.isDown) {
	  this.player.y -= 3;
	}
  }
}

window.onload = function (e) {
	const config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        scene: gameScene,
        physics: {
        	default: 'arcade'
        },
        parent: 'game',
    };

    const game = new Phaser.Game(config);
}