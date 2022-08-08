class Title extends Phaser.Scene {
    constructor() {
        super('titleScreen');
    }

    preload() {
        this.load.path = './assets/';
        this.load.image('player', 'playerSprite.png');
        this.load.image('tempArt', 'tempArtifact.png');
        this.load.image('tempArtB', 'tempArtifactB.png');
        this.load.image('tempArtC', 'tempArtifactC.png');
        this.load.image('tempArtLight', 'tempArtifactSelected.png');
        this.load.image('tempExh', 'tempExhibit.png');
    }

    create() {
        console.log("test");
        this.scene.start('playScreen');
    }
}