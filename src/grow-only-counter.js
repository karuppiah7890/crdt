// Grow Only Counter
// Type of CRDT: Counter, State based

class GrowOnlyCounter {
    constructor(myId, numberOfReplicas) {
        // TODO: check the condition 0 <= myId <= numberOfReplicas - 1
        // Throw error if condition fails

        // TODO: Make all the fields private
        this.myId = myId;
        this.numberOfReplicas = numberOfReplicas;
        this.payload = new Array(numberOfReplicas).fill(0);
    }

    get value() {
        return this.payload.reduce((computedSumTillNow, currentValue) => computedSumTillNow + currentValue)
    }

    increment() {
        // INFO: Array out of bound exception is possible. Do an extra check in
        // constructor to avoid this issue.
        this.payload[this.myId] = this.payload[this.myId] + 1
    }

    compare(growOnlyCounter) {
        // INFO: The assumption is that the payload array sizes are the same for
        // both counters.
        // TODO: Validate the assumption with code and throw error if it's not
        // the case
        for (let i = 0; i < this.numberOfReplicas; i++) {
            if (this.payload[i] > growOnlyCounter.payload[i]) {
                return false
            }
        }

        return true
    }

    merge(growOnlyCounter) {
        this.payload = this.payload.map((value, index) => Math.max(value, growOnlyCounter.payload[index]))
        return this
    }
}

module.exports = GrowOnlyCounter;
