const userModel = require("../models/users");
const createOutput = require("../utils").createOutput;
const utils = require("../utils");
// const io = require("./../sockets").get()
const Socket = require("../index")
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // query a user from the database
    const user = await userModel.findOne({ email });
    if (user) {
      const passwordMatched = await utils.comparePassword(
        password,
        user.password
      );
      if (passwordMatched) {
        return res.json(createOutput(true, { user }));
      } else {
        return res.json(createOutput(false, "Incorrect Password"));
      }
    } else {
      return res.json(createOutput(false, user));
    }
  } catch (error) {
    console.log(error.message);
    return res.json(createOutput(false, error.message, true));
  }
};

const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const saved = await userModel.create({
      email,
      password,
    });
    if (saved) {
      return res.json(createOutput(true, saved));
    } else {
      return res.json(createOutput(false, saved));
    }
  } catch (error) {
    return res.json(createOutput(false, error.message, true));
  }
};

const allUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    return res.json(createOutput(true, users));
  } catch (error) {
    return res.json(false, error.message, true);
  }
};

const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    // querying the user in the database
    const user = await userModel.findById(id);
    const { password, email, username } = req.body;
    if (user) {
      const updated = await userModel.updateOne(
        { email: user.email },
        { password, email, username }
      );
      if (updated) {
        return res.json(createOutput(true, updated));
      } else {
        return res.json(createOutput(true, "failed to update the user"));
      }
    }
    return res.json(createOutput(false, "failed to get user with given id"));
  } catch (error) {
    return res.json(createOutput(false, error.message, true));
  }
};

const countUsers = async (req, res) => {
  try {
    const allUsersCount = await userModel.find().count();
    if (allUsersCount) {
      return res.json(createOutput(true, allUsersCount));
    } else {
      return res.json(createOutput(false, allUsersCount));
    }
  } catch (error) {
    console.log(error.message);
    return res.json(createOutput(false, error.message, true));
  }
};

const deleteUser = async (req, res) => {
  try {
    const email = req.params.email;
    const deleted = await userModel.deleteOne({ email });
    if (deleted) {
      return res.json(createOutput(true, deleted));
    } else {
      return res.json(createOutput(false, deleted));
    }
  } catch (error) {
    return res.json(createOutput(false, error.message, true));
  }
};

const getAmount = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await userModel.findById(id);
    if (user) {
      return res.json(createOutput(true, { balance: user.amount }));
    } else {
      return res.json(createOutput(true, "No Detail"));
    }
  } catch (error) {
    return res.json(createOutput(false, error.message, true));
  }
};

const deductAmount = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await userModel.findById(id);
    if (user) {
      const amountReduced = parseFloat(user.amount) - parseFloat(req.params.amount);
      const updated = await userModel.updateOne(
        { _id: id },
        { amount: amountReduced }
      );
      if (updated) {
        const saveUser = await userModel.findById(id)
        // io.on("connect", (socket)=> {
          // console.log("---------------------", id)
          // console.log(Socket.Socket);
        // Socket.Socket.on("connect", (socket)=> {
        //   console.log("trying ");
        //   socket.emit("deduct", saveUser)
        // })
        Socket.Socket.sockets.emit("deduct", saveUser)
        // })
        // io.emit("emit", saveUser)
        return res.json(createOutput(true, saveUser));
      } else {
        return res.json(createOutput(true, "failed to save"));
      }
    } else {
      return res.json(createOutput(true, "No Detail"));
    }
  } catch (error) {
    console.log(error);
    return res.json(createOutput(false, error.message, true));
  }
};

const carRegister = async (req, res) => {
  try {
    let licence = req.params.licence;
    const model = req.params.model;
    const id = req.params.id;
    const user = await userModel.findById(id);
    if (user) {
      // await Student.create({ _id: 1, name: 'John Doe', friends: ['Alex'] })
      // const doc = await Student.findOne({ _id: 1 })
      // doc.friends.push('Maria'
      // await doc.save()
      // user.cars.push({ model, plateNumber: licence });
      // const saved = await user.save();
      const saved = await userModel.updateOne({_id: id},{plateNumber:licence, model})
      if (saved) {
        const userS = await userModel.findById(id);
        
        return res.json(createOutput(true, userS, true));
      }
    } else {
      return res.json(createOutput(true, "failed to add a car", true));
    }
  } catch (error) {
    console.log(error.message);
    return res.json(createOutput(false, error.message, true));
  }
};

const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await userModel.findById(id);
    if (user) {
      return res.json(createOutput(true, user));
    } else {
      return res.json(createOutput(true, "No such user"));
    }
  } catch (error) {
    return res.json(createOutput(false, error.message, true));
  }
};


const searchPlate = async (req, res) => {
  try {
    const plate = req.params.plate;
    const user = await userModel.find({plateNumber:plate});
    if (user) {
      console.log(user);
      return res.json(createOutput(true, user));
    } else {
      return res.json(createOutput(false, "No such user"));
    }
  } catch (error) {
    return res.json(createOutput(false, error.message, true));
  }
};

const addAmount = async (req, res) => {
  try {
    const id = req.params.id;
    let amount = req.params.amount;
    const user = await userModel.findById(id);
    if (user) {
      amount = (parseFloat(user.amount) + parseFloat(amount)).toString();
      const updated = await userModel.updateOne({ _id: id }, { amount });
      if (updated) {
        let updatedUser = await userModel.findById(id);
        return res.json(createOutput(true, updatedUser));
      } else {
        return res.json(createOutput(false, "failed"));
      }
    } else {
      return res.json(createOutput(true, "No such user"));
    }
  } catch (error) {
    console.log(error);
    return res.json(createOutput(false, error.message, true));
  }
};
module.exports = {
  allUsers,
  login,
  deleteUser,
  updateUser,
  register,
  getUserById,
  countUsers,
  addAmount,
  carRegister,
  deductAmount,
  getAmount,
  searchPlate
};

