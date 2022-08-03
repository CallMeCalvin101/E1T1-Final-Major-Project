class Play extends Phaser.Scene {
    constructor() {
        super('playScreen');
    }

    create() {
        // Define Keys
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        this.player = new Player(this, 270, 480)
        this.testArt1 = new Artifact(this, 270, 900)
    }

    update() {
        this.player.update();
        this.testArt1.update();
    }
}