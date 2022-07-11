import axios from 'axios';

// only to be used in development
// all api calls will be authenticated
// hence, withCredentials: true,

/***** USE BELOW IN DEVELOPMENT *****/
export const axiosIdInstance = axios.create({
  baseURL: 'http://localhost:8000/api/identity',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export const axiosPdInstance = axios.create({
  baseURL: 'http://localhost:8000/api/product',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// in production, both apis and react app will be
// connected by k8s clusterIp

/***** USE BELOW IN PRODUCTION *****/
// export const axiosInstance = axios.create({
//   baseURL: 'https://meraretail.dev/api/identity',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   withCredentials: true,
// });
