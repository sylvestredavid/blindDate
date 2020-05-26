import {loginRequired} from "../controllers/userController";
import {addNotification, getNotificationByUserId, updateNotification} from "../controllers/notificationController";

export const notificationRoutes = (app) => {
    app.route('/notifications/add')
        .post(loginRequired, addNotification)

    app.route('/notifications/:notificationId')
        .put(loginRequired, updateNotification)

    app.route('/notifications/user/:userId')
        .get(loginRequired, getNotificationByUserId)
}
