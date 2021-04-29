describe('Pain Reaction', function () {
    describe("Pain Reaction's ability", function () {
        beforeEach(function () {
            this.setupTest({
                player1: {
                    house: 'dis',
                    hand: ['pain-reaction']
                },
                player2: {
                    inPlay: ['shooler', 'urchin', 'groggins'],
                    hand: ['poltergeist']
                }
            });
        });

        it('should deal 2 damage to neighbors if it destroys the creature', function () {
            this.player1.play(this.painReaction);
            this.player1.clickCard(this.urchin);
            expect(this.urchin.location).toBe('discard');
            expect(this.shooler.tokens.damage).toBe(2);
            expect(this.groggins.tokens.damage).toBe(2);
        });

        it('should not deal 2 damage to neighbors if it does destroy the creature', function () {
            this.urchin.tokens.power = 4;
            this.player1.play(this.painReaction);
            this.player1.clickCard(this.urchin);
            expect(this.urchin.location).toBe('play area');
            expect(this.shooler.location).toBe('play area');
            expect(this.groggins.location).toBe('play area');
            expect(this.urchin.tokens.damage).toBe(2);
            expect(this.shooler.tokens.damage).toBeUndefined();
            expect(this.groggins.tokens.damage).toBeUndefined();
        });
    });
});
