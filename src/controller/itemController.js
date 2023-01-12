const ItemModel = require("../model/item");
const { itemvalidation } = require("../validation/validation");
exports.createItem = async (req, res) => {
    let data = req.body;
    let error = itemvalidation(data);
    if (error) {
        error = error.details[0].message;
        return res.status(422).json({ status: false, error });
    }
    const item = await ItemModel.create(data);
    res.status(201).json({
        status: true,
        msg: "item created successfully",
        item,
    });
};

exports.getItems = async (req, res) => {
    const items = await ItemModel.find();
    res.status(200).json({ status: true, items });
};
