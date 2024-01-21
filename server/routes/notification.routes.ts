import express from "express";
import { getNotifications, updateNotification } from "../controllers/notifications.controller";
import { createOrder } from "../controllers/orders.controller";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";

const notificationRouter = express.Router();

notificationRouter.get(
  "/get-all-notifications",
  isAuthenticated,
  authorizeRoles("admin"),
  getNotifications
);
notificationRouter.put(
  "/update-notification/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  updateNotification
);

export default notificationRouter;
