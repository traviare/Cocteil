import { databaseAddress } from "../vars";

export class CartProducts {
  static async getCartProducts() {
    try {
      const response = await fetch(`${databaseAddress}/cart`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    } finally {
      console.log("Запрос GET был");
    }
  }

  static async changeCartProducts(product, id) {
    try {
      const response = await fetch(`${databaseAddress}/cart/${id}`, {
        method: "PUT",
        body: JSON.stringify(product),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      await response.json();
    } catch (error) {
      console.log(error);
    } finally {
      console.log("Запрос PUT был");
    }
  }

  static async deleteProductFromCartProducts(id) {
    try {
      const response = await fetch(`${databaseAddress}/cart/${id}`, {
        method: "DELETE",
      });
      await response.json();
    } catch (error) {
      console.log(error);
    } finally {
      console.log("Запрос DELETE был");
    }
  }
}
