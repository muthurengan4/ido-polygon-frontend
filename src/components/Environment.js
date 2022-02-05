import axios from "axios";
import { apiConstants } from "./Constant/constants";
const apiUrl = "https://cms-busdxpad.nft-generator.online/api/user/"; // Production Mode

const Environment = {
 postMethod: async (action, object) => {
  let userId =
   localStorage.getItem("userId") !== "" &&
   localStorage.getItem("userId") !== null &&
   localStorage.getItem("userId") !== undefined
    ? localStorage.getItem("userId")
    : "";

  let accessToken =
   localStorage.getItem("accessToken") !== "" &&
   localStorage.getItem("accessToken") !== null &&
   localStorage.getItem("accessToken") !== undefined
    ? localStorage.getItem("accessToken")
    : "";

  const url = apiUrl + action;

  let formData = new FormData();

  // By Default Id and token

  formData.append("id", userId);
  formData.append("token", accessToken);

  var socialLoginUser = 0;

  // append your data
  for (var key in object) {
   formData.append(key, object[key]);

   if (key === "social_unique_id") {
    socialLoginUser = 1;
   }
  }

  // By Default added device type and login type in future use
  if (!socialLoginUser) {
   formData.append("login_by", apiConstants.LOGIN_BY);
  }

  formData.append("device_type", apiConstants.DEVICE_TYPE);
  formData.append("device_token", apiConstants.DEVICE_TOKEN);
  return await axios.post(url, formData);
 },

 getMethod: async (action, object) => {
  let userId =
   localStorage.getItem("userId") !== "" &&
   localStorage.getItem("userId") !== null &&
   localStorage.getItem("userId") !== undefined
    ? localStorage.getItem("userId")
    : "";
  let accessToken =
   localStorage.getItem("accessToken") !== "" &&
   localStorage.getItem("accessToken") !== null &&
   localStorage.getItem("accessToken") !== undefined
    ? localStorage.getItem("accessToken")
    : "";

  const url = apiUrl + action;

  let formData = new FormData();

  // By Default Id and token

  formData.append("id", userId);
  formData.append("token", accessToken);

  // append your data
  for (var key in object) {
   formData.append(key, object[key]);
  }

  // By Default added device type and login type in future use

  formData.append("login_by", apiConstants.LOGIN_BY);
  formData.append("device_type", apiConstants.DEVICE_TYPE);
  formData.append("device_token", apiConstants.DEVICE_TOKEN);

  return await axios.get(url, formData);
 },
};

export default Environment;
