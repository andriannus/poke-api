import axios from 'axios';

import API from 'shared/constants/api.const';

const useAxios = () => {
  const baseApi = axios.create({
    baseURL: API.baseUrl,
    timeout: API.timeout,
  });
  const cancelToken = axios.CancelToken;

  return { baseApi, cancelToken };
};

export default useAxios;
