export default function debounce(fn, delay){
    let timer
    return function (){
        let self = this
        let args = arguments

        clearTimeout(timer)
        timer = setTimeout(() => {
            fn.call(self,args)
        },delay)
    }
}