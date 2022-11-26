import axios from "axios";

const ENDPOINT = "https://cities-api.onrender.com/api/v1/"

export async function getCities(name: string, page: number) {
  return await axios.get(ENDPOINT + "cities", {
    params: { city: name, limit: 15, page }
  });
}

export async function getCity(_id: string){
  return await axios.get(ENDPOINT + "cities/" + _id);
}
