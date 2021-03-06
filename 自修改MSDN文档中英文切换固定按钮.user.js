// ==UserScript==
// @name         自修改MSDN文档中英文切换固定按钮
// @namespace    https://github.com/FarmerVincentFong
// @version      0.2
// @description  添加个固定的中英文切换固定按钮，方便切换阅读。
// @author       fwq
// @match        http*://msdn.microsoft.com/zh-cn/*
// @match        http*://docs.microsoft.com/zh-cn/*
// @match        http*://msdn.microsoft.com/en-us/*
// @match        http*://docs.microsoft.com/en-us/*
// @grant        none
// @remark       参考自“MSDN中英切换”
// ==/UserScript==

(function() {
    'use strict';

    var Scrollposition ;
    //获得滚动条距离顶部位置
    function getScrollTop(){
        var scrollTop=0;
        if(document.documentElement&&document.documentElement.scrollTop){
            scrollTop=document.documentElement.scrollTop;
        }else if(document.body){
            scrollTop=document.body.scrollTop;
        }
        return scrollTop;
    }
    var url = location.href;
    var a = document.createElement('span');
    function create_button(){
        var css = 'background-color:#8763c5;text-align:center;opacity:0.5;color:white;cursor:pointer;position:fixed;bottom:50%;width:55px;height:25px;right:5%;z-index:9999;font-size:12px;';
        a.style.cssText = css;
        a.innerHTML ='切换中英';
        a.addEventListener('mouseover', function(){ a.style.opacity = 1;}, false);
        a.addEventListener('mouseout', function(){ a.style.opacity = 0.7; }, false);
        a.addEventListener('click', function(){
            Scrollposition = getScrollTop();
            url += "?px="+ Scrollposition;
            //改为在本地存储中存当前滚动位置
            localStorage.setItem('fwqtest',Scrollposition);
            //获取原生“使用英语阅读”的checkbox，切换它。
//             var toggleLabel=document.querySelector("label[for=language-toggle]");
//             toggleLabel.click();
            //获取原生“使用英语阅读”按钮，切换它。
            var toggleBtn=document.querySelector("#lang-link");
            toggleBtn.click();
            setTimeout(()=>{
                var lastIndex = url.lastIndexOf("?");
//                 var px = url.substring(lastIndex+4,url.lenght);
                var px = localStorage.getItem('fwqtest')
                console.log(px)
                window.scrollTo(0,px);
            },500)
        }, false );
        document.body.appendChild(a);
    }
    create_button();
    //还有点问题，不能清空默认滚动高度。以后再说。
    function CheckScroll(){
        var px = localStorage.getItem('fwqtest')
        if(px){
            setTimeout(()=>{
                console.log(px)
                window.scrollTo(0,px);
            },500)
        }
}
    CheckScroll();
})();
// var lastIndex = window.location.href.lastIndexOf("?");
// var px = window.location.href.substring(lastIndex+4,window.location.href.lenght);
// window.scrollTo(0,px);