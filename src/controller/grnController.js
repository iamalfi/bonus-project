const { default: mongoose } = require("mongoose");
const GrnModel = require("../model/grn");
const { GrnValidation } = require("../validation/validation");
const GrnLineItemModel = require("../model/grnLIneItem");

// Action
// GRN created -> status = GENERATED, information get saved into db.

// Order created ->  status = GENERATED, information get saved into db.
// Order completed ->status = COMPLETED, where item quantity also get updated.

// APIS
// /grn (post, get, put ,delete)
exports.createGrn = async (req, res) => {
    const data = req.body;
    if (
        !data.grnLineItems ||
        !mongoose.Types.ObjectId.isValid(data.grnLineItems)
    ) {
        return res.status(422).json({ status: false, error: "Enter valid id" });
    }
    let error = GrnValidation(data);
    if (error) {
        error = error.details[0].message;
        return res.status(422).json({ status: false, error });
    }

    const created = await GrnModel.create(data);
    res.status(201).json({
        status: true,
        msg: "Grn created successfully",
        Grn: created,
    });
};

exports.getGrn = async (req, res) => {
    const grn = await GrnModel.find();
    res.status(200).json({ status: true, grn });
};

// /grn/update-status ( post ) body { status: “COMPLETED” }, or { status: “CANCELLED” }
exports.updateStatus = async (req, res) => {
    const id = req.params.id;
    //handle edge cases for id and status
    if (!req.body.status) {
        return res
            .status(400)
            .json({ status: false, msg: "status is required" });
    }
    const updatedGrn = await GrnModel.findByIdAndUpdate(
        id,
        { $set: { status: req.body.status } },
        { new: true }
    ).populate("grnLineItems");
    if (updatedGrn.status == "COMPLETED") {
        await GrnLineItemModel.findByIdAndUpdate(
            updatedGrn.grnLineItems,
            { $set: { quantity: 0 } },
            { new: true }
        );
    }
    res.status(200).json({
        status: true,
        msg: "status updated successfully",
        updatedGrn,
    });
};

exports.deleteGrn = async (req, res) => {
    const id = req.params.id;
    const grn = await GrnModel.findById(id);
    if (grn.deleted == true) {
        return res
            .status(400)
            .json({ status: false, msg: "GrnItem is already deleted" });
    }

    grn.deleted = true;
    grn.save();
    res.status(200).json({
        status: true,
        msg: "Grn deleted successfully",
        deletedGrn: grn,
    });
};
