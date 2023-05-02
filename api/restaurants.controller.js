import RestaurantsDAO from "../dao/restaurantsDAO.js";

export default class RestaurantsCtrl {
  static async apiGetRestaurants(req, res) {
    const restaurantsPerPage = req.query.restaurantsPerPage
      ? parseInt(req.query.restaurantsPerPage, 10)
      : 20;
    const page = req.query.page ? parseInt(req.query.page, 10) : 0;

    let filters = {};
    if (req.query.class) {
      filters.class = req.query.class;
    }
    if (req.query.type) {
      filters.type = req.query.type.split(",");
    }
    if (req.query.value) {
      filters.value = parseInt(req.query.value);
    }
    if (req.query.free) {
      filters.free = 0;
    }
    if (req.query.paid) {
      filters.paid = 0;
    }

    const { restaurantsList, totalNumRestaurants } =
      await RestaurantsDAO.getRestaurants({
        filters,
        page,
        restaurantsPerPage,
      });
    let response = {
      restaurants: restaurantsList,
      page: page,
      filters: filters,
      entries_per_page: restaurantsPerPage,
      total_results: totalNumRestaurants,
    };
    res.json(response);
  }
  static async apiAddResource(req, res) {
    let filters = {};
    filters.Class = req.query.class;
    filters.Title = req.query.title;
    filters.Description = req.query.description;
    filters.Link = req.query.link;
    filters.Type = req.query.type;
    filters.Price = req.query.price;
    await RestaurantsDAO.addResource(filters);
    res.redirect("/");
  }
  static async apiAddLike(req, res) {
    console.log(req.query.id);
    let id = parseInt(req.query.id);
    await RestaurantsDAO.addLike(id);
    res.redirect("/");
  }
}
