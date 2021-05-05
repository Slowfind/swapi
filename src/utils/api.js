import axios from 'axios'

const api = axios.create({
    baseURL: 'https://swapi.dev/api/',
})

export const requestData = (setState, url) => {
    api.get(url)
        .then((response) => {
            setState((prevState) =>
                response.data.results
                    ? prevState.concat(response.data.results)
                    : prevState.concat(response.data)
            )
            response.data.next &&
                requestData(
                    setState,
                    response.data.next.replace('http://', 'https://')
                )
        })
        .catch((err) => {
            console.log(err, 'ошибка')
        })
}
