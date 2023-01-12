const router = require("express").Router();
const grncontroller = require("../controller/grnController");
const ordercontroller = require("../controller/orderController");
const grnLineItemscontroller = require("../controller/grnLIneItemController");
const orderLineItem = require("../controller/orderLineItemcontroller");
const itemController = require("../controller/itemController");
//-------------------GRN------------------------//

router.post("/creategrn", grncontroller.createGrn);
router.get("/getgrn", grncontroller.getGrn);
router.put("/grnupdate/:id", grncontroller.updateStatus);
router.delete("/grndelete/:id", grncontroller.deleteGrn);

//----------------GRN Line Items----------------//
router.post("/creategrnlineitem", grnLineItemscontroller.createGrnLineItem);
router.get("/grnlineitems", grnLineItemscontroller.getGrnlineitems);

//-------------------order--------------------//
router.post("/createorder", ordercontroller.ordercreate);
router.get("/getorder", ordercontroller.getOrder);
router.put("/orderupdate/:id", ordercontroller.updateStatusandQuantity);
router.delete("/orderdelete/:id", ordercontroller.deleteOrder);

//-----------------OrderLineItems------------//
router.post("/createorderlineitem", orderLineItem.createorderlineitem);
router.get("/getorderlineitems", orderLineItem.getorderlineitems);

router.post("/createitem", itemController.createItem);
router.get("/getitems", itemController.getItems);
module.exports = router;
