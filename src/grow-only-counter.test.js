const { expect, it, describe } = require("@jest/globals")
const GrowOnlyCounter = require("./grow-only-counter")

describe('Grow Only Counter', () => {
    it('should be initialized with initial value as 0', () => {
        const growOnlyCounter = new GrowOnlyCounter(0, 1)

        expect(growOnlyCounter.value).toEqual(0)
    })

    it('should increment value by 1', () => {
        const growOnlyCounter = new GrowOnlyCounter(0, 1)

        growOnlyCounter.increment()

        expect(growOnlyCounter.value).toEqual(1)
    })

    describe('Compare', () => {
        it('should return true when counter is less than another counter', () => {
            const growOnlyCounter = new GrowOnlyCounter(0, 2);
            const anotherGrowOnlyCounter = new GrowOnlyCounter(1, 2);

            anotherGrowOnlyCounter.increment()

            expect(growOnlyCounter.compare(anotherGrowOnlyCounter)).toBeTruthy()
        })

        it('should return false when counter is more than another counter', () => {
            const growOnlyCounter = new GrowOnlyCounter(0, 2);
            const anotherGrowOnlyCounter = new GrowOnlyCounter(1, 2);

            growOnlyCounter.increment()

            expect(growOnlyCounter.compare(anotherGrowOnlyCounter)).toBeFalsy()
        })
    })

    describe('Merge', () => {
        it('should merge the two counters to get a new value when one counter is incremented', () => {
            const growOnlyCounter = new GrowOnlyCounter(0, 2);
            const anotherGrowOnlyCounter = new GrowOnlyCounter(1, 2);

            anotherGrowOnlyCounter.increment()
            growOnlyCounter.merge(anotherGrowOnlyCounter)

            expect(growOnlyCounter.value).toEqual(1)
        })

        it('should merge the two counters to get a new value when both counters are incremented', () => {
            const growOnlyCounter = new GrowOnlyCounter(0, 2);
            const anotherGrowOnlyCounter = new GrowOnlyCounter(1, 2);

            growOnlyCounter.increment()
            anotherGrowOnlyCounter.increment()
            growOnlyCounter.merge(anotherGrowOnlyCounter)

            expect(growOnlyCounter.value).toEqual(2)
        })

        describe('Idempotent', () => {
            it('should not change the value when the two counters are merged multiple times with no change in state', () => {
                const growOnlyCounter = new GrowOnlyCounter(0, 2);
                const anotherGrowOnlyCounter = new GrowOnlyCounter(1, 2);

                growOnlyCounter.increment()
                anotherGrowOnlyCounter.increment()
                growOnlyCounter.merge(anotherGrowOnlyCounter)
                growOnlyCounter.merge(anotherGrowOnlyCounter)
                growOnlyCounter.merge(anotherGrowOnlyCounter)

                expect(growOnlyCounter.value).toEqual(2)
            })
        })

        describe('Commutative', () => {
            it('A.B == B.A', () => {
                const A = new GrowOnlyCounter(0, 2);
                const B = new GrowOnlyCounter(1, 2);
                // A1 and B1 are copies of A and B in a different universe
                const A1 = new GrowOnlyCounter(0, 2);
                const B1 = new GrowOnlyCounter(1, 2);

                A.increment();
                A.increment();
                B.increment();

                A.merge(B);

                // Performing the same set of increment operations as A and B
                A1.increment();
                A1.increment();
                B1.increment()

                // In another universe A1's operation reaches B1 and it gets
                // merged to B1
                B1.merge(A1);

                expect(A.value).toEqual(3);
                expect(B1.value).toEqual(A.value);
            })

            it('(A.B).C == (A.C).B', () => {
                const A = new GrowOnlyCounter(0, 3);
                const B = new GrowOnlyCounter(1, 3);
                const C = new GrowOnlyCounter(2, 3);
                const A1 = new GrowOnlyCounter(0, 3);
                const B1 = new GrowOnlyCounter(1, 3);
                const C1 = new GrowOnlyCounter(2, 3);


                A.increment();
                B.increment();
                B.increment();
                C.increment();
                C.increment();
                C.increment();

                (A.merge(B)).merge(C);

                A1.increment();
                B1.increment();
                B1.increment();
                C1.increment();
                C1.increment();
                C1.increment();

                (A1.merge(C1)).merge(B1);

                expect(A.value).toEqual(6);
                expect(A1.value).toEqual(A.value);
            })
        })

        describe('Associative', () => {
            it('(A.B).C == A.(B.C)', () => {
                const A = new GrowOnlyCounter(0, 3);
                const B = new GrowOnlyCounter(1, 3);
                const C = new GrowOnlyCounter(2, 3);
                const A1 = new GrowOnlyCounter(0, 3);
                const B1 = new GrowOnlyCounter(1, 3);
                const C1 = new GrowOnlyCounter(2, 3);


                A.increment();
                B.increment();
                B.increment();
                C.increment();
                C.increment();
                C.increment();

                (A.merge(B)).merge(C);

                A1.increment();
                B1.increment();
                B1.increment();
                C1.increment();
                C1.increment();
                C1.increment();

                A1.merge(B1.merge(C1));

                expect(A.value).toEqual(6);
                expect(A1.value).toEqual(A.value);
            })
        })
    })
})