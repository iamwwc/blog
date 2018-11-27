function mapGetters(getters){
    return getters.reduce((prev,curr) => {
        prev[curr] = function(){
            this.$store.getters[curr]
        }
        return prev
    })

}

export {
    mapGetters
}