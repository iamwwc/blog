module.exports = {
    dev:{
        proxyTable:{
            '/api':{
                target:`127.0.0.1:5000/api/blog`,
                changeOrigin:true
            }
        }
    }
}