$(function () {
     //添加跳过来会有isEdit = 0  编辑跳过来的会有isEdit = 1
     var isEdit = location.search.split("=")[1];
     if(isEdit == 0) {//添加跳过来
         var html = template("editTpl",{});
         $("#editForm").html(html);
     }else {//编辑跳过来的
         //如果有 把刚才存储的数据获取出来
         if(localStorage.getItem("editAddress")) {
             var address = JSON.parse(localStorage.getItem("editAddress"));
             console.log(address);
             var html = template("editTpl",address);
             $("#editForm").html(html);
         }
     }
    //选择省市区插件
    var picker = new mui.PopPicker({layer:3});
    picker.setData(cityData);
    $("#selectCity").on("tap",function () {
        picker.show(function (selectItems) {
            // selectItems[0].text 
            // selectItems[1].text
            // selectItems[2].text
            $("#selectCity").val(selectItems[0].text+selectItems[1].text+selectItems[2].text)
        }) 
    })

    //添加收货地址
    $("#addAddress").on("tap",function () {
        var username = $.trim($("input[name = 'username']").val());
        var postCode = $.trim($("input[name = 'postCode']").val());
        var city = $.trim($("input[name = 'city']").val());
        var detail = $.trim($("input[name = 'detail']").val());

        if(!username) {
            mui.toast("请输入收货人");
            return;
        };
        if(!postCode) {
            mui.toast("请输入邮编");
            return;
        }

        var data = {
                "address":city,
                "addressDetail":detail,
                "recipients":username,
                "postcode":postCode
            };

        if(isEdit == 1) {//编辑
            var url="/address/updateAddress";
            data.id = address.id;
            var msg = "编辑地址成功";
        }else {//添加
            var url="/address/addAddress";
            var msg = "添加地址成功";
        }

        $.ajax({
            type:"post",
            url:url,
            data:data,
            success:function (res) {
                if(res.success) {
                    //跳转到收货列表
                        mui.toast(msg);
                    setTimeout(function () {
                        location.href = "adress.html";
                    },1000);
                }
            }
        })
    })
   
})