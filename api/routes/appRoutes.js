'use strict';
module.exports = function(app) {
    const NoteAPI = require('../controllers/appController');
    const authMiddleware = require('../middleware/middlewares');
    const isAuth = authMiddleware.isAuth;
    const isAuthUser = authMiddleware.isAuthUser;
    const isAuthBoards = authMiddleware.isAuthBoards;
    const isAuthUserDelete = authMiddleware.isAuthUserDelete;
    const isAuthCheckBoard = authMiddleware.isAuthCheckBoard;
    const checkAuth = authMiddleware.checkAuth;

    // Users Routes
    app.route('/user')
        .get(isAuth)
        .post(NoteAPI.create_a_user)
        // .put(isAuthUser)
        // .delete(isAuthUserDelete);

    app.route('/user/put')
        .get(isAuthUser)

    app.route('/user/delete')
        .get(isAuthUserDelete)

    // Board Routes
    app.route('/boards')
        .get(isAuthBoards)
        .post(checkAuth, NoteAPI.create_a_board);

    app.route('/board/:boardId')
        .get(checkAuth, isAuthCheckBoard, NoteAPI.read_a_board)
        // .put(checkAuth, NoteAPI.update_a_board)
        // .delete(checkAuth, NoteAPI.delete_a_board);

    app.route('/board/:boardId/put')
        .get(checkAuth, isAuthCheckBoard, NoteAPI.update_a_board)

    app.route('/board/:boardId/delete')
        .get(checkAuth, isAuthCheckBoard, NoteAPI.delete_a_board);

    // Note Routes
    app.route('/notes/:boardId')
        .get(checkAuth, isAuthCheckBoard, NoteAPI.list_all_note)
        .post(checkAuth, isAuthCheckBoard, NoteAPI.create_a_note);

    app.route('/notes/:boardId/:noteId')
        .get(checkAuth, isAuthCheckBoard, NoteAPI.read_a_note)
        // .put(checkAuth, isAuthCheckBoard, NoteAPI.update_a_note)
        // .delete(checkAuth, isAuthCheckBoard, NoteAPI.delete_a_note);
        
    app.route('/notes/:boardId/:noteId/put')
        .get(checkAuth, isAuthCheckBoard, NoteAPI.update_a_note)

    app.route('/notes/:boardId/:noteId/delete')
        .get(checkAuth, isAuthCheckBoard, NoteAPI.delete_a_note);
    
    // login
    app.route('/login')
        .post(NoteAPI.check_user)
};