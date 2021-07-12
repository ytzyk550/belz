const mysql = require('mysql');
const db = require('./db');


let catchError = (func_name, res, error) => {
    console.log(func_name+' Error: '+error)
    res.statusCode = 500
    res.send(func_name+' Error: '+error);
}

let insertToTable = async (res, table, data ) => {
  let sql = mysql.format(`INSERT INTO ${table} SET ?`, data);
    
  let result = await db.mysql_insert(sql)
  if (result > 0){
    res.statusCode = 200
    res.json({
      id: result,
      msg: `Row Added to ${table}!`
    })
  }else{
    res.statusCode = 500
    res.send(`Add row to ${table} Failed!`)
  }
}

let updateInTable = async (res, table, data, condition ) => {
  let sql = mysql.format(`UPDATE ${table} SET ? WHERE ?`, [data, condition]);
      
  let result = await db.mysql_update(sql)
  if (result > 0){
    res.statusCode = 200
    res.json({
      affectedRows: result,
      msg: `${result} Rows Updated in ${table}!`
    })
  }else{
    res.statusCode = 500
    res.send(`Update row in ${table} Failed!`)
  }
}

let getTableRow = async (res, table, condition) => {

  let sql = mysql.format(`SELECT * FROM ${table} WHERE ?`, [condition]);
  let result = await db.mysql_query(sql)
  res.send( result.rows[0] || {})
}

let getTableData = async (res, table, condition) => {

    let sql = `SELECT * FROM ${table}`;
    if (condition) {
      sql +=` ${condition}`
    }
    let result = await db.mysql_query(sql)
    res.send( result.rows)
}

module.exports = {
    catchError,
    insertToTable,
    getTableRow,
    getTableData,
    updateInTable
}