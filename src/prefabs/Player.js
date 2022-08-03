class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'player', 0);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        // Player Parameters
        this.walkAcceleration = 600;
        this.maxSpeed = 300;
        this.drag = 0.05;

        // Implements Player Properties
        this.setCollideWorldBounds(true);
        this.setMaxVelocity(this.maxSpeed);
        this.setDamping(true);
    }

    update() {
        if (keyW.isDown) {
            this.setAccelerationY(-this.walkAcceleration);
        } else if (keyS.isDown) {
            this.setAccelerationY(this.walkAcceleration);
        }

        if (keyA.isDown) {
            this.setAccelerationX(-this.walkAcceleration);
        } else if (keyD.isDown) {
            this.setAccelerationX(this.walkAcceleration);
        }

        if (keyW.isUp && keyS.isUp) {
            this.setAccelerationY(0);
            this.setDragY(this.drag);
        }

        if (keyA.isUp && keyD.isUp) {
            this.setAccelerationX(0);
            this.setDragX(this.drag);
        }
    }
}