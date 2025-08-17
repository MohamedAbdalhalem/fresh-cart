import axios from "axios";


export  function getallcategories() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
}