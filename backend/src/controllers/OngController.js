const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {
   async index(request,response) {
    const ongs = await connection('ongs').select('*');

    return response.json(ongs);
   },
   
   async show(request,response) {
   
   },
   
   async create(request,response) {
    const { name, email, whatsapp, city, uf } = request.body;

    const id = crypto.randomBytes(4).toString('HEX'); //gera id
    
    await connection('ongs').insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf,
    });
    
    return response.json({ id });
   },
   
  //  async update(request,response) {
   
  //  },
   
  //  async destroy(request,response) {
   
  //  },
   
}
