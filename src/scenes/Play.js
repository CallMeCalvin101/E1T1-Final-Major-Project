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
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

        finalScore = 0;
        this.isInspecting = false;
        this.gameEnd = false;

        this.maxTime = 90;
        this.timeLeft = this.maxTime;
        this.curTime = 0;

        this.bg = this.add.image(game.config.width/2, game.config.height/2, 'PlayBG')

        this.exhibitGroup = this.add.group({
            runChildUpdate: true
        });

        this.testExh1 = new Exhibit(this, 145, 120, 'JExh', "A");
        this.testExh2 = new Exhibit(this, 395, 120, 'CExh', "B");
        this.testExh3 = new Exhibit(this, 145, 300, 'IExh', "C");
        this.testExh4 = new Exhibit(this, 395, 300, 'KExh', "D");

        this.exhibitGroup.add(this.testExh1);
        this.exhibitGroup.add(this.testExh2);
        this.exhibitGroup.add(this.testExh3);
        this.exhibitGroup.add(this.testExh4);

        this.player = new Player(this, 270, 480);

        this.artifactGroup = this.add.group({
            runChildUpdate: true
        });

        this.JArt1 = new Artifact(this, 120, 900 - 50, 'JBoxIcon', "A", 'JBoxFull', 'JBoxIconHL');
        this.CArt1 = new Artifact(this, 220, 900 - 50, 'CRhinoIcon', "B", 'CRhinoFull', 'CRhinoIconHL');
        this.JArt2 = new Artifact(this, 320, 900 - 50, 'JDishIcon', "A", 'JDishFull', 'JDishIconHL');
        this.IArt1 = new Artifact(this, 420, 900 - 50, 'IElephantIcon', "C", 'IElephantFull', 'IElephantIconHL');
        
        this.KArt1 = new Artifact(this, 120, 800 - 50, 'KEwerIcon', "D", 'KEwerFull', 'KEwerIconHL');
        this.KArt2 = new Artifact(this, 220, 800 - 50, 'KMoonIcon', "D", 'KMoonFull', 'KMoonIconHL');
        this.CArt2 = new Artifact(this, 320, 800 - 50, 'CJarIcon', "B", 'CJarFull', 'CJarIconHL');
        this.KArt3 = new Artifact(this, 420, 800 - 50, 'KTigerIcon', "D", 'KTigerFull', 'KTigerIconHL');

        this.CArt3 = new Artifact(this, 120, 700 - 50, 'CPlateIcon', "B", 'CPlateFull', 'CPlateIconHL');
        this.IArt2 = new Artifact(this, 220, 700 - 50, 'IGaneshaIcon', "C", 'IGaneshaFull', 'IGaneshaIconHL');
        this.IArt3 = new Artifact(this, 320, 700 - 50, 'IBuddhaIcon', "C", 'IBuddhaFull', 'IBuddhaIconHL');
        this.JArt3 = new Artifact(this, 420, 700 - 50, 'JJarIcon', "A", 'JJarFull', 'JJarIconHL');


        this.artifactGroup.add(this.JArt1);
        this.artifactGroup.add(this.JArt2);
        this.artifactGroup.add(this.JArt3);
        this.artifactGroup.add(this.CArt1);
        this.artifactGroup.add(this.CArt2);
        this.artifactGroup.add(this.CArt3);
        this.artifactGroup.add(this.IArt1);
        this.artifactGroup.add(this.IArt2);
        this.artifactGroup.add(this.IArt3);
        this.artifactGroup.add(this.KArt1);
        this.artifactGroup.add(this.KArt2);
        this.artifactGroup.add(this.KArt3);

        this.background = this.add.rectangle(game.config.width/2, game.config.height/2, game.config.width, game.config.height, 0x000000, 0.75).setOrigin(0.5).setVisible(false);
        this.endBG = this.add.rectangle(game.config.width/2, game.config.height/2, game.config.width, 200, 0x000000).setVisible(false);
        this.enlargedView = this.add.image(game.config.width/2, game.config.height/2, 'JBoxFull').setVisible(false);

        let timerConfig = {
            fontFamily: 'fantasy',
            fontSize: '28px',
            //backgroundColor: '#0000',
            color: '#ffffff',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
        }

        this.border = this.add.image(game.config.width/2, game.config.height/2, 'border');
        this.timerText = this.add.text(game.config.width/2 - 55, 10, this.maxTime, timerConfig);
        this.timerText.setText("Time: " + Math.floor(this.timeLeft / 60) + ":" + this.timeLeft % 60);

        this.gameTimer = this.time.addEvent({
            delay: 1000,
            callback: this.decreaseTimer,
            callbackScope: this,
            loop: true
        });
    }

    update() {
        if (!this.gameEnd) {
            if (this.isInspecting == false) {
                this.player.update();
                this.checkPlayerArtifact()
            }
            this.interactArtifacts();
        } else {
            if (Phaser.Input.Keyboard.JustDown(keyR)) {
                this.scene.start('titleScreen');
            }
        }
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
                if (type.getInRange() == true && !this.isInspecting) {
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
            this.resetSpeed();
        }
    }

    resetSpeed() {
        this.player.setVelocity(0);
        this.player.setAcceleration(0);
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

    decreaseTimer() {
        this.timeLeft -= 1;
        if (this.timeLeft < 0) {
            this.endGame();
        }

        if (!this.gameEnd) {
            if (this.timeLeft % 60 < 10) {
                this.timerText.setText("Time: " + Math.floor(this.timeLeft / 60) + ":0" + this.timeLeft % 60);
            } else {
                this.timerText.setText("Time: " + Math.floor(this.timeLeft / 60) + ":" + this.timeLeft % 60);
            }
        }
    }

    endGame() {
        this.gameEnd = true;
        this.stopInspect();
        this.resetSpeed();
        for (let type of this.artifactGroup.getChildren()) {
            if (type.getPickedUp() == true) {
                type.setPickedUp(false);
            }
        }

        this.endBG.setVisible(true);
        this.background.setVisible(true);

        let endConfig = {
            fontFamily: 'Roboto',
            fontSize: '36px',
            //backgroundColor: '#0000',
            color: '#ffffff',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
        }

        this.add.text(game.config.width/2, game.config.height/2 - 40, "GAME OVER", endConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, "Correct Exhibits: " + finalScore, endConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 40, "Press R to Reset", endConfig).setOrigin(0.5);
    }
}