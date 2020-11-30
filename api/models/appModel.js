'user strict';
const sql = require('./db.js');
const bcrypt = require('bcryptjs')

// ###############################################################################################

const User = function(user){
    this.username = user.username;
    this.password = user.password;
};

User.getAllUser = function getAllUser(result) {
    sql.query("Select * from USER_NOTE", function (err, res) {

        if(err) {
            result(null, err);
        }
        else{
            result(null, res);
        }
    });
};

User.getUserById = function getUser(userId, result) {
    sql.query("Select username from USER_NOTE where id = ? ", userId, function (err, res) {
        if(err) {
            result(err, null);
        }
        else{
            result(null, res);

        }
    });
};

User.checkLogin = function getUser(user, result) {
    sql.query("Select password from USER_NOTE where username= ? ", user.username, async function (err, res) {
        const isPasswordMatch = await bcrypt.compare(user.password, res[0].password)
        if(err) {
            result(err, null);
        }
        else if (isPasswordMatch){
            result(null, user.username);
        }else{
            result('Wrong password!', null);
        }
    });
};

User.getUserByUsername = function getUser(username, result) {
    sql.query("Select username from USER_NOTE where username = ? ", username, function (err, res) {
        if(err) {
            result(err, null);
        }
        else{
            result(null, res);
        }
    });
};

User.createUser = async function createUser(newUser, result) {

    newUser.password = await bcrypt.hash(newUser.password, 8);

    sql.query("INSERT INTO USER_NOTE set ?", newUser, function (err, res) {

        if(err) {
            result(err, null);
        }
        else{
            result(null, res.insertId);
        }
    });
};

User.updateById = function(id, user, result){
    sql.query("UPDATE USER_NOTE SET username = ?, password = ? WHERE id = ?", [user.username, user.password, id], function (err, res) {
        if(err) {
            result(null, err);
        }
        else{
            result(null, res);
        }
    });
};

User.remove = function(id, result){
    sql.query("DELETE FROM USER_NOTE WHERE id = ?", [id], function (err, res) {

        if(err) {
            result(null, err);
        }
        else{

            result(null, res);
        }
    });
};

// ###############################################################################################

const Board = function(board){
    this.name = board.name;
    this.user_id = board.user_id;
};

Board.getAllBoard = function getAllBoard(result) {
    sql.query("Select * from BOARD", function (err, res) {

        if(err) {
            result(null, err);
        }
        else{
            result(null, res);
        }
    });
};

Board.getBoardById = function getBoard(boardId, result) {
    sql.query("Select name from BOARD where id = ? ", boardId, function (err, res) {
        if(err) {
            result(err, null);
        }
        else{
            result(null, res);

        }
    });
};

Board.createBoard = function createBoard(newBoard, result) {
    sql.query("INSERT INTO BOARD set ?", newBoard, function (err, res) {

        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res.insertId);
        }
    });
};

Board.updateById = function(id, board, result){
    sql.query("UPDATE BOARD SET name = ?, user_id = ? WHERE id = ?", [board.name, board.user_id, id], function (err, res) {
        if(err) {
            result(null, err);
        }
        else{
            result(null, res);
        }
    });
};

Board.remove = function(id, result){
    sql.query("DELETE FROM BOARD WHERE id = ?", [id], function (err, res) {

        if(err) {
            result(null, err);
        }
        else{
            result(null, res);
        }
    });
};

// ###############################################################################################

const Note = function(note){
    this.name = note.name;
    this.board_id = note.board_id;
    this.done = note.done;
};

Note.getAllNote = function getAllNote(result) {
    sql.query("Select * from NOTE", function (err, res) {

        if(err) {
            result(null, err);
        }
        else{
            result(null, res);
        }
    });
};

Note.getNoteById = function getNote(noteId, result) {
    sql.query("Select name from NOTE where id = ? ", noteId, function (err, res) {
        if(err) {
            result(err, null);
        }
        else{
            result(null, res);

        }
    });
};

Note.createNote = function createNote(newNote, result) {
    sql.query("INSERT INTO NOTE set ?", newNote, function (err, res) {

        if(err) {
            result(err, null);
        }
        else{
            result(null, res.insertId);
        }
    });
};

Note.updateById = function(id, note, result){
    sql.query("UPDATE NOTE SET name = ?, board_id = ?, done = ? WHERE id = ?", [note.name, note.board_id, note.done, id], function (err, res) {
        if(err) {
            result(null, err);
        }
        else{
            result(null, res);
        }
    });
};

Note.remove = function(id, result){
    sql.query("DELETE FROM NOTE WHERE id = ?", [id], function (err, res) {

        if(err) {
            result(null, err);
        }
        else{

            result(null, res);
        }
    });
};

module.exports= {
    User,
    Board,
    Note
};
