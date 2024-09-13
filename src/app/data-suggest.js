const url =
  "http://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";
const token = "a8baa3f07d424b4e6e6be0aed01c725d70c1cb28";

//request to get addresses based on the entered string
export async function getAddress(inputValue) {
  const fetchData = {
    query: inputValue,
    locations: [
      {
        country: "Беларусь",
      },
      {
        country: "Россия",
      },
    ],
  };
  try {
    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Token " + token,
      },
      body: JSON.stringify(fetchData),
    });
    const data = await response.json();
    const addressList = data.suggestions.map((item) => item.value);
    return addressList;
  } catch (error) {
    console.log(error);
  } finally {
    console.log("Запрос адреса с dadata был");
  }
}
