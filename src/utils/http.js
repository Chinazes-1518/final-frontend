export function APIRequest(
    path,
    method = 'GET',
    query = {},
    body = {},
    auth = false,
) {
    return new Promise(async (resolve) => {
        let options = {
            method,
            headers: {
                'Content-Type': 'application/json',
            }
        }
        if (auth) {
            options.headers['token'] = window.localStorage.getItem('authToken')
        }

        if (method !== 'GET') {
            options.body = JSON.stringify(body)
        }

        let finalPath = import.meta.env.VITE_API_URL + path
        if (query) {
            finalPath += `?${new URLSearchParams(query)}`
        }

        console.log(finalPath, options)
        await fetch(finalPath, options)
            .then(async (res) => {
                return resolve({
                    json: await res.json(),
                    status: res.status,
                })
            })
            .catch((error) => {
                console.log(`ERROR: ${error}`)
                return resolve({
                    error: `ERROR: ${error}`,
                })
            })
    })
}