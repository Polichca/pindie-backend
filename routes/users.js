// Создаём роут для запросов пользователей
const usersRouter = require("express").Router();

// Импортируем вспомогательные функции
const {
  findAllUsers,
  createUser,
  findUserById,
  updateUser,
  deleteUser,
  checkIsUserExists,
  checkEmptyNameAndEmailAndPassword,
  checkEmptyNameAndEmail,
  filterPassword,
  hashPassword,
  sendMe,
} = require("../middlewares/users");
const {
  sendAllUsers,
  sendUserCreated,
  sendUserById,
  sendUserUpdated,
  sendUserDeleted,
} = require("../controllers/users");
const { checkAuth } = require("../middlewares/auth");

// Обрабатываем GET-запрос с роутом '/users'
usersRouter.get("/users", findAllUsers, filterPassword, sendAllUsers);

usersRouter.get("/users/:id", findUserById, filterPassword, sendUserById);

usersRouter.post(
  "/users",
  findAllUsers,
  checkIsUserExists,
  checkEmptyNameAndEmailAndPassword,
  checkAuth,
  hashPassword,
  createUser,
  sendUserCreated
);

usersRouter.put(
  "/users/:id",
  checkEmptyNameAndEmail,
  checkAuth,
  updateUser,
  sendUserUpdated
);

usersRouter.get("/me", checkAuth, sendMe);

usersRouter.delete("/users/:id", checkAuth, deleteUser, sendUserDeleted);

// Экспортируем роут для использования в приложении — app.js
module.exports = usersRouter;
