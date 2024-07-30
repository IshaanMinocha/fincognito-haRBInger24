const DHT = require('../../../utils/dht');

const dht = new DHT();

exports.storeData = (req, res) => {
    const { key, value } = req.body;
    if (!key || !value) {
        return res.status(400).json({ message: 'Key and value are required.' });
    }
    dht.store(key, value);
    res.status(200).json({ message: 'Data stored successfully.' });
};

exports.retrieveData = (req, res) => {
    const { key } = req.params;
    if (!key) {
        return res.status(400).json({ message: 'Key is required.' });
    }
    const value = dht.retrieve(key);
    if (value === null) {
        return res.status(404).json({ message: 'Data not found.' });
    }
    res.status(200).json({ value });
};
