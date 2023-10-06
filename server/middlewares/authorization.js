const { Farm } = require('../models')

async function authorizeDeleteFarm(req, res, next) {
  const { farmId } = req.params;

  try {
    const foundFarm = await Farm.findOne({ where: { id: farmId } });

    if (!foundFarm) {
      throw { name: "Farm Not Found" };
    }

    if (foundFarm.status === "verified") {
      throw {name: "forbidden"}
    }

    next();
  } catch (err) {
    next(err);
  }
}

module.exports = authorizeDeleteFarm