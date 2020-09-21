import axios from "axios";

const instance = axios.create({
  baseURL: "https://us-central1-clone-6145b.cloudfunctions.net/api",
  //'http://localhost:5001/clone-6145b/us-central1/api'   //This is API (cloud function) URL
});

export default instance;
