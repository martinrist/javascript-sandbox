class Log {
    constructor() {
        this.messages = [];
    }
    add(message) {
        this.messages.push({ message, timestamp: Date.now() });
    }
    [Symbol.iterator]() {
        return this.messages.values();
    }
}

const log = new Log();
log.add("first message");
log.add("second message");
log.add("third message");
log.add("fourth message");

for (let entry of log) {
    console.log('${entry.message} @ ${entry.timestamp}');
}

