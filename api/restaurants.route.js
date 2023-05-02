import express from "express";
import RestaurantsCtlr from "./restaurants.controller.js";

const router = express.Router();

router.route("/").get(RestaurantsCtlr.apiGetRestaurants);
router.route("/add").get(RestaurantsCtlr.apiAddResource);
router.route("/like").get(RestaurantsCtlr.apiAddLike);

export default router;
