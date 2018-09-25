$(function(){
    $("#index.btn").on("click",function(){
        console.log(11);
        // window.location.href = "search.html";
        $(location).attr("href","search.html");
    })
})