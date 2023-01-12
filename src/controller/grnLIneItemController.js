const GrnLineItemModel = require("../model/grnLIneItem");
const { GrnLineValidation } = require("../validation/validation");
// GRN completed -> status = COMPLETED, where item quantity also get updated.
exports.createGrnLineItem = async (req, res) => {
    const data = req.body;
    let error = GrnLineValidation(data);
    if (error) {
        console.log(error);
        error = error.details[0].message;
        return res.status(422).json({ status: false, error });
    }
    const grnLineItemCreated = await GrnLineItemModel.create(data);
    res.status(201).json({
        status: true,
        msg: "GrnLineItem created successfully",
        grnLineItem: grnLineItemCreated,
    });
};
exports.getGrnlineitems = async (req, res) => {
    const items = await GrnLineItemModel.find();
    res.status(200).json({ status: true, items });
};
