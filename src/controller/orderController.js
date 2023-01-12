const OrderModel = require("../model/order");
const { orderValidation } = require("../validation/validation");
const orderLineItemModel = require("../model/orderLineItem");
const mongoose = require("mongoose");
//Order created ->  status = GENERATED, information get saved into db.
// /order (post, get, put ,delete)
exports.ordercreate = async (req, res) => {
    const data = req.body;
    if (
        !data.orderLineItems ||
        !mongoose.Types.ObjectId.isValid(data.orderLineItems)
    ) {
        return res.status(422).json({ status: false, error: "Enter valid id" });
    }
    let error = orderValidation(data);
    if (error) {
        error = error.details[0].message;
        return res.status(422).json({ status: false, error });
    }
    const created = await OrderModel.create(data);
    res.status(201).json({
        status: true,
        msg: "order created successfully",
        Order: created,
    });
};

exports.getOrder = async (req, res) => {
    const order = await OrderModel.find();
    res.status(200).json({ status: true, order });
};

// /order/update-status ( post ) body { status: “COMPLETED” }, or { status: “CANCELLED” }
// /item (get)
//Order completed ->status = COMPLETED, where item quantity also get updated.
exports.updateStatusandQuantity = async (req, res) => {
    const id = req.params.id;
    //handle edge cases for id and status
    if (!req.body.status) {
        return res
            .status(400)
            .json({ status: false, msg: "status is required" });
    }
    const updatedOrder = await OrderModel.findByIdAndUpdate(
        id,
        { $set: { status: req.body.status } },
        { new: true }
    ).populate("orderLineItems");
    if (updatedOrder.status == "COMPLETED") {
        await orderLineItemModel.findByIdAndUpdate(
            updatedOrder.orderLineItems,
            { $set: { quantity: 0 } },
            { new: true }
        );
    }
    res.status(200).json({
        status: true,
        msg: "status updated successfully",
        updatedOrder,
    });
};
exports.deleteOrder = async (req, res) => {
    const id = req.params.id;
    const order = await OrderModel.findById(id);
    if (order.deleted == true) {
        return res
            .status(400)
            .json({ status: false, msg: "OrderItem is already deleted" });
    }

    order.deleted = true;
    order.save();

    res.status(200).json({
        status: true,
        msg: "order deleted successfully",
        deletedorder: order,
    });
};
