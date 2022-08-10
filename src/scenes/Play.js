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

        finalScore = 0;
        this.isInspecting = false;

        this.exhibitGroup = this.add.group({
            runChildUpdate: true
        });

        this.testExh1 = new Exhibit(this, 145, 100, 'tempExh', "A");
        this.testExh2 = new Exhibit(this, 395, 100, 'tempExh', "B");
        this.testExh3 = new Exhibit(this, 145, 280, 'tempExh', "C");
        this.testExh3 = new Exhibit(this, 395, 280, 'tempExh', "D");

        this.exhibitGroup.add(this.testExh1);
        this.exhibitGroup.add(this.testExh2);
        this.exhibitGroup.add(this.testExh3);

        this.player = new Player(this, 270, 480);

        this.artifactGroup = this.add.group({
            runChildUpdate: true
        });

        this.JArt1 = new Artifact(this, 270, 900, 'JBoxIcon', "A", 'JBoxFull', 'JBoxIconHL');
        this.testArt2 = new Artifact(this, 135, 900, 'tempArtB', "B");
        this.testArt3 = new Artifact(this, 405, 900, 'tempArt', "A");
        this.testArt4 = new Artifact(this, 270, 900 - 100, 'tempArtC', "C");
        this.testArt5 = new Artifact(this, 135, 900 - 100, 'tempArtC', "C");
        this.testArt6 = new Artifact(this, 405, 900 - 100, 'tempArt', "A");
        this.testArt7 = new Artifact(this, 270, 900 - 200, 'tempArtB', "B");
        this.testArt8 = new Artifact(this, 135, 900 - 200, 'tempArtC', "C");
        this.testArt9 = new Artifact(this, 405, 900 - 200, 'tempArtB', "B");

        this.artifactGroup.add(this.JArt1);
        this.artifactGroup.add(this.testArt2);
        this.artifactGroup.add(this.testArt3);
        this.artifactGroup.add(this.testArt4);
        this.artifactGroup.add(this.testArt5);
        this.artifactGroup.add(this.testArt6);
        this.artifactGroup.add(this.testArt7);
        this.artifactGroup.add(this.testArt8);
        this.artifactGroup.add(this.testArt9);

        this.background = this.add.rectangle(game.config.width/2, game.config.height/2, game.config.width, game.config.height, 0x000000, 0.75).setOrigin(0.5).setVisible(false);
        this.enlargedView = this.add.image(game.config.width/2, game.config.height/2, 'JBoxFull').setVisible(false);
    }

    update() {
        if (this.isInspecting == false) {
            this.player.update();
            this.checkPlayerArtifact()
        }
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

        if (Phaser.Input.Keyboard.JustDown(keyE)) {
            this.resetSpeed();
            for (let type of this.artifactGroup.getChildren()) {
                if (type.getInRange() == true) {
                    if (!this.isInspecting) {
                        this.inspectArtifact(type.getEnlarged());
                    } else {
                        this.stopInspect();
                    }
                }
            }
        }
    }

    resetSpeed() {
        this.player.setVelocity(0);
        for (let type of this.artifactGroup.getChildren()) {
            type.setVelocity(0);
        }
    }

    checkExhibits() {
        finalScore = 0;
        for (let exh of this.exhibitGroup.getChildren()) {
            const exhBox = exh.getBounds();
            for (let art of this.artifactGroup.getChildren()) {
                const artBox = art.getBounds();
                if (Phaser.Geom.Rectangle.Overlaps(exhBox, artBox) && exh.getType() == art.getType()) {
                    finalScore += 1;
                }
            }
        }
        console.log(finalScore);
    }

    inspectArtifact(texture) {
        this.background.setVisible(true);
        this.enlargedView.setTexture(texture);
        this.enlargedView.setVisible(true);
        this.isInspecting = true;
    }

    stopInspect() {
        this.background.setVisible(false);
        this.enlargedView.setVisible(false);
        this.isInspecting = false;
    }
}