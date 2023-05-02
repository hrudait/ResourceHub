let restaurants;

export default class RestaurantsDAO {
  static async injectDB(conn) {
    if (restaurants) {
      return;
    }
    try {
      restaurants = await conn.db("ResourceHub").collection("resources");
    } catch (e) {
      console.error(
        `Unable to establish a connection to handle in restaurantsDAO: ${e}`
      );
    }
  }
  static async addResource(filters) {
    filters.id_ = (await restaurants.countDocuments()) + 1;
    await restaurants.insertOne(filters);
  }
  static async addLike(id) {
    await restaurants.updateOne(
      { id_: id },
      {
        $inc: {
          likes: 1,
        },
      }
    );
  }
  static async getRestaurants({ filters }) {
    let query = {};
    let sorter = {};
    if (filters) {
      if (filters.class) {
        query.Class = filters.class;
      }
      if (filters.type) {
        query.Type = { $in: filters.type };
      }
      if (filters.free == 0) {
        query.Price = filters.free;
      }
      if (filters.paid == 0) {
        query.Price = { $ne: filters.paid };
      }
      if (filters.value) {
        sorter.Value = filters.value;
      }
    }

    let cursor;

    try {
      cursor = await restaurants.find(query).sort(sorter);
    } catch (e) {
      console.log(`Unable to issue find command, ${e}`);
      return { restaurantsList: [], totalNumRestaurants: 0 };
    }
    //const displayCursor = cursor
    //.limit(restaurantsPerPage)
    //  .skip(restaurantsPerPage * page);

    try {
      const restaurantsList = await cursor.toArray();
      const totalNumRestaurants = await restaurants.countDocuments(query);

      return { restaurantsList, totalNumRestaurants };
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${e}`
      );
      return { restaurantsList: [], totalNumRestaurants: 0 };
    }
  }
}
