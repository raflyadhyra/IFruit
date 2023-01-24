import IFruit from "../models/IFruit.js";

class DataController {
  async index(req, res) {
    try {
      const data = await IFruit.find({}, { fruitName: 1, _id: 0 }).sort({ fruitName: 1 });
      if (!data) {
        throw { code: 400, message: "DATA_NOT_FOUND" };
      }
      return res.status(200).json({
        status: true,
        message: "DATA_FOUND",
        data,
      });
    } catch (error) {
      return res.status(error.code || 500).json({
        status: false,
        message: error.message,
      });
    }
  }

  async type(req, res) {
    try {
      const data = await IFruit.aggregate([{ $match: { fruitType: req.body.type } }, { $group: { _id: "$fruitName" } }]);
      if (!data) {
        throw { code: 400, message: "DATA_NOT_FOUND" };
      }
      return res.status(200).json({
        status: true,
        message: "DATA_FOUND",
        data,
      });
    } catch (error) {
      return res.status(error.code || 500).json({
        status: false,
        message: error.message,
      });
    }
  }

  async sum(req, res) {
    try {
      const data = await IFruit.aggregate([{ $match: { fruitType: req.body.type } }, { $group: { _id: "$fruitType", total: { $sum: "$stock" } } }]); //error aggregate
      if (!data) {
        throw { code: 400, message: "DATA_NOT_FOUND" };
      }
      return res.status(200).json({
        status: true,
        message: "DATA_FOUND",
        data,
      });
    } catch (error) {
      return res.status(error.code || 500).json({
        status: false,
        message: error.message,
      });
    }
  }

  async store(req, res) {
    try {
      if (!req.body.fruitId) {
        throw { code: 400, message: "FRUITID_IS_REQUIRED" };
      }
      if (!req.body.fruitName) {
        throw { code: 400, message: "FRUITNAME_IS_REQUIRED" };
      }
      if (!req.body.fruitType) {
        throw { code: 400, message: "FRUITTYPE_IS_REQUIRED" };
      }
      if (!req.body.stock) {
        throw { code: 400, message: "STOCK_IS_REQUIRED" };
      }
      const data = await IFruit.create({
        fruitId: req.body.fruitId,
        fruitName: req.body.fruitName,
        fruitType: req.body.fruitType,
        stock: req.body.stock,
      });
      if (!data) {
        throw { code: 500, message: "FAILED_CREATE_DATA" };
      }

      return res.status(200).json({
        status: true,
        message: "SUCCESS_CREATE_DATA",
        data,
      });
    } catch (error) {
      return res.status(error.code || 500).json({
        status: false,
        message: error.message,
      });
    }
  }
}

export default new DataController();
