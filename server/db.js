const mysql = require('mysql');
const env = require('../configs/server_conf.json')

const conn_options = {
    host: env.DB_HOST,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    port: env.DB_PORT,
    timezone: 'utc'
}

// Mysql connection pool
let pool  = mysql.createPool( conn_options );

// https://medium.com/@magnusjt/gotcha-timezones-in-nodejs-and-mysql-b39e418c9d3
pool.on('connection', conn => {
    conn.query("SET time_zone='+00:00';", error => {
        if(error){
            throw error
        }
    })
    conn.query("SET SESSION group_concat_max_len = 10000000000000", error => {
        if(error){
            throw error
        }
    })
    conn.query("SET GLOBAL max_allowed_packet = 1073741824", error => {
        if(error){
            throw error
        }
    })
    ;
    
})


function mysql_query( sql )
{
    return new Promise( (resolve, reject) =>
    {
        pool.getConnection(function(err, connection) 
        {
            if (err) reject( err.message + ': ' + sql);
    
            connection.query(sql, function (err, rows, fields) 
            {
                connection.release();
                if (err)  
                {   
                    reject( err.message);
                    return;
                }
                resolve( {rows: rows, fields:fields})
            })
        })
    })
}

// Returns a promise. Resolve's parameter the last insert id
function mysql_insert( sql )
{
    return new Promise( (resolve, reject) =>
    {
        pool.getConnection(function(err, connection) 
        {
            if (err) reject( err.message);
    
            connection.query(sql, function (err, result) 
            {
                connection.release();
                if (err)  
                {   
                    reject( err.message + ": " + sql);
                    return;
                }
                resolve( result.insertId)
            })
        })
    })

}

// Returns a promise. Resolve's parameter the count of modified rows
function mysql_update( sql )
{
    return new Promise( (resolve, reject) =>
    {
        pool.getConnection(function(err, connection) 
        {
            if (err) reject( err.message);
    
            connection.query(sql, function (err, result) 
            {
                connection.release();
                if (err)  
                {   
                    reject( err.message);
                    return;
                }
                resolve( result.affectedRows)
            })
        })
    })

}

async function db_get_count( sql )
{
    let ret = 0;
    let f = await mysql_query( sql ).then
    (
        // OK
        (data) => 
        {
            if ( data.rows.length) 
                ret = data.rows[0][data.fields[0]["name"]];
        }
        , // Fail
        (err) => {throw err}
    );
    return ret;
}

async function mysql_query_get_rows( sql )
{
    let rows = null;
    await mysql_query( sql).then
    (
        data => rows = data.rows
        ,
        err => { throw err }
    )
    return rows;
}


module.exports ={ 
    mysql_query,
    db_get_count,
    mysql_insert,
    mysql_update,
    conn_options,
    mysql_query_get_rows,
    pool
};
