import { get } from './client-http'

export default function fetch(params) {
    return get(params)
}


export function init() {
    return new Promise.resolve()
}
