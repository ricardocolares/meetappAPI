import User from '../models/User';
import File from '../models/File';

class SpeakerController {
  async index(req, res) {
    const speakers = await User.findAll({
      where: { speaker: true },
      attributes: ['id', 'name', 'email', 'avatar_id'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    return res.json(speakers);
  }
}

export default new SpeakerController();
