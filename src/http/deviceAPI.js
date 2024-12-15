import {$authHost, $host} from "./index";

export const createType = async (type) => {
    const {data} = await $authHost.post('api/type', type);
    return data;
}
export const fetchTypes = async () => {
    const {data} = await $host.get('api/type');
    return data;
}

export const createBrand = async (brand) => {
    const {data} = await $authHost.post('api/brand', brand);
    return data;
}
export const fetchBrands = async () => {
    const {data} = await $host.get('api/brand');
    return data;
}

export const createDevice = async (device) => {
    const {data} = await $authHost.post('api/device', device);
    return data;
}
export const fetchDevices = async (typeId, brandId, page, limit = 5) => {
    const {data} = await $host.get('api/device', {params: {typeId, brandId, page, limit}});
    return data;
}
export const fetchOneDevice = async (id) => {
    const {data} = await $host.get('api/device/' + id);
    return data;
}

export const deviceToCart = async (device) => {
    const {data} = await $authHost.post('/api/cart', device);
    return data;
}
export const removeFromCart = async (deviceId) => {
    const {data} = await $authHost.delete('/api/cart', {data: {deviceId}});
    return data;
}
export const updateQuantity = async (deviceId, quantity) => {
    const {data} = await $authHost.put('/api/cart', {deviceId, quantity});
    return data;
}
export const fetchCart = async () => {
    const {data} = await $authHost.get('/api/cart');
    return data;
}

export const rateDevice = async (deviceId, userRating) => {
    const {data} = await $authHost.post('/api/rating', {deviceId, userRating});
    return data;
}
export const fetchRating = async (id) => {
    const {data} = await $authHost.get('/api/rating/' + id);
    return data;
}