let config = {
    type: Phaser.CANVAS,
    width: 480,
    height: 640,
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
    scene: [Load, Menu, Instructions, Play, Death]
}