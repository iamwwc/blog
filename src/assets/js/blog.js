import $ from "jquery"
import debounce from '@/utils/debounce'

    ; $(function () {
        'use strict'
        //global
        let isMobile
        const mobileWidth = 800


            ; (function () {
                window.addEventListener('resize', debounce(() => {
                    isMobile = window.innerWidth <= mobileWidth
                }))
            })();

        // menu btn area
        ; (function () {
            let body = $("body")
            let menus = $(".menus")
            let menuBtn = $(".menu-btn")
            function closeMenuAndBtn(){
                menus.removeClass("opened")
                menuBtn.removeClass("btnClicked")
            }
            body.on("click", function ({ target }) {
                if (!menus[0].contains(target) && menus.hasClass("opened")) {
                    closeMenuAndBtn()
                }
            })

            menus.click(function(e){
                closeMenuAndBtn()
            })

            menuBtn.click(function(e){
                menuBtn.toggleClass("btnClicked")
                menus.toggleClass("opened")
                e.stopPropagation()
                e.preventDefault()
            })
        })();
    });