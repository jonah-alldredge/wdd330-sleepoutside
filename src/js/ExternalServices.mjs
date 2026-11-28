const baseURL = import.meta.env.VITE_SERVER_URL;

export async function convertToJson(response) {
  const jsonResponse = await response.json();
  if (response.ok) {
    return jsonResponse;
  } throw {
    name: 'servicesError',
    message: jsonResponse,
  };
}

export default class ExternalServices {
  constructor(category) {
    this.category = category;
    this.path = `../json/${this.category}.json`;
  }
  async getData(category) {
    const response = await fetch(`${baseURL}products/search/${category}`);
    // console.log(response);
    const data = await convertToJson(response);
    // console.log(data.Result);
    return data.Result;
  }
  async findProductById(id) {
    const response = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(response);
    console.log(data.Result);
    return data.Result;
  }
  async checkout(payload) {
    return fetch(`${baseURL}/checkout/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    }).then(convertToJson);
  }
}