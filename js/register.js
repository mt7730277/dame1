$(function(){
    //点击注册按钮获取用户数据 发送ajax到后台
    $("#register-btn").on("tap",function () {
        // console.log(111)
        //获取用户名密码 手机号这些数据
        var username = $("input[name=username]").val();
        var mobile = $("input[name=mobile]").val();
        var password = $("input[name=password]").val();
        var againPass = $("input[name=againPass]").val();
        var vCode = $("input[name=vCode]").val();
        // console.log(username,mobile,password,againPass,vCode);
        if(!username){
            // alert("请输入用户名");
            mui.alert("请输入用户名")
            return;
        }
        var reg = /^1\d{10}$/
        if(!reg.test(mobile)){
            // alert("请输入用户名");
            mui.alert("请输入合法的手机号")
            return;
        }
        if(password != againPass){
            // alert("请输入用户名");
            mui.alert("两次密码输入不一致")
            return;
        }
        //f发送ajax
        $.ajax({
            type:"post",
            url:"/user/register",
            data:{
                "username":username,
                "mobile":mobile,
                "password":password,
                "vCode":vCode
            },
            success:function (res) {
                if(res.success){
                    mui.alert("注册成功");
                    setTimeout(function(){
                        location.href="login.html";
                    },2000)
                }
            }
        })
    })
    //获取验证码
    //1.给获取验证码的按钮添加点击事件
    //2.调用接口获取验证码
    $("#getCode").on('tap',function () {
        if($(".getCode").hasClass('disabled')) {
            return;
        }
        $.ajax({
            type:"get",
            url:"/user/vCode",
            success:function (res) {
                //短信倒计时获取
                $(".getCode").addClass('disabled');
                var countdown=60;
                var timeId = setInterval(function() {  
                    countdown--;
                    // console.log(123);
                    $(".getCode").text(countdown+"秒后重新获取");
                    if(countdown <= 0) {
                        $(".getCode").text('重新获取').removeClass('disabled');
                        clearInterval(timeId);
                    }
                },1000);  
                alert(res.vCode); 
            }
        })
    })
})