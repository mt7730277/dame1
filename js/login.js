$(function () {
    //点击 登陆按钮 获取用户名和密码 判断是否符合
    $("#login-btn").on("click",function () {
        var username = $("input[name = username]").val();
        var password = $("input[name = password]").val();
        if(!username) {
            mui.toast("请输入用户名");
            return;
        }
        if(!password) {
            mui.toast("请输入密码");
            return;
        }
        //如果条件符合,发送ajax到后台
        $.ajax({
            type:"post",
            url:"/user/login",
            data:{"username":username,"password":password},
            beforeSend:function () {
                $("#login-btn").text("正在登录中");
            },
            success:function (res) {
                if(res.success) {
                    mui.toast("登录成功");
                    setTimeout(function () {
                        location.href = "user.html";
                    },2000);
                }
            }
        })
    })
})