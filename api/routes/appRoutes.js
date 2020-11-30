'use strict';
module.exports = function(app) {
    const NoteAPI = require('../controllers/appController');
    const authMiddleware = require('../middleware/middlewares');
    const isAuth = authMiddleware.isAuth;

    // Users Routes
    app.route('/users')
        .get(NoteAPI.list_all_users)
        .post(NoteAPI.create_a_user);

    app.route('/users/:userId')
        .get(NoteAPI.read_a_user)
        .put(NoteAPI.update_a_user)
        .delete(NoteAPI.delete_a_user);

    // Board Routes
    app.route('/boards')
        .get(NoteAPI.list_all_board)
        .post(NoteAPI.create_a_board);

    app.route('/boards/:boardId')
        .get(NoteAPI.read_a_board)
        .put(NoteAPI.update_a_board)
        .delete(NoteAPI.delete_a_board);

    // Note Routes
    app.route('/notes')
        .get(NoteAPI.list_all_note)
        .post(NoteAPI.create_a_note);

    app.route('/notes/:noteId')
        .get(NoteAPI.read_a_note)
        .put(NoteAPI.update_a_note)
        .delete(NoteAPI.delete_a_note);

    // auth
    app.route('/profile')
        .get(isAuth, NoteAPI.list_user)

    app.route('/login')
        .get(NoteAPI.check_user)
};