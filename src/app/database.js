import { databaseAddress } from "../vars";

export class CartProducts {
  //get data about products in the cart data about products in the cart
  static async getCartProducts() {
    try {
      const response = await fetch(`${databaseAddress}/basket`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    } finally {
      console.log("Запрос GET");
    }
  }

  //changing product details in cart
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
      console.log("Запрос PUT");
    }
  }

  //removing a product from the cart
  static async deleteProductFromCartProducts(id) {
    try {
      const response = await fetch(`${databaseAddress}/cart/${id}`, {
        method: "DELETE",
      });
      await response.json();
    } catch (error) {
      console.log(error);
    } finally {
      console.log("Запрос DELETE");
    }
  }

  //delete cart
  static async clearCartProduct(quantity) {
    for (let i = 1; i <= quantity; i++) {
      await this.deleteProductFromCartProducts(i);
    }
  }
}

//adding order information to the database
export async function addOrderDB(orderInfo) {
  try {
    const resp = await fetch(`${databaseAddress}/orders`, {
      method: "POST",
      body: JSON.stringify(orderInfo),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return resp.json();
  } catch (error) {
    console.log(error);
  } finally {
    console.log("Запрос POST был, заказ добавлен");
  }
}
