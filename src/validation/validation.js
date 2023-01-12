const Joi = require("joi");

exports.GrnValidation = ({
    status,
    invoiceNumber,
    vendorName,
    vendorFullAddress,
}) => {
    const schema = Joi.object({
        status: Joi.string().required(),
        invoiceNumber: Joi.string().required(),
        vendorName: Joi.string().required(),
        vendorFullAddress: Joi.string().required(),
    });

    const { error } = schema.validate({
        status,
        invoiceNumber,
        vendorName,
        vendorFullAddress,
    });
    return error;
};

exports.GrnLineValidation = ({ productName, quantity, stockPrice }) => {
    const schema = Joi.object({
        productName: Joi.string().required(),
        quantity: Joi.number().required(),
        stockPrice: Joi.number().required(),
    });

    const { error } = schema.validate({ productName, quantity, stockPrice });
    return error;
};
exports.orderValidation = ({
    status,
    invoiceNumber,
    customerName,
    customerFullAddress,
}) => {
    const schema = Joi.object({
        status: Joi.string().required(),
        invoiceNumber: Joi.string().required(),
        customerName: Joi.string().required(),
        customerFullAddress: Joi.string().required(),
    });

    const { error } = schema.validate({
        status,
        invoiceNumber,
        customerName,
        customerFullAddress,
    });
    return error;
};

exports.orderLineValidation = ({ productName, quantity, sellPrice }) => {
    const schema = Joi.object({
        productName: Joi.string().required(),
        quantity: Joi.number().required(),
        sellPrice: Joi.number().required(),
    });

    const { error } = schema.validate({ productName, quantity, sellPrice });
    return error;
};

exports.itemvalidation = ({ productName, quantity, stockPrice, sellPrice }) => {
    const schema = Joi.object({
        productName: Joi.string().required(),
        quantity: Joi.number().required(),
        stockPrice: Joi.number().required(),
        sellPrice: Joi.number().required(),
    });
    const { error } = schema.validate({
        productName,
        quantity,
        stockPrice,
        sellPrice,
    });
    return error;
};
