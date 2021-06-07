import {$authHost, $host} from "./index";

export const createType = async (name) => {
    const {data} = await $authHost.post('api/type', {name});
    return data;
}

export const fetchType = async () => {
    const {data} = await $host.get('api/type');
    return data;
}

export const createBrand = async (name) => {
    const {data} = await $authHost.post('api/brand', {name});
    return data;
}

export const fetchBrand = async () => {
    const {data} = await $host.get('api/brand');
    return data;
}
export const createDevice = async (formData) => {

    const {data} = await $authHost.post('api/device', formData);

}

export const fetchDevice = async (typeId, brandId,  page, limit=3) => {
    const {data} = await $host.get('api/device', {params:{
        brandId, typeId, page, limit
        }});
    return data;
}

export const fetchOneDevice = async (id) => {
    const {data} = await $host.get('api/device/'+id);
    return data;
}