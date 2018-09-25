$(function () {
    $('body').on('tap','a',function () {
        mui.openWindow({
            url:$(this).attr("href")
        })
    })
})

//获取参数
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