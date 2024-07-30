const Transaction = require('../models/TransactionModel');
const Update = require('../models/UpdateModel');

exports.addTransaction = async (req, res) => {
    try {
        const { sender, recipient, amount } = req.body;
        const newTransaction = new Transaction({
            sender,
            recipient,
            amount
        });
        await newTransaction.save();
        res.status(201)
            .json({
                success: true,
                newTransaction: newTransaction,
                message: 'Transaction completed and added'
            });
    } catch (error) {
        res.status(500)
            .json({
                success: false,
                message: 'Failed to add transaction',
                error
            });
    }
};

exports.getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find().populate('updates');
        res.status(200)
            .json({
                sucess: true,
                message: 'Transaction retrieved successfully',
                transactions: transactions
            });
    } catch (error) {
        res.status(500)
            .json({
                success: false,
                message: 'Failed to fetch transactions',
                error
            });
    }
};

exports.updateTransaction = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const transaction = await Transaction.findById(id);

        if (!transaction) {
            return res.status(404)
                .json({
                    success: false,
                    message: 'Transaction not found'
                });
        }

        const updatedFields = {};
        for (const key in updateData) {
            if (transaction[key] !== undefined) {
                updatedFields[key] = updateData[key];
                transaction[key] = updateData[key];
            }
        }

        const update = new Update({
            transaction: transaction._id,
            updatedFields
        });

        transaction.isUpdated = true;
        transaction.updates.push(update._id);
        await update.save();
        await transaction.save();

        res.status(200)
            .json({
                success: true,
                transaction: transaction,
                message: 'Transaction updated and chain linked'
            });
    } catch (error) {
        res.status(500)
            .json({
                success: false,
                message: 'Failed to update transaction',
                error
            });
    }
};

exports.deleteTransaction = async (req, res) => {
    try {
        const { id } = req.params;
        const transaction = await Transaction.findById(id);

        if (!transaction) {
            return res.status(404)
                .json({
                    success: false,
                    message: 'Transaction not found'
                });
        }

        transaction.isDeleted = true;
        await transaction.save();

        res.status(200)
            .json({
                success: true,
                message: 'Transaction marked as deleted',
                transaction: transaction
            });
    } catch (error) {
        res.status(500)
            .json({
                success: false,
                message: 'Failed to delete transaction',
                error
            });
    }
};
