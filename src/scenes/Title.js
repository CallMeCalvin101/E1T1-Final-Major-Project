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

        this.load.image('JBoxFull', 'Japanese Box Large.png');
        this.load.image('JBoxIcon', 'Japanese Box Small.png');
        this.load.image('JBoxIconHL', 'Japanese Box Small HL.png');
    }

    create() {
        console.log("test");
        this.scene.start('playScreen');
        //this.scene.start('endScreen');
    }
}