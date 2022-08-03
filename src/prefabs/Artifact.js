class Artifact extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture='tempArt') {
        super(scene, x, y, texture, 0);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.pickedUp = false;
        this.walkAcceleration = 600;
        this.maxSpeed = 300;
        this.drag = 0.05;

        this.setCollideWorldBounds(true);
        this.setMaxVelocity(this.maxSpeed);
        this.setDamping(true);
    }

    update() {
        if (this.pickedUp) {
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

    
}