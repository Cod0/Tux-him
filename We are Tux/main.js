/*global document, window, alert, console, require, Phaser, preload, create, update*/

var game = new Phaser.Game(640, 360, Phaser.AUTO, ' ', { preload: preload, create: create, update: update });

var cursors;
var players;
var platforms;
var button;
var text;

function preload() {
    game.load.image('tux', 'assets/images/player.png')
    game.load.image('tux2', 'assets/images/player2.png')
    game.load.image('background', 'assets/images/background.png')
    game.load.image('floor', 'assets/images/grassMid.png')
    game.load.image('button', 'assets/images/button.png')
    game.load.audio('jump', ['assets/sounds/BounceYoFrankie.mp3'])
    game.load.audio('soundtrack', ['assets/sounds/HeroicDemise.wav'])
}

function create() {
    
    //Muziek wordt afgespeeld
    music = game.add.audio('soundtrack')
    music.play('',0,1,true);
    
    //Scaling naar midden en automatische rescale
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    
    //Set background vanuit een sprite
    game.background = game.add.sprite(0, 0, 'background');
    
    //Var cursors krijgt de data van keyboard
    cursors = game.input.keyboard.createCursorKeys ();
    
    //Start ingebouwde physics engine
    game.physics.startSystem(Phaser.Physics.ARCADE);
    
    //Floor groep wordt gemaakt, en met de functie wordt de vloer opgeroepen
    platforms = game.add.group();
    platforms.enableBody = true;
    createPlatforms(0, game.world.height - 35);
    createPlatforms(70, game.world.height - 35);
    createPlatforms(140, game.world.height - 35);
    createPlatforms(210, game.world.height - 35);
    createPlatforms(280, game.world.height - 35);
    createPlatforms(350, game.world.height - 35);
    createPlatforms(420, game.world.height - 35);
    createPlatforms(490, game.world.height - 35);
    createPlatforms(560, game.world.height - 35);
    createPlatforms(630, game.world.height - 35);
    createPlatforms(700, game.world.height - 35);
    
    //Fullscreen button
    button = game.add.sprite(580, 50, 'button');
    button.inputEnabled = true;
    button.pixelPerfectClick = true;
    button.anchor.set(0.5);
    button.events.onInputDown.add(goFullscreen, this);
    text = game.add.text(250, 30, 'Click for fullscreen -->');
    text = game.add.text(20, 20, 'Get On Top!', { fill: '#c0392b'});
    
    //game.input.onDown.add(goFullscreen, this);
    
    //Players groep wordt gemaakt, en de players worden aangemaakt met een functie
    players = game.add.group();
    players.enableBody = true;
    createPlayer(10, 10, -300, 100, 'tux2');
    createPlayer(200, 10, -325, 150, 'tux');s
    
    
}

function update() {
    playerUpdate();
}

//Functie die players maakt in de groep players, en ze eventueel apparte atributen geeft
function createPlayer(x,y,j,v,p) {
    var player = players.create(x,y,p);
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;
    player.body.bounce.y = 0.2;
    player.jump = j;
    player.v = v;
    player.p = p;
}

function playerUpdate () {
    
    //If script voor het lopen van de players, en het colide van de players
    game.physics.arcade.collide(players, players);
    game.physics.arcade.collide(platforms, players);
    players.forEach(function(p) {
      p.body.velocity.x = 0;
        if(cursors.left.isDown){
            p.body.velocity.x = -p.v; 
        }else if(cursors.right.isDown){
            p.body.velocity.x = p.v;
        }
        
        //Jump control
        if(cursors.up.isDown && p.body.touching.down){
            var snd = game.add.audio('jump');
            snd.play();
            p.body.velocity.y = p.jump;
        }
        
        if(game.physics.arcade.collide(players, players)) {
            text.text = "You won!";
            p.body.velocity.set(0);
        }
    });
}

function createPlatforms(x,y){
    var ground = platforms.create(x, game.world.height - 35, 'floor');
    ground.body.immovable = true;
}

//functie voor fullscreen mode
function goFullscreen() {
    game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.startFullScreen();
}

