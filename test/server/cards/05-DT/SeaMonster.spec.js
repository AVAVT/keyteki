describe('SeaMonster', function () {
    describe("SeaMonster's play ability", function () {
        beforeEach(function () {
            this.setupTest({
                player1: {
                    house: 'unfathomable',
                    hand: ['sea-monster'],
                    inPlay: ['horrid-synan', 'keyfrog', 'kaupe', 'llack-gaboon']
                },
                player2: {
                    inPlay: ['bot-bookton', 'brain-eater', 'dextre', 'doc-bookton']
                }
            });
        });

        it('should exhaust 2 creatures', function () {
            this.player1.play(this.seaMonster);
            expect(this.player1).toBeAbleToSelect(this.horridSynan);
            expect(this.player1).toBeAbleToSelect(this.kaupe);
            expect(this.player1).toBeAbleToSelect(this.llackGaboon);
            expect(this.player1).not.toBeAbleToSelect(this.keyfrog);
            this.player1.clickCard(this.kaupe);
            this.player1.clickCard(this.llackGaboon);
            this.player1.clickPrompt('Done');

            expect(this.kaupe.exhausted).toBe(true);
            expect(this.llackGaboon.exhausted).toBe(true);
            expect(this.seaMonster.location).toBe('play area');
        });

        it('should die if not exhausting 2 creatures', function () {
            this.player1.play(this.seaMonster);
            this.kaupe.exhausted = true;
            expect(this.player1).toBeAbleToSelect(this.horridSynan);
            expect(this.player1).toBeAbleToSelect(this.kaupe);
            expect(this.player1).toBeAbleToSelect(this.llackGaboon);
            expect(this.player1).not.toBeAbleToSelect(this.keyfrog);
            this.player1.clickCard(this.kaupe);
            this.player1.clickCard(this.llackGaboon);
            this.player1.clickPrompt('Done');

            expect(this.kaupe.exhausted).toBe(true);
            expect(this.llackGaboon.exhausted).toBe(true);
            expect(this.seaMonster.location).toBe('discard');
        });
    });

    describe("SeaMonster's fight/reap ability", function () {
        beforeEach(function () {
            this.setupTest({
                player1: {
                    house: 'unfathomable',
                    hand: ['sea-monster'],
                    inPlay: ['sea-monster', 'horrid-synan', 'keyfrog', 'kaupe', 'llack-gaboon']
                },
                player2: {
                    inPlay: ['bot-bookton', 'brain-eater', 'dextre', 'doc-bookton']
                }
            });
        });

        it('should deal damage when reaping', function () {
            this.player1.reap(this.seaMonster);
            expect(this.player1).toBeAbleToSelect(this.horridSynan);
            expect(this.player1).toBeAbleToSelect(this.kaupe);
            expect(this.player1).toBeAbleToSelect(this.llackGaboon);
            expect(this.player1).toBeAbleToSelect(this.keyfrog);
            expect(this.player1).toBeAbleToSelect(this.seaMonster);
            expect(this.player1).toBeAbleToSelect(this.botBookton);
            expect(this.player1).toBeAbleToSelect(this.dextre);
            expect(this.player1).toBeAbleToSelect(this.brainEater);
            expect(this.player1).toBeAbleToSelect(this.docBookton);
            this.player1.clickCard(this.dextre);

            expect(this.brainEater.tokens.damage).toBe(2);
            expect(this.dextre.tokens.damage).toBe(2);
            expect(this.docBookton.tokens.damage).toBe(2);
            expect(this.botBookton.tokens.damage).toBeUndefined();
        });

        it('should die if not exhausting 2 creatures', function () {
            this.player1.fightWith(this.seaMonster, this.botBookton);
            expect(this.player1).toBeAbleToSelect(this.horridSynan);
            expect(this.player1).toBeAbleToSelect(this.kaupe);
            expect(this.player1).toBeAbleToSelect(this.llackGaboon);
            expect(this.player1).toBeAbleToSelect(this.keyfrog);
            expect(this.player1).toBeAbleToSelect(this.seaMonster);
            expect(this.player1).toBeAbleToSelect(this.dextre);
            expect(this.player1).toBeAbleToSelect(this.brainEater);
            expect(this.player1).toBeAbleToSelect(this.docBookton);
            this.player1.clickCard(this.dextre);

            expect(this.brainEater.tokens.damage).toBe(2);
            expect(this.dextre.tokens.damage).toBe(2);
            expect(this.docBookton.tokens.damage).toBe(2);
        });
    });
});
