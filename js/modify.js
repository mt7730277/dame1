$(function () {
    //点击确认修改密码按钮 获取原密码 新密码 确认密码 验证码
    //判断是否副歌格式
    $("#modify-btn").on("tap",function () {
        var originPass = $("input[name = originPass]").val();
        var newPass = $("input[name = newPass]").val();
        var confNewPass = $("input[name = confNewPass]").val();
        var vCode = $("input[name = vCode]").val();
        // console.log(originPass,newPass,confNewPass,vCode);
        //判断是否符合
        if(!originPass) {
            mui.toast("请输入原密码");
            return;
        };
        if(newPass != confNewPass) {
            mui.toast("两次密码不一致");
            return;
        };
        // 发送ajax
        $.ajax({
            type:"post",
            url:"/user/updatePassword",
            data:{
                "oldPassword":originPass,
                "newPassword":newPass,
                "vCode":vCode
            },
            success:function (res) {
                if(res.success) {
                    mui.toast("修改成功");
                    setTimeout(function () {
                        location.href = "login.html";
                    },1000)
                }
            }
        })
    })

    //获取验证码 倒计时
    $("#getCode").on('tap',function () {
        if($(".getCode").hasClass('disabled')) {
            return;
        }
        $.ajax({
            type:"get",
            url:"/user/vCodeForUpdatePassword",
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