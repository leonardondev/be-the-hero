const connection = require('../database/connection');

module.exports = {
   async index(request,response) {
    const ong_id = request.headers.authorization;

    const incidents = await connection('incidents')
      .where('ong_id', ong_id)
      .select('*');

    return response.json(incidents);
   },
   
   // async show(request,response) {
   
   // },
   
   // async store(request,response) {
   
   // },
   
   // async update(request,response) {
   
   // },
   
   // async destroy(request,response) {
   
   // },
   
}