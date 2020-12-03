'use strict';

const Task = require('../models/appModel.js');
const authMiddleware = require('../middleware/middlewares');
const login = authMiddleware.login;

// ###############################################################################################

exports.check_user = function(req, res) {
    const userLogin = req.body;
    Task.User.checkLogin(userLogin, function(err, user) {
        if (err)
            res.json({Error: err});
        else
            login(user, res);
            // console.log(user)
    });
};

exports.create_a_user = function(req, res) {
    var new_user = new Task.User(req.body);
    console.log(new_user)

    //handles null error
    if(!new_user.username){
        res.status(400).send({ message: 'Please provide Username' });
    }
    else{
        Task.User.createUser(new_user, res, function(err, userid, username ) {

            const new_userPayload = {
                "username": username,
                "id": userid
            }

            if (err)
                res.json({Error: err});
            else {
                login(new_userPayload, res)
            }
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
			.json({Error: err});
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
			.json({Error: err});
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
        res.status(400).send({ message: 'Please provide Name' });
    }
    else{
        Task.Board.createBoard(new_board, function(err, board) {
            if (err)
                res.json({Error: err});
            res.json(board[0]);
        });
    }
};

exports.read_a_board = function(req, res) {
    Task.Board.getBoardById(req.params.boardId, res.token.id, function(err, board) {
        if (err)
            res.json({Error: err});
        res.json(board[0]);
    });
};

exports.update_a_board = function(req, res) {

    const new_board = {
        "name": req.body.name,
        "user_id": res.token.id,
    }

    Task.Board.updateById(req.params.boardId, new_board, function(err, board) {
        if (err)
            res.json({Error: err});
        res.json({});
    });
};


exports.delete_a_board = function(req, res) {

    Task.Board.remove( req.params.boardId, res.token, function(err, board) {
        if (err)
            res.json({Error: err});
        res.json({});
    });
};

exports.check_board = function(req, res, next) {

    Task.Board.checkBoard( req.params.boardId, res.token, function(err, boards) {
        if (boards == null)
            res.json({Error: err});
        else
            next(null, boards)

    });
};

// ###############################################################################################

exports.list_all_note = function(req, res) {

    Task.Note.getAllNote(req.params.boardId, res.token, function(err, note) {

        const Re = [];
		note.map(r => Re.push(r))
		try {
			const arrayToString = JSON.stringify(Object.assign({}, Re));
			const stringToJsonObject = JSON.parse(arrayToString);
			return res.json(stringToJsonObject)
		} catch (error) {
			return res.json({Error: error})
		}
    });
};

exports.create_a_note = function(req, res) {

    const newNote = {
        "name": req.body.name,
        "board_id": req.params.boardId,
    }

    //handles null error
    if(!req.body.name){
        res.status(400).send({message: 'Please provide Name' });
    }
    else{
        Task.Note.createNote(newNote, function(err, note) {
            if (err)
                res.json({Error: err});
            // res.json({message: 'Create note successfully'});
            // res.json({id: note});
            res.json(note[0]);
        });
    }
};

exports.read_a_note = function(req, res) {
    Task.Note.getNoteById(req.params, function(err, note) {
        if (err)
            res.json({Error: err});
        res.json(note[0]);
    });
};

exports.update_a_note = function(req, res) {

    Task.Note.updateById(req.params, req.body.name, function(err, note) {
        if (err)
            res.json({Error: err});
        else
            res.json({});
    });
};


exports.delete_a_note = function(req, res) {

    Task.Note.remove( req.params, function(err, note) {
        if (err)
            res.json({Error: err});
        res.json({});
    });
};