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
        keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

        this.player = new Player(this, 270, 480);

        this.artifactGroup = this.add.group({
            runChildUpdate: true
        });

        this.testArt1 = new Artifact(this, 270, 900);
        this.testArt2 = new Artifact(this, 135, 900);
        this.testArt3 = new Artifact(this, 405, 900);

        this.artifactGroup.add(this.testArt1);
        this.artifactGroup.add(this.testArt2);
        this.artifactGroup.add(this.testArt3);

        this.exhibitGroup = this.add.group({
            runChildUpdate: true
        });

        this.testExh1 = new Exhibit(this, 270, 100);
        this.testExh2 = new Exhibit(this, 135, 100);
        this.testExh3 = new Exhibit(this, 405, 100);

        this.exhibitGroup.add(this.testExh1);
        this.exhibitGroup.add(this.testExh2);
        this.exhibitGroup.add(this.testExh3);

        this.initArtifacts();
    }

    update() {
        this.player.update();
        this.interactArtifacts();
    }

    initArtifacts() {
        for (let type of this.artifactGroup.getChildren()) {
            this.physics.add.overlap(this.player, type, () => {
                type.setInRange(true);
            }, null, this);
        }
    }

    interactArtifacts() {
        for (let type of this.artifactGroup.getChildren()) {
            if (type.getInRange() == true) {
                if (Phaser.Input.Keyboard.JustDown(keyQ)) {
                    if (!this.player.getHolding()) {
                        this.player.setHolding(true);
                        console.log("Q");
                        type.setPickedUp(true);
                    } else {
                        this.player.setHolding(false);
                        console.log("Q");
                        type.setPickedUp(false);
                    }
                }
            }
        }
    }
}