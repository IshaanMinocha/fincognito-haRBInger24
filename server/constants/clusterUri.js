
const clusterUri = [
    "mongodb://localhost:27017/cluster0", // source of truth cluster
    "mongodb://localhost:27017/cluster1",
    "mongodb://localhost:27017/cluster2",
    //TODO: replace these db links with cluster links

];

module.exports = clusterUri;
