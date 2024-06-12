import axiosConfig from "./axiosConfig";
// http://3.106.126.218:8080
export const postJob = async (data) => {
  try {
    return await axiosConfig.post(
      `${process.env.REACT_APP_JOB_SERVICE}/api/v1/post_job`,
      data
    );
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const createEnterprise = async (data) => {
  try {
    return await axiosConfig.post(
      `${process.env.REACT_APP_EMPLOYER_SERVICE}/api/v1/create_enterprise`,
      data
    );
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getEnterprises = async () => {
  try {
    return await axiosConfig.get(
      `${process.env.REACT_APP_EMPLOYER_SERVICE}/api/v1/get_enterprise_by_employer`
    );
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getEnterpriseInfo = async (id) => {
  try {
    return await axiosConfig.get(
      `${process.env.REACT_APP_EMPLOYER_SERVICE}/api/v1/get_enterprise_by_id/${id}`
    );
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getJobList = async (data) => {
  try {
    return await axiosConfig.get(
      `${process.env.REACT_APP_JOB_SERVICE}/api/v1/jobs_by_employer?page_id=${data.pageId}&page_size=${data.pageSize}`,
      data
    );
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getApplicationNumber = async (data) => {
  try {
    return await axiosConfig.get(
      `${process.env.REACT_APP_CANDIDATE_SERVICE}/api/v1/application_number_by_job_id/${data}`
    );
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getApplicationListAPI = async (data) => {
  try {
    return await axiosConfig.get(
      `${process.env.REACT_APP_CANDIDATE_SERVICE}/api/v1/application_list_by_employer?job_id=${data.id}&page_id=${data.pageId}&page_size=${data.pageSize}`
    );
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getCandidateProfileAPI = async (id) => {
  try {
    return await axiosConfig.get(
      `${process.env.REACT_APP_CANDIDATE_SERVICE}/api/v1/profile_by_employer/${id}`
    );
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getJob = async (id) => {
  try {
    return await axiosConfig.get(
      `${process.env.REACT_APP_JOB_SERVICE}/api/v1/job/${id}`
    );
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const updateJob = async (data) => {
  try {
    return await axiosConfig.post(
      `${process.env.REACT_APP_JOB_SERVICE}/api/v1/edit_job`,
      data
    );
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const closeJob = async (id) => {
  try {
    return await axiosConfig.post(
      `${process.env.REACT_APP_JOB_SERVICE}/api/v1/close_job`,
      { id }
    );
  } catch (error) {
    console.log(error);
    return error;
  }
};
