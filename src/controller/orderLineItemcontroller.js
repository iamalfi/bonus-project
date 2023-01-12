const orderLineItemsModel = require("../model/orderLineItem");
const { orderLineValidation } = require("../validation/validation");
exports.createorderlineitem = async (req, res) => {
    const data = req.body;
    let error = orderLineValidation(data);
    if (error) {
        error = error.details[0].message;
        return res.status(422).json({ status: false, error });
    }
    const createditem = await orderLineItemsModel.create(data);
    res.status(201).json({
        status: true,
        msg: "orderLineITems created successfully",
        createditem,
    });
};
exports.getorderlineitems = async (req, res) => {
    const orderitems = await orderLineItemsModel.find();
    res.status(200).json({ status: true, orderitems });
};
