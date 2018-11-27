import { get } from './client-http'
import config from '~/config/api-server'

export default function fetch(params) {
    return get(params)
}


export function init() {
    return new Promise.resolve()
}
