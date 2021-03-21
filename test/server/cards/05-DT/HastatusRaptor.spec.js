describe('HastatusRaptor', function () {
    describe('When fights', function () {
        beforeEach(function () {
            this.setupTest({
                player1: {
                    house: 'saurian',
                    inPlay: ['hastatus-raptor', 'hastatus-raptor']
                },
                player2: {
                    inPlay: ['troll']
                }
            });
            this.raptor1 = this.player1.inPlay[0];
            this.raptor2 = this.player1.inPlay[1];
        });

        describe('with no exalt', function () {
            beforeEach(function () {
                this.player1.fightWith(this.raptor1, this.troll);
                this.player1.clickPrompt('Done');
            });

            it('should deal only 5 damage in fight and raptor should die', function () {
                expect(this.raptor1.location).toBe('discard');
                expect(this.troll.tokens.damage).toBe(5);
            });
        });

        describe('with exalt', function () {
            beforeEach(function () {
                this.player1.fightWith(this.raptor1, this.troll);
                this.player1.clickCard(this.raptor1);
            });

            it('should deal only 5 damage in fight and raptor should die', function () {
                expect(this.raptor1.location).toBe('discard');
                expect(this.troll.tokens.damage).toBe(6);
            });
        });

        describe('with exalt and amber on other raptors', function () {
            beforeEach(function () {
                this.raptor2.tokens.amber = 8;
                this.player1.fightWith(this.raptor1, this.troll);
                this.player1.clickCard(this.raptor1);
            });

            it('should deal only 5 damage in fight and raptor should die', function () {
                expect(this.raptor1.location).toBe('play area');
                expect(this.troll.location).toBe('discard');
                expect(this.raptor1.tokens.damage).toBeUndefined();
            });
        });
    });
});
