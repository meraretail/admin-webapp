import axios from 'axios';

// only to be used in development
// all api calls will be authenticated
// hence, withCredentials: true,

/***** USE BELOW IN DEVELOPMENT *****/
export const axiosClient = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// in production, both apis and react app will be
// connected by k8s clusterIp

/***** USE BELOW IN PRODUCTION *****/
// export const axiosClient = axios.create({
//   baseURL: 'https://meraretail.dev',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   withCredentials: true,
// });
