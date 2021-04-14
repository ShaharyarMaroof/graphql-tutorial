const bcrypt = require("bcrypt")

const UserModel = require("../models/user")

const UserResolvers = {
  users: async () => {
    try {
      const usersList = UserModel.find()

      return usersList.map(user => ({ ...user, password: null }))
    } catch (error) {
      console.log(`Error Fetching Users`, error);
      throw error
    }
  },

  createUser: async ({ userInput }) => {
    try {
      const existingUser = await UserModel.findOne({ email: userInput.email })
      if (existingUser)
        throw new Error("User Already Exists")

      const hashedPassword = await bcrypt.hash(userInput.password, 12)

      const user = new UserModel({
        name: userInput.name,
        email: userInput.email,
        password: hashedPassword
      })

      const newUser = await user.save()
      return {
        ...newUser._doc,
        password: null
      }
    } catch (error) {
      console.log(`Error Creating User`, error);
      throw error
    }
  }
}

module.exports = UserResolvers