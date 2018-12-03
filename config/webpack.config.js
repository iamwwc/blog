module.exports = {
    dev:{
        proxyTable:{
            '/api/':{
                target:`http://localhost:5000`,
                changeOrigin:true
            }
        }
    },
    build:{
    }
}