import {existByName, loginRequired, register, sign_in, updateUser} from '../controllers/userController'

export const userRoutes = (app) => {

    app.route('/users/register')
        .post(register)

    app.route('/users/signIn')
        .post(sign_in)

    app.route('/users/existByName/:name')
        .get(existByName)

    app.route('/users/:userId')
        .put(loginRequired, updateUser)
}
