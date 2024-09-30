import HistoryModel from '../models/HistoryModel.js';
import UserModel from '../models/UserModel.js';

export const resolvers = {
    Query: {
        users: async () => {
            const users = await UserModel.find();
            return users;
        },
        user: async (parent, args) => {
            const foundUser = await UserModel.findOne({
                id: args.userId,
            });
            return foundUser;
        },
        history: async (parent, args) => {
            const foundHistory = await HistoryModel.findOne({
                userId: args.userId,
            });
            return foundHistory;
        },
    },

    Mutation: {
        addUser: async (parent, args) => {
            const newUser = new UserModel(args);
            console.log(newUser);

            await newUser.save();
            return newUser;
        },
        addHistory: async (parent, args) => {
            const newHistory = new HistoryModel(args);
            console.log('[newHistory]', newHistory);

            await newHistory.save();
            return newHistory;
        },
    },
};
