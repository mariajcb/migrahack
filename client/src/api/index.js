import axios from 'axios'
const apiEndpoint = process.env.NODE_ENV === 'development' ? 'http://localhost:3001/api': 'https://migrahack-server.herokuapp.com/api'
const corsProxy = 'https://cors-anywhere.herokuapp.com/'
const createAPIRoute = (endpoint) => {
    return `${corsProxy}${apiEndpoint}/${endpoint}`
}
export const api = {
    fetchReports: async (request) => {
        const url = createAPIRoute('reports')
        const data = await axios({
            method: 'POST',
            url,
            data: request || {
                latitude: 40.018850,
                longitude: -105.264510,
                radiusInMiles: 5
            }
        }).then(resp => {
            console.log(resp.data)
            return resp.data
        })
        return data
    },
    addReport: async (request) => {
        const url = createAPIRoute('reports/new')
        return axios({
            method: 'POST',
            url,
            data: request
        }).then(resp => {
            console.log(resp.data)
            return resp.data
        })
    },
    addComment: async (request) => {
        const url = createAPIRoute('comments/new')
        return axios({
            method: 'POST',
            url,
            data: request
        }).then(resp => {
            console.log(resp.data)
            return resp.data
        })
    }

}
