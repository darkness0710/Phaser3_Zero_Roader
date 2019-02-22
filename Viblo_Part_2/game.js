class gameScene {
  constructor() {
  	// code
  	this.player = null;
  	this.stars = null;
  	this.cursors = null;
    this.score = 0;
    this.scoreText = null;
  }

  preload () {
  	this.load.image('player', 'assets/player2.png');
  	this.load.image('sky', 'assets/sky.png');
  	this.load.image('star', 'assets/star.png');
  }

  create () {
  	this.sky = this.add.sprite(0, 0, 'sky');
  	this.player = this.physics.add.sprite(100, 100, 'player');

    // Generate Stars
    this.generateStars();

  	// Config location x,y
  	this.sky.setOrigin(0, 0);
  	this.player.setOrigin(0, 0);

    // Set Text Score
    this.scoreText = this.add.text(320, 16, 'Score: ' + this.score, { fontSize: '32px', fill: '#000' });

  	// Load event curor
  	this.cursors = this.input.keyboard.createCursorKeys();

    // Add Event player and Star
    this.physics.add.overlap(this.player, this.stars, this.hitStar, null, this);
  }

  hitStar (player, star) {
    star.disableBody(true, true);
    this.score += 1;
    this.scoreText.setText('Score: ' + this.score);
    if (this.score % 12 === 0) {
      this.generateStars();
    }
  }

  generateStars() {
    this.stars = this.physics.add.group({
      key: 'star',
      repeat: 11,
      setXY: { x: 12, y: 350, stepX: 70 }
    });
    this.physics.add.overlap(this.player, this.stars, this.hitStar, null, this);
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