class Instruction extends Phaser.Scene {
    constructor() {
        super('instructionScreen');
    }

    create() {
        this.scene.start('playScreen');
    }
}