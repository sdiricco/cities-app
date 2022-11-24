import axios from "axios";

export async function getCities(name = "") {
  return await axios.get("https://cities-api.onrender.com/api/v1/" + "cities", {
    params: { city: name, limit: 10 }
  });
}
