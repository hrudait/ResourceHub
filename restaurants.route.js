import express from "express";
import RestaurantsCtlr from "./restaurants.controller.js";
import ReviewsCtlr from "./reviews.controller.js";
const router = express.Router();

router.route("/").get(RestaurantsCtlr.apiGetRestaurants);

router
  .route("/review")
  .post(ReviewsCtrl.apiPostReview)
  .put(ReviewsCtrl.apiUpdateReview)
  .delete(ReviewsCtrl.apiDeleteReview);

export default router;
