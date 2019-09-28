import axios from 'axios'
const apiEndpoint = process.env.NODE_ENV === 'development' ? 'http://localhost:3001/api': ''
const createAPIRoute = (endpoint) => {
    return `${apiEndpoint}/${endpoint}`
}
export const api = {
    fetchReports: async (request) => {
        const data = await axios({
            method: 'POST',
            url: createAPIRoute('reports'),
            data: request || {
                latitude: 40.018850,
                longitude: -105.264510,
                radiusInMiles: 5
            }
        }).then(resp => {
            return resp.data
        })
        return data
    },
}
