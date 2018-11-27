import server from 'post-api-server'
import config from '~/config/api-server'
import defaultConfig from '~/config/api-server-default'

const instance = new server(config,defaultConfig)

export function init(){
    return instance.init()
}

export function fetch({type, name, path}){
    
    let colName = ''
    let filter = {}

    if(type === 'post'){
        colName = config.postsCollectionName
        filter = {
            path:path
        }
    }else if(type === 'tag'){
        colName = config.tagsCollectionName
        filter = {
            name:name
        }
    }

    return instance.mgController.query(colName,filter)
}
