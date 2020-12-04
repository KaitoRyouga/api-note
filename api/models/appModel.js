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

User.getUserById = function getUser(userId, fun, result) {
    sql.query("Select username from USER_NOTE where id = ? ", userId, function (err ,res) {
        try {
            result(null, res);
        } catch (error) {
			return fun
			.status(404)
            .json({message: err.sqlMessage});
            
        }
    });
};

User.checkLogin = async function getUser(userTrans, result) {
    // console.log(user)

    try {
        sql.query("Select password, id from USER_NOTE where username = ? ", userTrans.username, async function (err, res) {

            console.log(res)

            const passLog = userTrans.password
    
            const isPasswordMatch = await bcrypt.compare(passLog, res[0].password)
    
            const resultUser = {
                username: userTrans.username,
                id: res[0].id
            }
    
            if(err) {
                result(err, null);
            }
            else if (isPasswordMatch){
                result(null, resultUser);
            }else{
                result('Wrong password!', null);
            }
        });        
    } catch (error) {
        result("Error", null);
    }
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

User.createUser = async function createUser(newUser, fun, result) {

    newUser.password = await bcrypt.hash(newUser.password, 8);

    sql.query("INSERT INTO USER_NOTE set ?", newUser, function (err, res) {
        console.log(err)
        try {
            result(null, res.insertId, newUser.username);
        } catch (error) {
			return fun
			.status(404)
			.json({message: err.sqlMessage});
        }
    });
};

User.updateById = async function(user, newPass, result){
    const Hashpass = await bcrypt.hash(newPass, 8);
    sql.query("UPDATE USER_NOTE SET username = ?, password = ? WHERE id = ?", [user.username, Hashpass, user.id], function (err, res) {
        if(err) {
            result(null, err);
        }
        else{
            result(null, res);
        }
    });
};

User.remove = function(id, result){

    // console.log(id)
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
};

Board.getAllBoard = function getAllBoard(user_id, fun, result) {
    sql.query("Select * from BOARD WHERE USER_ID = ?",user_id, function (err, res) {
        try {
            result(null, res);
        } catch (error) {
			return fun
			.status(404)
            .json({message: err.sqlMessage});
        }
    });
};

Board.getBoardById = function getBoard(boardId, user_id, result) {
    sql.query("SELECT * FROM BOARD WHERE id = ? AND user_id = ?", [boardId, user_id], function (err, res) {
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
            // console.log("error: ", err);
            result(err, null);
        }
        else{
            sql.query("SELECT * FROM BOARD WHERE id = ?",  res.insertId, function (err2, res2) {

                if(err2) {
                    // console.log("error: ", err);
                    result(err2, null);
                }
                else{
                    result(null, res2);
                }
            });
            // result(null, res.insertId);
        }
    });
};

Board.updateById = function(id, board, result){
    // console.log(board)
    sql.query("UPDATE BOARD SET name = ? WHERE id = ? and user_id = ?", [board.name, id, board.user_id], function (err, res) {
        if(err) {
            result(null, err);
        }
        else{
            result(null, res);
        }
    });
};

Board.updateColorById = function(id, board, result){
    // console.log(board)
    sql.query("UPDATE BOARD SET color = ? WHERE id = ? and user_id = ?", [board.color, id, board.user_id], function (err, res) {
        if(err) {
            result(null, err);
        }
        else{
            result(null, res);
        }
    });
};

Board.remove = function(id, token, result){
    sql.query("DELETE FROM BOARD WHERE id = ? and user_id = ?", [id, token.id], function (err, res) {

        if(err) {
            result(null, err);
        }
        else{
            result(null, res);
        }
    });
};

Board.checkBoard = function(boardId, token, result){
    sql.query("Select ID from BOARD WHERE user_id = ?", [token.id], function (err, res) {

        let checkkk = res.map(check => {
            if (boardId != check.ID){
                return false;
            } 
        })

        var sum = 0
        for (let i = 0; i < checkkk.length; i++) {
            if (checkkk[i] == false) {
                sum += 1;
            }     
        }

        if (sum == checkkk.length) {
            result("You are not authorized to access this page!", null)
        }else{
            result(null, res)
        }
    });
};

// ###############################################################################################

const Note = function(note){
    this.name = note.name;
    this.board_id = note.board_id;
    // this.done = note.done;
};



Note.getAllNote = function getAllNote(boardId, token, result) {

    sql.query("Select * from NOTE WHERE board_id = ?", [boardId], function (err, res) {

        if(err) {
            result(null, err);
        }
        else{
            result(null, res);
        }
    });

};

Note.getNoteById = function getNote(noteBoard, result) {
    sql.query("Select * from NOTE where id = ? and board_id = ?", [noteBoard.noteId, noteBoard.boardId], function (err, res) {
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
            // console.log("error: ", err);
            result(err, null);
        }
        else{
            sql.query("SELECT * FROM NOTE WHERE id = ?",  res.insertId, function (err2, res2) {

                if(err2) {
                    // console.log("error: ", err);
                    result(err2, null);
                }
                else{
                    result(null, res2);
                }
            });
            // result(null, res.insertId);
        }
    });
};

Note.updateById = function(note, name, result){
    sql.query("UPDATE NOTE SET name = ? WHERE board_id = ? and id = ?", [name, note.boardId, note.noteId], function (err, res) {
        if(err) {
            result(null, err);
        }
        else{
            result(null, res);
        }
    });
};

Note.updateColorById = function(note, color, result){
    sql.query("UPDATE NOTE SET color = ? WHERE board_id = ? and id = ?", [color, note.boardId, note.noteId], function (err, res) {
        if(err) {
            result(null, err);
        }
        else{
            result(null, res);
        }
    });
};


Note.remove = function(note, result){
    sql.query("DELETE FROM NOTE WHERE id = ? and board_id = ?", [note.noteId, note.boardId], function (err, res) {

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
