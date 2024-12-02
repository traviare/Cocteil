import { databaseAddress } from "./vars";

export class CartProducts {
  static async getCartProducts() {
    try {
      const response = await fetch(`${databaseAddress}/cart`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    } finally {
      console.log("Запрос GET");
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
      console.log("Запрос PUT");
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
      console.log("Запрос DELETE");
    }
  }

  static async clearCartProduct(quantity) {
    for (let i = 1; i <= quantity; i++) {
      await this.deleteProductFromCartProducts(i);
    }
  }
}

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

export async function getProductsCatalog() {
  try {
    const response = await fetch(`${databaseAddress}/products-catalog`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  } finally {
    console.log("Запрос GET");
  }
}
