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

        this.gameScore = 0;

        this.exhibitGroup = this.add.group({
            runChildUpdate: true
        });

        this.testExh1 = new Exhibit(this, 270, 100, 'tempExh', "A");
        this.testExh2 = new Exhibit(this, 135, 100, 'tempExh', "B");
        this.testExh3 = new Exhibit(this, 405, 100, 'tempExh', "C");

        this.exhibitGroup.add(this.testExh1);
        this.exhibitGroup.add(this.testExh2);
        this.exhibitGroup.add(this.testExh3);

        this.player = new Player(this, 270, 480);

        this.artifactGroup = this.add.group({
            runChildUpdate: true
        });

        this.testArt1 = new Artifact(this, 270, 900, 'tempArt', "A");
        this.testArt2 = new Artifact(this, 135, 900, 'tempArtB', "B");
        this.testArt3 = new Artifact(this, 405, 900, 'tempArt', "A");
        this.testArt4 = new Artifact(this, 270, 900 - 100, 'tempArtC', "C");
        this.testArt5 = new Artifact(this, 135, 900 - 100, 'tempArtC', "C");
        this.testArt6 = new Artifact(this, 405, 900 - 100, 'tempArt', "A");
        this.testArt7 = new Artifact(this, 270, 900 - 200, 'tempArtB', "B");
        this.testArt8 = new Artifact(this, 135, 900 - 200, 'tempArtC', "C");
        this.testArt9 = new Artifact(this, 405, 900 - 200, 'tempArtB', "B");

        this.artifactGroup.add(this.testArt1);
        this.artifactGroup.add(this.testArt2);
        this.artifactGroup.add(this.testArt3);
        this.artifactGroup.add(this.testArt4);
        this.artifactGroup.add(this.testArt5);
        this.artifactGroup.add(this.testArt6);
        this.artifactGroup.add(this.testArt7);
        this.artifactGroup.add(this.testArt8);
        this.artifactGroup.add(this.testArt9);
    }

    update() {
        this.player.update();
        this.checkPlayerArtifact()
        this.interactArtifacts();
    }


    checkPlayerArtifact() {
        const playerBox = this.player.getBounds();
        let foundFirst = false;
        if (this.player.getHolding()) {
            return;
        }
        for (let type of this.artifactGroup.getChildren()) {
            const artBox = type.getBounds();
            if (Phaser.Geom.Rectangle.Overlaps(playerBox, artBox) && foundFirst == false) {
                type.setInRange(true);
                foundFirst = true;
            } else {
                type.setInRange(false);
            }
        }
    }

    interactArtifacts() {
        if (Phaser.Input.Keyboard.JustDown(keyQ)) {
            this.resetSpeed();
            for (let type of this.artifactGroup.getChildren()) {
                if (type.getInRange() == true) {
                    if (!this.player.getHolding()) {
                        this.player.setHolding(true);
                        type.setPickedUp(true);
                    } else {
                        this.player.setHolding(false);
                        type.setPickedUp(false);
                        this.checkExhibits()
                    }
                }
            }
            this.resetSpeed();
        }
    }

    resetSpeed() {
        this.player.setVelocity(0);
        for (let type of this.artifactGroup.getChildren()) {
            type.setVelocity(0);
        }
    }

    checkExhibits() {
        this.gameScore = 0;
        for (let exh of this.exhibitGroup.getChildren()) {
            const exhBox = exh.getBounds();
            for (let art of this.artifactGroup.getChildren()) {
                const artBox = art.getBounds();
                if (Phaser.Geom.Rectangle.Overlaps(exhBox, artBox) && exh.getType() == art.getType()) {
                    this.gameScore += 1;
                }
            }
        }
        console.log(this.gameScore);
    }
}