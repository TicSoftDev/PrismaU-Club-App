// import axios from "axios"
// import AsyncStorage from "@react-native-async-storage/async-storage";

// export const AxiosInterceptor = () => {

//     const updateHeader = (request) => {
//         const token = AsyncStorage.getItem("@token");
//         const newHeaders = {
//             "Content-type": "application/json",
//             Authorization: "Bearer " + token
//         }
//         request.headers = newHeaders;
//         return request;
//     }

//     axios.interceptors.request.use((request) => {
//         return updateHeader(request);
//     })
// }