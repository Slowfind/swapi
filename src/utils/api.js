import axios from 'axios'

const api = axios.create({
    baseURL: 'https://swapi.dev/api/',
    responseType: 'json',
})
/* получение данных для Home и Films */
export const requestDataSmall = (url, setState, setError, setGotEveryone) => {
    api.get(url)
        .then((response) => {
            if (response.status === 404) setGotEveryone(true)
            else {
                setState(response.data)
            }
        })
        .catch((err) => setError(err))
}
/* получение данных для Остальных */
export const requestData = (
    setLoading,
    setState,
    setError,
    setPage,
    setGotEveryone,
    page,
    url
) => {
    api.get(`${url}/?page=${page}`)
        .then((response) => {
            const stateFn = () => {
                setState((prevState) =>
                    response.data.results
                        ? prevState.concat(response.data.results)
                        : prevState.concat(response.data)
                )
            }
            if (response.data.next === null) {
                stateFn()
                setGotEveryone(true)
            } else {
                stateFn()
                let page = response.data.next && response.data.next.slice(-1)
                setPage(page)
            }
        })
        .catch((err) => setError(err))
        .finally(() => setLoading(false))
}
