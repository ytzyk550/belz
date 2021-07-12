const db = require('./db')
const utils = require('./utils')

async function addFamily(req, res ){
    try {
        const body = req.body;
        const date_now = new Date().toISOString().slice(0, 19).replace('T', ' ');
        let family = {
            last_update: date_now
        }
        let fields = [ 'family_name' ,'father' ,'mother' ,'city' ,'address' ,'phone' ,'father_phone' ,'mother_phone' ,'fax' ]
        fields.map(f => {
            family[f] = body[f]
        })
        await utils.insertToTable(res, 'families', family)
    }catch (error) {
        utils.catchError("addFamily", res, error);
    }
}    
  

async function getFamiliesList(req, res) {
    try {
        await utils.getTableData(res, 'families')
    } catch( error ){
        utils.catchError('getFamiliesList', res, error)
    }
}

async function getFamilyOffsprings(req, res) {
    try {
        let sql = `SELECT * FROM anash a
        LEFT JOIN families f ON f.id = ${req.params.id}
        WHERE f.father = a.father OR f.mother = a.mother`
        let result = await db.mysql_query_get_rows(sql)
        res.send(result)
    } catch( error ){
        utils.catchError('getFamilyOffsprings', res, error)
    }
}
 
let updateFamily = async (req, res) => {
    try {
        const body = req.body;
        const date_now = new Date().toISOString().slice(0, 19).replace('T', ' ');
        let family = {
            last_update: date_now
        }
        let fields = [ 'family_name' ,'father' ,'mother' ,'city' ,'address' ,'phone' ,'father_phone' ,'mother_phone' ,'fax' ]
        fields.map(f => {
            family[f] = body[f]
        })
        
        let condition = { id: body.id }
        await utils.updateInTable(res, 'families', family, condition)
    } catch (error) {
        utils.catchError('updateFamily', res, error)
    }
}

let getFamilyData = async (req, res) => {
    try {
        let condition = { id: req.params.id }
        await utils.getTableRow(res, 'families', condition)
    } catch( error ){
        utils.catchError('getFamilyData', res, error)
    }
}

let getFamilyByPhone = async (req, res) => {
    try {
        const phone = req.params.phone

        let properties_sql = `SELECT * FROM families WHERE phone = ${phone} OR father_phone = ${phone} OR mother_phone = ${phone}`;
        let properties = await db.mysql_query_get_rows(properties_sql)
        
        let father_data_sql = `SELECT * FROM anash WHERE id = ${properties[0].father}`;
        let mother_data_sql = `SELECT * FROM anash WHERE id = ${properties[0].mother}`;
        let children_sql = `SELECT * FROM anash WHERE father = ${properties[0].father} OR mother = ${properties[0].mother}`;

        let father_data = await db.mysql_query_get_rows(father_data_sql)
        let mother_data = await db.mysql_query_get_rows(mother_data_sql)
        let children = await db.mysql_query_get_rows(children_sql)

        let ret_data = {
            properties: properties[0],
            father_data: father_data[0],
            mother_data: mother_data[0],
            children: children,
        }
        res.send( ret_data || {})
    } catch( error ){
        utils.catchError('getFamilyByPhone', res, error)
    }
}

let getkvitleData = async (req, res) => {
    try {
        let sql = `SELECT a.*, (SELECT b.first_name FROM anash b WHERE b.id = a.spouse) AS spouse_data, (SELECT b.first_name FROM anash b WHERE b.father = a.id OR b.mother = a.id) AS children FROM anash a WHERE a.id = ${req.params.id}`;
        let result = await db.mysql_query(sql)
        res.send( result.rows[0])
    } catch( error ){
        utils.catchError('getkvitleData', res, error)
    }
}

module.exports = {
    getFamilyByPhone,
    getFamilyData,
    getFamilyOffsprings,
    getkvitleData,
    getFamiliesList,
    addFamily,
    updateFamily
}