class Exhibit extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, type) {
        super(scene, x, y, texture = 'tempExh', 0);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.type = type;
    }

    getType() {
        return this.type;
    }
}