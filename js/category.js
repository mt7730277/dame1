$(function(){
    //初始换区域滚动组件
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
    //一开始就发送ajax获取左边一级分类的数组 拼接出html 显示到页面
    $.ajax({
        tupe:"get",
        url:"/category/queryTopCategory",
        success:function(response) {
            // console.log(response);
            var html = template("category-left-tpl",{"result":response.rows})
            $(".links").html(html);
            //有一级分类才会有二级分类 确定有才做二级分类
            if(response.rows.length) {
                $(".links").find("a").eq(0).addClass("active");
                //发送请求到第一个一级分类对应的二级分类
                var  id = response.rows[0].id;
                //根据id获取对应的二级分类
                getSecondCategory(id);
            }
            
        }
    })
    //点击一级分类 标签 
    $(".links").on("click","a",function(){
        //获取当前的id
        //发送ajax显示对应的二级分类数据
        var id = $(this).attr("data-id");
        $(this).addClass("active").siblings().removeClass("active");
        getSecondCategory(id);
    })
})
//二级分类的封装
function getSecondCategory(id) {
    $.ajax({
        type:"get",
        url:"/category/querySecondCategory",
        data:{"id":id},
        success:function (res) {
            // console.log(res);
            var html = template("category-second",res);
            $(".brand-list").html(html);
        }
    })
}