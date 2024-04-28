import axiosConfig from "./axiosConfig";

export const postJob = async (data) => {
  let res;
  try {
    res = await axiosConfig.post(
      `${process.env.REACT_APP_JOB_SERVICE_ADDRESS}/api/v1/post_job`,
      data
    );
  } catch (error) {
    console.log(error);
  }
  return res;
};

export const createEnterprise = async (data) => {
  let res;
  try {
    res = await axiosConfig.post(
      `${process.env.REACT_APP_EMPLOYER_SERVICE_ADDRESS}/api/v1/create_enterprise`,
      data
    );
  } catch (error) {
    console.log(error);
  }
  return res;
};
