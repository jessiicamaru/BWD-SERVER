import mongoose from 'mongoose';

const historySchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        history: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const HistoryModel = mongoose.model('History', historySchema);
export default HistoryModel;
