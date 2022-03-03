// resolvers.js file

const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                .select('-__v -password')
                return userData;
            }
            throw new AuthenticationError('Not logged in');
        }
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError('Invalid credentials')
            }
            const correctPW = await User.isCorrectPassword(password);
            if (!correctPW) {
                throw new AuthenticationError('Invalid credentials')
            }
            const token = signToken(user);
            return { token, user }
        },
        saveRecipe: async (parent, { recipe }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedRecipes: recipe } },
                    { new: true }
                )
                return updatedUser;
            }
            throw new AuthenticationError('You need to be logged in first!')
        },
        removeRecipe: async (parent, { recipeId }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedRecipes: { recipeId: recipeId } } },
                    { new: true }
                )
                return updatedUser;
            }
            throw new AuthenticationError('You need to be logged in first!')
        }
    }
};

module.exports = resolvers;