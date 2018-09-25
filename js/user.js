var userInfo = null;

//获取用户信息并要处理用户未登录的问题
$.ajax({
    type:"get",
    url:"/user/queryUserMessage",
    async: false,
    success:function (res) {
        if(res.error && res.error == 400) {
            location.href = "login.html";
        }
        //存储用户的具体信息
        userInfo = res;
    }
})
$(function () {
    //获取到退出登录按钮并添加点击事件
    $("#logout").on("tap",function () {
        //调用接口实现退出登录
        $.ajax({
            type:"get",
            url:"/user/logout",
            success:function (res) {
                console.log(res);
                if(res.success) {
                    mui.toast("退出登录成功");
                    setTimeout(function () {
                        location.href="index.html";
                    },1000)
                }
            }
        })
    })

    //获取用户信息  拼接模板 显示到页面
    var html = template("userTpl",userInfo);
    $("#userInfo").html(html);
})