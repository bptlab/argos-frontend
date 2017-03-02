class RequestQueue {
    constructor(onHeadChanged) {
        this.queue = [];
        this.onHeadChanged = onHeadChanged;
    }
    
    push(workItem) {
        this.queue.push(workItem);
        if(this.queue.length < 2) {
            this.onHeadChanged(this);
        }
    }
    
    pop() {
        this.queue.shift();
        if(this.queue.length > 0) {
            this.onHeadChanged(this);
        }
    }
    
    head() {
        if(this.queue.length < 1) {
            return null;
        } else {
            return this.queue[0];
        }
    }
    
} export default RequestQueue;