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
    scene: [Title, Instruction, Play, End]
};

let game = new Phaser.Game(config);

// Keyboard Inputs
let keyW, keyA, keyS, keyD, keyQ, keyE;
let finalScore;

// Game Pointer
let gamePointer;