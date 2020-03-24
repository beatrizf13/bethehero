const database = require('../database/connection');

module.exports = {
  async index(req, res) {
    const incidents = await database('incidents').select('*');

    return res.json({ incidents });
  },

  async show(req, res) {
    const ong_id = req.headers.authorization;

    const incidents = await database('incidents')
      .where('ong_id', ong_id)
      .select('*');

    return res.json({ incidents });
  },

  async store(req, res) {
    const { title, description, value } = req.body;
    const ong_id = req.headers.authorization;

    const [id] = await database('incidents').insert({
      ong_id,
      title,
      description,
      value
    });

    return res.json({
      id
    });
  },

  // async update(req, res) {},

  async destroy(req, res) {
    const { id } = req.params;
    const ong_id = req.headers.authorization;

    const [incident] = await database('incidents')
      .where('id', id)
      .select('ong_id');

    if (incident.ong_id !== ong_id) {
      return res.status(401).send();
    }

    await database('incidents')
      .where('id', id)
      .delete();

    return res.status(204).send();
  }
};
