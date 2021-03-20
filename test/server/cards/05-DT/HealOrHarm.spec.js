describe('HealOrHarm', function () {
    describe('Action test', function () {
        beforeEach(function () {
            this.setupTest({
                player1: {
                    house: 'sanctum',
                    inPlay: ['bad-penny', 'foozle'],
                    hand: ['heal-or-harm']
                },
                player2: {
                    inPlay: ['bumpsy', 'mother', 'helper-bot', 'alaka'],
                    amber: 2
                }
            });
            this.foozle.tokens.damage = 3;
            this.player1.play(this.healOrHarm);
        });

        describe('select heal', function () {
            beforeEach(function () {
                this.player1.clickPrompt('Heal');
                expect(this.player1).toBeAbleToSelect(this.foozle);
                expect(this.player1).toBeAbleToSelect(this.mother);
                expect(this.player1).toBeAbleToSelect(this.badPenny);
                this.player1.clickCard(this.foozle);
            });

            it('Fully heal creature and gain 1A', function () {
                expect(this.foozle.tokens.damage).toBeUndefined();
                expect(this.player1.amber).toBe(1);
            });
        });

        describe('select harm', function () {
            beforeEach(function () {
                this.player1.clickPrompt('Harm');
                expect(this.player1).toBeAbleToSelect(this.foozle);
                this.player1.clickCard(this.foozle);
                this.player1.clickCard(this.helperBot);
            });

            it('Ready and fight with creature', function () {
                expect(this.foozle.tokens.damage).toBe(4);
                expect(this.helperBot.location).toBe('discard');
            });
        });
    });
});
