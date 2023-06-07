const router = require('express').Router()
const userController = require("../controllers/user")

const userRoutes = (app) => {
    router.get("/all", userController.allUsers)
    router.get("/:id", userController.getUserById)
    router.post("/register", userController.register)
    router.get("/deduct/:id/:amount", userController.deductAmount)
    router.get("/carregister/:id/:licence/:model", userController.carRegister)
    router.get("/addAmount/:id/:amount", userController.addAmount)
    router.get("/search/:plate", userController.searchPlate)
    router.post("/login", userController.login)
    router.patch("/:id", userController.updateUser)
    router.get("/count/api", userController.countUsers)
    return app.use("/user", router)
}

module.exports = {
    userRoutes
}