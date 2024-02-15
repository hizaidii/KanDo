const path = require("path");
const express = require("express");
const router = express.Router();
const isLoggedin = require("../middlewares/isLoggedIn");
const appController = require("../controllers/appController");

router.get("/", appController.getApp);
router.get("/logout", appController.getLogout);
router.post("/newBoard", appController.postNewBoard);
router.get("/board", appController.getBoard);
router.post("/newSwimlane", appController.postNewSwimlane);
router.post("/newTask", appController.postNewTask);
router.get("/moveTask", appController.getMoveTask);
router.get("/board/deleteBoard", appController.getDeleteBoard);
router.get("/board/deleteColumn", appController.getDeleteColumn);
router.get("/board/deleteTask", appController.getDeleteTask);
router.get("/board/completeTask", appController.getCompleteTask);
router.post("/board/editBoard", appController.postEditBoard);
router.post("/board/editSwimlane", appController.postEditSwimlane);
router.post("/board/editTask", appController.postEditTask);

module.exports = router;
