import { MongoClient } from 'mongodb'
import config from '~/config/api-server'

const uri = `mongodb://${config.mongoDBHost}:${config.mongoDBPort}`

const _client = new MongoClient(uri, { useNewUrlParser: true })
const postsCol = config.postsCollectionName
const db = config.mongoDBName
export { _client as default, postsCol, db }

