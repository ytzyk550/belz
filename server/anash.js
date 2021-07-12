const db = require('./db')
const utils = require('./utils')

async function addPerson(req, res ){

    // let fields = ["first_name", "last_name"]//, "email"
    //   let at_last_one = ['email', 'phone_number']
    
    // let validation = is_validate_request(req, fields, at_last_one)
    // if( ! validation[0] ){
    //   res.statusCode=  400
    //   res.send(validation[1])
    //   return;
    // }
    try {
    //   if (req.body.email && req.body.email != ''){
    //     let is_email_exist = await chack_if_property_exist( 'email', req.body.email, pool, req.body.id )
    //     if( is_email_exist ){    
    //       res.statusCode = 409
    //       res.send("כתובת מייל קיימת")
    //       return;
    //     }
    //   }
      
      const body = req.body;
      const date_now = new Date().toISOString().slice(0, 19).replace('T', ' ');
      const person = {
        first_name: body.first_name,
        id_number: body.id_number,
        last_name: body.last_name,
        gender: body.gender || 0,
        mother: body.mother || 0,
        father: body.father || 0,
        spouse: body.spouse || 0,
        marital_status: body.marital_status || 0,
        birth_date: body.birth_date,
        last_update: date_now
      };
      await utils.insertToTable(res, 'anash', person)
    }catch (error) {
      utils.catchError("addPerson", res, error);
    }
}    
  

async function getAnashList(req, res) {
  try {
    await utils.getTableData(res, 'anash')
  } catch( error ){
    utils.catchError('getAnashList', res, error)
  }
}

let updatePerson = async (req, res) => {
  try {
    const body = req.body;
    const date_now = new Date().toISOString().slice(0, 19).replace('T', ' ');
    let person = {
      last_update: date_now
    }
    let fields = ['first_name', 'id_number', 'last_name', 'gender', 'mother', 'father', 'spouse', 'marital_status', 'birth_date']
    fields.map(f => {
      person[f] = body[f]
    })
    // const person = {
    //   first_name: body.first_name,
    //   id_number: body.id_number,
    //   last_name: body.last_name,
    //   gender: body.gender,
    //   mother: body.mother,
    //   father: body.father,
    //   spouse: body.spouse,
    //   marital_status: body.marital_status,
    //   birth_date: body.birth_date,
    //   last_update: date_now
    // };
    let condition = { id: body.id }
    await utils.updateInTable(res, 'anash', person, condition)
  } catch (error) {
    utils.catchError('updatePerson', res, error)
  }
}

let getPersonData = async (req, res) => {
  try {
    let condition = { id: req.params.id }
    await utils.getTableRow(res, 'anash', condition)
  } catch( error ){
    utils.catchError('getPersonData', res, error)
  }
}

let getkvitleData = async (req, res) => {
  try {
    let sql = `SELECT a.*, (SELECT b.first_name FROM anash b WHERE b.id = a.spouse) AS spouse_data, (SELECT GROUP_CONCAT(b.first_name) AS files FROM anash b WHERE b.father = a.id OR b.mother = a.id LIMIT 1) AS children FROM anash a WHERE a.id = ${req.params.id}`;
    let result = await db.mysql_query(sql)
    res.send( result.rows[0])
  } catch( error ){
    utils.catchError('getkvitleData', res, error)
  }
}

module.exports = {
  getPersonData,
  getkvitleData,
  getAnashList,
  addPerson,
  updatePerson
}