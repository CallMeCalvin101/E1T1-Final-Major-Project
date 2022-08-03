let config = {
    type: Phaser.CANVAS,
    width: 540,
    height: 960,
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
    scene: [Title]
}

let game = new Phaser.Game(config);