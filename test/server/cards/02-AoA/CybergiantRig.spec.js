describe('Cybergiant Rig', function () {
    describe("Cybergiant Rig's ability", function () {
        beforeEach(function () {
            this.setupTest({
                player1: {
                    amber: 4,
                    house: 'brobnar',
                    inPlay: ['groggins'],
                    hand: ['cybergiant-rig']
                },
                player2: {
                    amber: 4,
                    inPlay: ['troll']
                }
            });

            this.groggins.tokens.damage = 6;
            this.troll.tokens.damage = 3;
        });

        describe('when played on own creatures', function () {
            beforeEach(function () {
                this.player1.playUpgrade(this.cybergiantRig, this.groggins);
            });

            it('should fully heal the creature and add power tokens', function () {
                expect(this.groggins.tokens.damage).toBeUndefined();
                expect(this.groggins.tokens.power).toBe(6);
            });

            describe('at the end of own turn', function () {
                beforeEach(function () {
                    this.player1.endTurn();
                });

                it('should remove 1 power token', function () {
                    expect(this.groggins.tokens.power).toBe(5);
                });

                describe("at the end of opponent's turn", function () {
                    beforeEach(function () {
                        this.player2.clickPrompt('brobnar');
                        this.player2.endTurn();
                    });

                    it('should not remove 1 power token', function () {
                        expect(this.groggins.tokens.power).toBe(5);
                    });

                    describe('at the end of own turn again', function () {
                        beforeEach(function () {
                            this.player1.clickPrompt('brobnar');
                            this.player1.endTurn();
                        });

                        it('should remove another power token', function () {
                            expect(this.groggins.tokens.power).toBe(4);
                        });
                    });
                });
            });
        });

        describe('when played on enemy creatures', function () {
            beforeEach(function () {
                this.player1.playUpgrade(this.cybergiantRig, this.troll);
            });

            it('should fully heal the creature and add power tokens', function () {
                expect(this.troll.tokens.damage).toBeUndefined();
                expect(this.troll.tokens.power).toBe(3);
            });

            describe('at the end of own turn', function () {
                beforeEach(function () {
                    this.player1.endTurn();
                });

                it('should not remove 1 power token', function () {
                    expect(this.troll.tokens.power).toBe(3);
                });

                describe("at the end of opponent's turn", function () {
                    beforeEach(function () {
                        this.player2.clickPrompt('brobnar');
                        this.player2.endTurn();
                    });

                    it('should remove 1 power token', function () {
                        expect(this.troll.tokens.power).toBe(2);
                    });
                });
            });
        });
    });
});
