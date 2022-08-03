let config = {
    type: Phaser.CANVAS,
    width: 540,
    height: 960,
    backgroundColor: '0xcccccc',
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    scene: [Title, Play]
};

let game = new Phaser.Game(config);

// Keyboard Inputs
let keyW, keyA, keyS, keyD;

// Game Pointer
let gamePointer;