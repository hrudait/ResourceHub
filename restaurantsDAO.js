let restaurants;
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

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

  static async getRestaurants({ filters, page, restaurantsPerPage } = {}) {
    let query;
    if (filters) {
      if (filters.name) {
        let br = capitalizeFirstLetter(filters.name);
        let re = new RegExp(`${br}`, "");
        query = { name: re };
      } else if (filters.cuisine) {
        query = { cuisine: `${filters["cuisine"]}` };
      } else if (filters.zipcode) {
        query = { "address.zipcode": `${filters.zipcode}` };
      }
    }

    let cursor;

    try {
      cursor = await restaurants.find(query);
    } catch (e) {
      console.log(`Unable to issue find command, ${e}`);
      return { restaurantsList: [], totalNumRestaurants: 0 };
    }
    const displayCursor = cursor
      .limit(restaurantsPerPage)
      .skip(restaurantsPerPage * page);

    try {
      const restaurantsList = await displayCursor.toArray();
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
