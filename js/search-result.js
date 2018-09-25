
//获取地址栏中用户输入的关键字
var keyword = getParamsByUrl(location.href,"keyword");
var page = 1;
var html = "";
var price = 1;
var That = "";
$(function(){
    //根据用户输入的关键字获取搜索结果
    //获取到地址栏中用户输入的搜索关键字
    //用关键字去调取搜索结果
    //将搜索结果展示在页面中
    // console.log(keyword);
    //根据关键字 发送ajax打破后台
    mui.init({
        pullRefresh : {
          container:"#refreshContainer",//待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
          up : {
            height:50,//可选.默认50.触发上拉加载拖动距离
            auto:true,//可选,默认false.自动上拉加载一次
            contentrefresh : "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
            contentnomore:'没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
            callback :getData //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
          }
        }
      });

      //价格排序
      $("#priceSort").on("tap",function(){
        //   console.log(1111);
          //更改价格排序条件
        price = price == 1 ? 2 : 1;
        //对之前的配置进行初始化操作
        html = "";
        page = 1;
        mui('#refreshContainer').pullRefresh().refresh(true);
        getData();
      })
})
//

function getParamsByUrl(url,name){
    var index = url.indexOf("?")+1;
    var params = url.substr(index);
    var param = params.split("&");//以$分割字符串
    for(var i = 0; i < param.length;i++){
        var current = param[i].split("=");
        if(current[0] == name){
            return current[1];
        }
    }
    return null;
}

function getData () {
    if(!That) {
        That = this;
    }
    $.ajax({
        type:"get",
        url:"/product/queryProduct",
        data:{
            "page":page++,
            "pageSize":3,
            "proName":keyword,
            "price":price
        },
        success:function(res){
            if(res.data.length > 0) {
                html += template("searchTpl",res);
                // console.log(html)
                $("#search-box").html(html);
                //隐藏正在加载的效果 
                That.endPullupToRefresh(false);
            }else {
                //显示没有数据了
                That.endPullupToRefresh(true);
            }
            
        }
    })
}