class End extends Phaser.Scene {
    constructor() {
        super('endScreen');
    }

    create() {
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#ffffff',
            color: '#000',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }

        this.add.rectangle(0, 0, game.config.width, game.config.height, 0xf2f2f2).setOrigin(0);
        this.add.text(game.config.width/2, game.config.height/2, 'END', scoreConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 32, 'SCORE: ', scoreConfig).setOrigin(0.5);
        this.add.text(game.config.width/2 + 100, game.config.height/2 + 32, finalScore, scoreConfig).setOrigin(0.5);
    }
}