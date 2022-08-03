class Title extends Phaser.Scene {
    constructor() {
        super('titleScreen');
    }

    preload() {
        this.load.path = './assets/';
        this.load.image('player', 'playerSprite.png');
        this.load.image('tempArt', 'tempArtifact.png');
    }

    create() {
        console.log("test");
        this.scene.start('playScreen');
    }
}