class Title extends Phaser.Scene {
    constructor() {
        super('titleScreen');
    }

    preload() {
        this.load.path = './assets/';
        this.load.image('player', 'playerSprite.png');
        this.load.image('tempArt', 'tempArtifact.png');
        this.load.image('tempExh', 'tempExhibit.png');

        this.load.image('TitleBG', 'AAM.jpg');
        this.load.image('PlayBG', 'PlayBG.png');
        this.load.image('border', 'PlayBorder.png');

        this.load.image('JBoxFull', 'Japanese Box Large.png');
        this.load.image('JBoxIcon', 'Japanese Box Small.png');
        this.load.image('JBoxIconHL', 'Japanese Box Small HL.png');

        this.load.image('JJarFull', 'Japanese Bird Jar L.png');
        this.load.image('JJarIcon', 'Japanese Bird Jar S.png');
        this.load.image('JJarIconHL', 'Japanese Bird Jar S HL.png');

        this.load.image('JDishFull', 'Japanese Dish L.png');
        this.load.image('JDishIcon', 'Japanese Dish S.png');
        this.load.image('JDishIconHL', 'Japanese Dish S HL.png');

        this.load.image('CJarFull', 'Chinese Jar L.png');
        this.load.image('CJarIcon', 'Chinese Jar S.png');
        this.load.image('CJarIconHL', 'Chinese Jar S HL.png');

        this.load.image('CPlateFull', 'Chinese Plate L.png');
        this.load.image('CPlateIcon', 'Chinese Plate S.png');
        this.load.image('CPlateIconHL', 'Chinese Plate S HL.png');

        this.load.image('CRhinoFull', 'Chinese Rhino L.png');
        this.load.image('CRhinoIcon', 'Chinese Rhino S.png');
        this.load.image('CRhinoIconHL', 'Chinese Rhino S HL.png');

        this.load.image('IBuddhaFull', 'Indian Buddha L.png');
        this.load.image('IBuddhaIcon', 'Indian Buddha S.png');
        this.load.image('IBuddhaIconHL', 'Indian Buddha S HL.png');

        this.load.image('IGaneshaFull', 'Indian Ganesha L.png');
        this.load.image('IGaneshaIcon', 'Indian Ganesha S.png');
        this.load.image('IGaneshaIconHL', 'Indian Ganesha S HL.png');

        this.load.image('IElephantFull', 'Indian Elephant L.png');
        this.load.image('IElephantIcon', 'Indian Elephant S.png');
        this.load.image('IElephantIconHL', 'Indian Elephant S HL.png');

        this.load.image('KMoonFull', 'Korean Moon Jar L.png');
        this.load.image('KMoonIcon', 'Korean Moon Jar S.png');
        this.load.image('KMoonIconHL', 'Korean Moon Jar S HL.png');

        this.load.image('KTigerFull', 'Korean Tiger Jar L.png');
        this.load.image('KTigerIcon', 'Korean Tiger Jar S.png');
        this.load.image('KTigerIconHL', 'Korean Tiger Jar S HL.png');

        this.load.image('KEwerFull', 'korean ewer L.png');
        this.load.image('KEwerIcon', 'korean ewer S.png');
        this.load.image('KEwerIconHL', 'korean ewer S HL.png');

        this.load.image('JExh', 'Exhibit-Jap.png');
        this.load.image('CExh', 'Exhibit-Chi.png');
        this.load.image('IExh', 'Exhibit-Ind.png');
        this.load.image('KExh', 'Exhibit-Kor.png');
    }

    create() {
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

        this.bg = this.add.image(game.config.width/2, game.config.height/2, 'TitleBG').setOrigin(0.5);

        let titleConfig = {
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

        let RConfig = {
            fontFamily: 'Roboto',
            fontSize: '36px',
            //backgroundColor: '#0000',
            color: '#EC4B4B',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
        }

        this.add.text(game.config.width/2, game.config.height/2, "Instructions", titleConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 80, "A shipment of different artifacts", titleConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 120, "have arrived at the museum. It is", titleConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 160, "your job to inspect each artifact", titleConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 200, "and place them to the right", titleConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 240, "exhibits", titleConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 320, "WASD - Move Player", titleConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 360, "Q - Pick Up/Drop Artifact", titleConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 400, "E - Inspect/Stop View Artifact", titleConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 440, "Press R to Start Your Shift", RConfig).setOrigin(0.5);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.start('playScreen');
        }
    }
}