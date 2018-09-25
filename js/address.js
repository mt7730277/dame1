$(function () {
    //发送ajax 获取所有的地址显示到页面上

    var address = null;
    $.ajax ({
        type:"get",
        url:"/address/queryAddress",
        success:function (res) {
            address = res;
            var html = template("addressTpl",{"result":res});
            $("#address-box").html(html);
        }
     })


     //删除收货地址
     $("#address-box").on("tap",".delete-btn",function () {
         var id = this.getAttribute("data-id")
         var li = this.parentNode.parentNode;
         mui.confirm("确认要删除吗?",function (message) {
            //  确认删除
             if(message.index == 1) {
                $.ajax({
                    type:"post",
                    url:"/address/deleteAddress",
                    data:{"id":id},
                    success:function (res) {
                        if(res.success) {
                            //重新加载页面
                            $(li).remove();
                        }
                    }
                })
             }else {
                //取消删除
                mui.swipeoutClose(li);
            }
         });
     })

     //编辑收货地址
     //1.给编辑按钮添加点击事件
     //2.跳转到收货地址编辑页面,并且要将编辑的数据展示在页面中
     $("#address-box").on("tap",".edit-btn",function () {
        var id = this.getAttribute("data-id");
        for(var i = 0; i < address.length; i++) {
            if(address[i].id == id) {
                // 把数据存起来, 用localStorage
                localStorage.setItem("editAddress",JSON.stringify(address[i]));
                // 把数组或者对象转换成字符串
                break;

            }
        }
        //跳转到编辑页面
        location.href = "addAddress.html?isEdit=1";
     })

})