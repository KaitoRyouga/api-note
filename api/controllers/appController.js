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
    console.log(new_user);

    //handles null error
    if(!new_user.username){

        res.status(400).send({ error:true, message: 'Please provide Username' });

    }
    else{
        Task.User.createUser(new_user, function(err, user) {

            if (err)
                res.send(err);
            res.json(user);
        });
    }
};

exports.read_a_user = function(req, res) {
    Task.User.getUserById(req.params.userId, function(err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};

exports.update_a_user = function(req, res) {
    Task.User.updateById(req.params.userId, new Task.User(req.body), function(err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};


exports.delete_a_user = function(req, res) {

    Task.User.remove( req.params.userId, function(err, user) {
        if (err)
            res.send(err);
        res.json({ message: 'User successfully deleted' });
    });
};

// ###############################################################################################

exports.list_all_board = function(req, res) {
    Task.Board.getAllBoard(function(err, board) {

        if (err)
            res.send(err);
        res.send(board);
    });
};

exports.create_a_board = function(req, res) {
    var new_board = new Task.Board(req.body);
    console.log(new_board)
    console.log(req.body)
    console.log(new Task.Board(req.body))

    //handles null error
    if(!new_board.name){

        res.status(400).send({ error:true, message: 'Please provide Name' });

    }
    else{
        Task.Board.createBoard(new_board, function(err, board) {

            if (err)
                res.send(err);
            res.json(board);
        });
    }
};

exports.read_a_board = function(req, res) {
    Task.Board.getBoardById(req.params.boardId, function(err, board) {
        if (err)
            res.send(err);
        res.json(board);
    });
};

exports.update_a_board = function(req, res) {
    Task.Board.updateById(req.params.boardId, new Task.Board(req.body), function(err, board) {
        if (err)
            res.send(err);
        res.json(board);
    });
};


exports.delete_a_board = function(req, res) {


    Task.Board.remove( req.params.boardId, function(err, board) {
        if (err)
            res.send(err);
        res.json({ message: 'Board successfully deleted' });
    });
};

// ###############################################################################################

exports.list_all_note = function(req, res) {
    Task.Note.getAllNote(function(err, note) {

        if (err)
            res.send(err);
        res.send(note);
    });
};

exports.create_a_note = function(req, res) {
    var new_note = new Task.Note(req.body);

    //handles null error
    if(!new_note.name){

        res.status(400).send({ error:true, message: 'Please provide Name' });

    }
    else{
        Task.Note.createNote(new_note, function(err, note) {

            if (err)
                res.send(err);
            res.json(note);
        });
    }
};

exports.read_a_note = function(req, res) {
    Task.Note.getNoteById(req.params.noteId, function(err, note) {
        if (err)
            res.send(err);
        res.json(note);
    });
};

exports.update_a_note = function(req, res) {
    Task.Note.updateById(req.params.noteId, new Task.Note(req.body), function(err, note) {
        if (err)
            res.send(err);
        res.json(note);
    });
};


exports.delete_a_note = function(req, res) {


    Task.Note.remove( req.params.noteId, function(err, note) {
        if (err)
            res.send(err);
        res.json({ message: 'Note successfully deleted' });
    });
};