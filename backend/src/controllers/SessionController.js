const database = require('../database/connection');

module.exports = {
  async store(req, res) {
    const { id } = req.body;

    const [ong] = await database('ongs')
      .where('id', id)
      .select('name');

    if (!ong) {
      return res.status(401).send();
    }

    return res.json({ ong });
  }
};
