const crypto = require('crypto');

function hashKey(key) {
    return parseInt(crypto.createHash('sha256').update(key).digest('hex'), 16) % (2 ** 160);
}

class Node {
    constructor(nodeId, prevHash = null) {
        this.nodeId = nodeId;
        this.prevHash = prevHash; 
        this.data = {};
    }

    store(key, value) {
        this.data[key] = value;
    }

    retrieve(key) {
        return this.data[key] || null;
    }
}

class DHT {
    constructor(numNodes = 10) {
        this.nodes = [];
        let prevHash = null;
        for (let i = 0; i < numNodes; i++) {
            let nodeId = hashKey(Math.random().toString());
            let node = new Node(nodeId, prevHash);
            this.nodes.push(node);
            prevHash = nodeId;
        }
        this.nodes.sort((a, b) => a.nodeId - b.nodeId);
    }

    getNode(key) {
        let hashVal = hashKey(key);
        for (let node of this.nodes) {
            if (hashVal <= node.nodeId) {
                return node;
            }
        }
        return this.nodes[0];
    }

    store(key, value) {
        let node = this.getNode(key);
        node.store(key, value);
    }

    retrieve(key) {
        let node = this.getNode(key);
        return node.retrieve(key);
    }
}

module.exports = DHT;
