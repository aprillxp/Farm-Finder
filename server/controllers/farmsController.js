const imagekit = require("../config/imagekitConfig");
const { Farm, Image, sequelize } = require("../models");
const fs = require("fs");
const path = require("path");
const serverPath = path.join(__dirname, "..", "uploads");
const { Op } = require("sequelize");

class FarmController {
  static async getAllFarms(req, res, next) {
    try {
      let where = {
        status: "verified",
      };

      if (req.query.city) {
        where.city = { [Op.iLike]: `%${req.query.city}%` };
      }

      if (req.query.category) {
        where.category = { [Op.iLike]: `%${req.query.category}%` };
      }

      const farms = await Farm.findAll({
        where: where,
        include: [
          {
            model: Image,
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
        ],
        attributes: { exclude: ["createdAt", "updatedAt"] },
        order: [["createdAt", "ASC"]],
      });

      if (farms) {
        res.status(200).json(farms);
      }
    } catch (err) {
      // next(err);
    }
  }

  static async getFarmById(req, res, next) {
    try {
      const { farmId } = req.params;
      const farm = await Farm.findOne({
        include: {
          model: Image,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
        where: {
          id: farmId,
        },
      });

      if (!farm) throw { name: "InvalidFarmId" };

      res.status(200).json(farm);
    } catch (error) {
      next(error);
    }
  }

  static async addFarm(req, res, next) {
    const {
      name,
      category,
      city,
      address,
      latitude,
      longitude,
      videoUrl,
      benefits,
      sharePercent,
      price,
    } = req.body;
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ message: "No files were uploaded." });
    }

    const mainImgFile = req.files.photoUrl;
    const uploadPath = path.join(serverPath, mainImgFile.name);

    const transaction = await sequelize.transaction();

    try {
      await mainImgFile.mv(uploadPath);

      const uploadedMainImage = await imagekit.upload({
        file: fs.readFileSync(uploadPath),
        fileName: mainImgFile.name,
      });

      const mainImgUrl = uploadedMainImage.url;

      const createdFarm = await Farm.create(
        {
          name,
          category,
          city,
          address,
          mainImgUrl,
          latitude,
          longitude,
          videoUrl,
          benefits,
          sharePercent,
          price,
          FarmerId: req.farmer.id,
        },
        { transaction }
      );

      const farmId = createdFarm.id;
      const additionalImages = req.files.additionalImages || [];
      const additionalImageRecords = [];

      for (const additionalImgFile of additionalImages) {
        const additionalUploadPath = path.join(
          serverPath,
          additionalImgFile.name
        );

        await additionalImgFile.mv(additionalUploadPath);

        const uploadedAdditionalImage = await imagekit.upload({
          file: fs.readFileSync(additionalUploadPath),
          fileName: additionalImgFile.name,
        });

        const additionalImgUrl = uploadedAdditionalImage.url;

        additionalImageRecords.push({
          FarmId: farmId,
          imgUrl: additionalImgUrl,
        });

        fs.unlink(additionalUploadPath, (unlinkError) => {
          // if (unlinkError)
          //   console.error(`Unable to delete file: ${additionalUploadPath}`);
        });
      }
      await Image.bulkCreate(additionalImageRecords, { transaction });
      fs.unlink(uploadPath, (unlinkError) => {
        // if (unlinkError) console.error(`Unable to delete file: ${uploadPath}`);
      });

      await transaction.commit();
      res.status(201).json(createdFarm);
    } catch (err) {
      await transaction.rollback();
      fs.unlink(uploadPath, (unlinkError) => {
        // if (unlinkError) console.error(`Unable to delete file: ${uploadPath}`);
      });

      next(err);
    }
  }

  static async getAllUserFarms(req, res, next) {
    try {
      const farms = await Farm.findAll({
        where: {
          FarmerId: req.farmer.id,
        },
        include: [
          {
            model: Image,
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
        ],
        attributes: { exclude: ["createdAt", "updatedAt"] },
        order: [["createdAt", "ASC"]],
      });
      res.status(200).json(farms);
    } catch (err) {
      // next(err);
    }
  }

  static async getUserFarmById(req, res, next) {
    try {
      const { farmId } = req.params;
      const farm = await Farm.findOne({
        include: {
          model: Image,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
        where: {
          id: farmId,
        },
      });
      if (!farm) throw { name: "InvalidFarmId" };
      res.status(200).json(farm);
    } catch (err) {
      next(err);
    }
  }

  static async deleteByFarmId(req, res, next) {
    const { farmId } = req.params;
    const foundOne = await Farm.findOne({ where: { id: farmId } });
    if (!foundOne) {
      // throw { name: "InvalidFarmId" };
    }
    const deleted = await Farm.destroy({ where: { id: farmId } });
    try {
      if (deleted) {
        res.status(200).json({
          statusCode: 200,
          message: `${foundOne.name} successfully deleted`,
        });
        //   } else {
        //     throw { name: "InvalidFarmId" };
      }
    } catch (err) {
      // next(err);
    }
  }

  static async updateFarmStatus(req, res, next) {
    try {
      const { farmId } = req.params;
      const { status } = req.body;

      if (!["unverified", "verified", "sold"].includes(status)) {
        return res.status(400).json({ message: "Invalid status value" });
      }

      const updatedFarm = await Farm.update(
        { status: status },
        { where: { id: farmId } }
      );
      res.status(200).json({
        message: `Farm with id: ${farmId} status updated to ${status}`,
      });
    } catch (err) {
      // next(err);
    }
  }

  static async getAllMyFarm(req, res, next) {
    try {
      const data = await Farm.findAll({
        where: { status: "verified", FarmerId: req.farmer.id },
        include: {
          model: Image,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      });
      res.status(200).json(data);
    } catch (error) {
      // next(error)
    }
  }
}

module.exports = FarmController;
