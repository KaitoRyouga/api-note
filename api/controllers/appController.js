'use strict';

const Task = require('../models/appModel.js');
const authMiddleware = require('../middleware/middlewares');
const login = authMiddleware.login;

// ###############################################################################################

exports.list_all_users = function(req, res) {
    Task.User.getAllUser(function(err, user) {
        if (err)
            res.send(err);
        res.send(user);
    });
};

exports.list_user = function(req, res) {
    Task.User.getUserByUsername(req.user, function(err, user) {
        if (err)
            res.send(err);
        res.send(user);
    });
};

exports.check_user = function(req, res) {
    const userLogin = req.body;
    Task.User.checkLogin(userLogin, function(err, user) {
        if (err)
            res.send(err);
        else
            login(user, res);
    });
};

exports.create_a_user = function(req, res) {
    var new_user = new Task.User(req.body);

    //handles null error
    if(!new_user.username){
        res.status(400).send({ error:true, message: 'Please provide Username' });
    }
    else{
        Task.User.createUser(new_user, res, function(err, user) {

            if (err)
                res.send(err);
            res.json({message: 'Create user successfully'});
        });
    }
};

exports.read_a_user = function(userId, fun, res) {

    Task.User.getUserById(userId, fun, function(err, user) {
        if (err)
            res(err, user);
        else
            res(null, user)
    });
};

exports.update_a_user = function(req, pass, res) {
    Task.User.updateById(req, pass, function(err, user) {
        if (err)
            res(err);
        else
            res(user);
    });
};


exports.delete_a_user = function(req, fun, res) {

    Task.User.remove( req.id, function(err, user) {
        try {
            res(null, user);
        } catch (error) {
			return fun
			.status(404)
			.send('Error!');
        }
    });
};

// ###############################################################################################

exports.list_all_board = function(req, fun, res) {
    Task.Board.getAllBoard(req, fun, function(err, boards) {
        try {
            res(null, boards);
        } catch (error) {
			return fun
			.status(404)
			.send('Error!');
        }
    });
};

exports.create_a_board = function(req, res) {

    const new_board = {
        "name": req.body.name,
        "user_id": res.token.id,
    }

    // //handles null error
    if(!new_board.name){
        res.status(400).send({ error:true, message: 'Please provide Name' });
    }
    else{
        Task.Board.createBoard(new_board, function(err, board) {
            if (err)
                res.send(err);
            res.json({message: 'Create board successfully'});
        });
    }
};

exports.read_a_board = function(req, res) {
    Task.Board.getBoardById(req.params.boardId, res.token.id, function(err, board) {
        if (err)
            res.send(err);
        res.json(board);
    });
};

exports.update_a_board = function(req, res) {

    const new_board = {
        "name": req.body.name,
        "user_id": res.token.id,
    }

    Task.Board.updateById(req.params.boardId, new_board, function(err, board) {
        if (err)
            res.send(err);
        res.json({ message: 'Name board successfully change' });
    });
};


exports.delete_a_board = function(req, res) {

    Task.Board.remove( req.params.boardId, res.token, function(err, board) {
        if (err)
            res.send(err);
        res.json({ message: 'Board successfully deleted' });
    });
};

exports.check_board = function(req, res, next) {

    Task.Board.checkBoard( req.params.boardId, res.token, function(err, boards) {
        if (boards == null)
            res.send(err);
        else
            next(null, boards)

    });
};

// ###############################################################################################

exports.list_all_note = function(req, res) {

    Task.Note.getAllNote(req.params.boardId, res.token, function(err, note) {

        if (err)
            res.send(err);
        else
            res.send(note);
    });
};

exports.create_a_note = function(req, res) {

    const newNote = {
        "name": req.body.name,
        "board_id": req.params.boardId,
    }

    //handles null error
    if(!req.body.name){
        res.status(400).send({ error:true, message: 'Please provide Name' });
    }
    else{
        Task.Note.createNote(newNote, function(err, note) {
            if (err)
                res.send(err);
            res.json({message: 'Create note successfully'});
        });
    }
};

exports.read_a_note = function(req, res) {
    Task.Note.getNoteById(req.params, function(err, note) {
        if (err)
            res.send(err);
        res.json(note);
    });
};

exports.update_a_note = function(req, res) {

    Task.Note.updateById(req.params, req.body.name, function(err, note) {
        if (err)
            res.send(err);
        else
            res.json({ message: 'Name note successfully change' });
    });
};


exports.delete_a_note = function(req, res) {

    Task.Note.remove( req.params, function(err, note) {
        if (err)
            res.send(err);
        res.json({ message: 'Note successfully deleted' });
    });
};