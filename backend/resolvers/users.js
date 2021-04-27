const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

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
  },

  login: async ({ loginInput }) => {
    try {
      const user = await UserModel.findOne({ email: loginInput.email })
      if (!user) throw new Error("Invalid Credentials")

      const isPasswordMatched = await bcrypt.compare(loginInput.password, user.password)
      if (!isPasswordMatched) throw new Error("Invalid Credentials")

      const token = jwt.sign({
        userId: user.id,
        email: user.email
      },
        "supersecrettoken",
        { expiresIn: "1h" }
      )

      return { userId: user.id, token, tokenExpiration: 1 }
    } catch (error) {
      console.log("Unable to Authenticate", error)
      throw error
    }
  }
}

module.exports = UserResolvers