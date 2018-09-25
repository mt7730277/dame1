$(function(){
    //点击搜索按钮
    //获取填写在搜索框的值
    //跳转到search-result页面 显示出搜索的说有商品
    $("#search-btn").on("click",function(){
       var keyword = $(this).siblings().val();
    //    alert(keyword);
    //用户输入了关键子
        if(keyword) {
            keyArr.unshift(keyword);
            localStorage.setItem("keyArr",JSON.stringify(keyArr))
            //跳转到search-result页面
            location.href="search-result.html?keyword="+keyword;
        }else {
            alert("请输入搜索的商品");
        }
    })
    //实现历史关键字存储
    //1准备一個存储关键字的数组
    var keyArr = [];
    //
    if(localStorage.getItem("keyArr")) {
        keyArr = JSON.parse(localStorage.getItem("keyArr"));
        var html = template("historyTpl",{"result":keyArr})
        $("#history-box").html(html);
    }

    //实现清空历史数据
    $("#clearBtn").on("click",function(){
        //清空页面
        $("#history-box").html("");
        //清空数据
        localStorage.removeItem("keyArr");
        //清空数组
        keyArr = [];

    })
      
})