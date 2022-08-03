import axios from 'axios';

/***** USE BELOW IN DEVELOPMENT *****/
const BASE_URL = 'http://localhost:8000';

// in production, both apis and react app will be
// connected by k8s clusterIp and ingress will route api request
/***** USE BELOW IN PRODUCTION *****/
// const BASE_URL = 'https://meraretail.dev';

export const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});
