import config from '~/config/api-server'

function fetch(url){
    let xhr
    try {
        xhr = new XMLHttpRequest()
    } catch (error) {
        console.log(error)
    }
    xhr.open('GET',url,true)
    xhr.send(null)
    return new Promise((resolve,reject) => {
        xhr.onreadystatechange(() => {
            if(xhr.readyState !== 4) return
            if(xhr.status !== 200){
                return reject(`server response with status code ${xhr.status}`)
            }
            resolve(xhr.responseText)
        })
    })
}

export function get(params){
    let queryString = Object.keys(params).reduce((prev,curr,currIndex,src) => {
        let encoded = encodeURIComponent(params[curr])
        prev = prev + `${curr}=${encoded}`
        currIndex === src.length - 1 ? prev : prev +='&'
        return prev
    },``)
    let target = `${config.serverApiPath}?${queryString}`
    return fetch(target)
}
