import { fetchAuthSession } from "aws-amplify/auth";
import axios from "axios";

const axiosConfig = axios.create({
  // .. where we make our configurations
});

// Also add/ configure interceptors && all the other cool stuff

axiosConfig.interceptors.request.use(
  async (request) => {
    let accesstoken;
    try {
      const { accessToken } = (await fetchAuthSession()).tokens ?? {};
      accesstoken = accessToken;
    } catch (err) {
      // console.log(err);
    }

    const req = request;
    if (accesstoken) {
      req.headers = {
        ...request.headers,
        authorization: `bearer ${accesstoken}`,
      };
    }

    return req;
  },
  (error) => Promise.reject(error)
);

export default axiosConfig;
