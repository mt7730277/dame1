$(function () {
    var kucunNum = 0
    var size = null;//全局存尺码
    //获取商品的id
    var id = getParamsByUrl(location.href,"id");//产品id
    //产品id
    $.ajax({
        type:"get",
        url:"/product/queryProductDetail",
        data:{
            "id":id
        },
        success:function (res) {
            console.log(res);

            kucunNum = res.num;
            var html = template("productTpl",res);
            $("#product-box").html(html);
            //获得slider插件对象
            var gallery = mui('.mui-slider');
            gallery.slider({
            });
        }
    })
    //点击尺码加上颜色
    $("#product-box").on("tap",".size span",function () {
        $(this).addClass("active").siblings("span").removeClass("active");
        size = $(this).html();//尺码
        
    });
    // 点击-
    $("#product-box").on("tap","#reduce",function () {
        var num = $("#ipt").val();
        num--;
        if(num < 1) {
            num = 1;
        }
        $("#ipt").val(num);

    })
    //点击+
    $("#product-box").on("tap","#increase",function () {
        var num = $("#ipt").val();
        num++;
        if(num > kucunNum) {
            num = kucunNum;
        }
        $("#ipt").val(num);
    })

    //加入购物车
    $("#product-box").on("tap","#addCart",function () {
        if(!size) {
            mui.alert("请选择尺码");
            return
        }
        var nowNum = $("#ipt").val()
        $.ajax({
            type:"post",
            url:"/cart/addCart",
            data:{
                "productId":id,
                "num":nowNum,
                "size":size
            },
            success:function (res) {
                if(res.success) {
                    mui.confirm("加入购物车成功,跳转到购物车?",function () {
                        location.href = "cart.html";
                    })
                }
            }

        })
    })


})