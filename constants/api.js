import axios from 'axios';

const DeviceHost = "192.168.1.34";
export const getAllUsers = async () => {
    const res = await axios.get(`http://${DeviceHost}:3000/getUsers`);
    const jsonResponse = res.data;
    return jsonResponse;
}
