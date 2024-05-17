import axios from 'axios'

const domain = "http://localhost:5001/api"

const getSelectedCategory = async (id) => {
    let url = `${domain}/categories/${id}`;
    return await axios.get(url)
};

const getAllCategories = async () => {
    let url = `${domain}/categories`;
    return await axios.get(url)
};

const createCategory = async (payload) => {
    let url = `${domain}/categories`;
    return await axios.post(url, payload)
};

const editCategory = async ({ id, category }) => {
    let url = `${domain}/categories/${id}`;
    return await axios.put(url, category)
};

const deleteCategory = async (payload) => {
    let url = `${domain}/categories/${payload}`;
    return await axios.delete(url)
};
const addItemToCategory = async (payload) => {
    let url = `${domain}/categories/${payload?.categoryId}/items`;
    return await axios.post(url, payload.item)
};

const editItem = async ({ item, categoryId }) => {
    let url = `${domain}/categories/${categoryId}/items/${item?._id}`;
    return await axios.put(url, item)
};

const deleteItem = async ({ itemId, categoryId }) => {
    let url = `${domain}/categories/${categoryId}/items/${itemId}`;
    return await axios.delete(url)
};

export { getSelectedCategory, getAllCategories, createCategory, deleteCategory, editCategory, addItemToCategory, editItem, deleteItem }