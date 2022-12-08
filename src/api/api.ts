import axios from "axios";

const ENDPOINT = "https://sdiricco-cities-api.herokuapp.com/api/v1/";




export async function getCities(name: string, page: number) {
  return await axios.get(ENDPOINT + "cities", {
    params: { city: name, limit: 10, page },
  });
}

export async function getCity(_id: string) {
  return await axios.get(ENDPOINT + "cities/" + _id);
}
