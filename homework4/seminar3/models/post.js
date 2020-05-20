// module.exports = [
//     {
//         id:0,
//         title: '1번',
//         content: 'aaa',
//         nickname: 'A',
//         time: '2020-05-09 21:22:45'
//     },
//     {
//         id:1,
//         title: '2번',
//         content: 'bbb',
//         nickname: 'B',
//         time: '2020-05-10 04:23:25'
//     },
//     {
//         id:2,
//         title: '3번',
//         content: 'ccc',
//         nickname: 'C',
//         time: '2020-05-11 10:50:08'
//     }
// ];
const pool = require('../modules/pool');
const table = 'post';
var moment = require('moment');
var date=new Date();
let now=moment(date).format('YYYY-MM-DD HH:mm:ss');
const post = {
    postWrite : async(title, content, name) => {
        const fields = 'title, content, name, createdAt';
        const questions = `?,?,?,"${now}"`;
        const values = [title, content, name];
        const query = `INSERT INTO ${table}(${fields}) VALUES (${questions})`;
    
        try {
            const result = await pool.queryParamArr(query, values);
            const insertId = result.insertId;
            return insertId;
        } catch (err) {
            if (err.errno == 1062) {
                console.log('postWrite error: ', err.errno, err.code);
                return -1;
            }
            console.log('postWrite error: ', err);
            throw err;
        }
    },
    postUpdate : async (id,content) => {
        const fields = 'content=?';
        const query = `UPDATE ${table} SET ${fields} WHERE postIdx="${id}"`;
        const values = [content];
        try {
            const result = await pool.queryParamArr(query,values);
            return true;

        } catch (err) {
            console.log('postUpdate error: ', err);
            throw err;
        }
    },
    checkPost : async (id) => {
        const query = `SELECT * FROM ${table} where postIdx="${id}"`;
        try {
            const result = await pool.queryParamArr(query);

            if (result.length>0){
                return true;
            } else{
                return false;
            }

        } catch (err) {
            console.log('checkPost error: ', err);
            throw err;
        }
    },
    postDelete : async (id) => {
        const query = `DELETE FROM ${table} where postIdx="${id}"`;
    
        try {
            const result = await pool.queryParamArr(query);
            return true;

        } catch (err) {
            console.log('postDelete error: ', err);
            throw err;
        }
    },
    getPostById : async (id) => {
        const query = `SELECT * FROM ${table} where postIdx="${id}"`;
        try {
            const result = await pool.queryParamArr(query);
            return result[0];
        } catch (err) {
            console.log('getPostById error: ', err);
            throw err;
        }
    },
    getPostAll : async () => {
        const query = `SELECT * FROM ${table}`;
        try {
            const result = await pool.queryParamArr(query);
            return result;
        } catch (err) {
            console.log('getPostAll error: ', err);
            throw err;
        }
    },
}

module.exports = post;