$(function(){

$("#btn").on("click",(e)=>{
    let email = $("#email").val()   
    let obj = {
        name:email
    }

    
    alert("welcome")
    

    let request = $.ajax({
        url: `http://localhost:3000/register`,
        type: "POST",
        data: JSON.stringify(obj),
        contentType: "application/json"
        // contentType : "text/plain"
      });

      request.done(function (data) {
        console.log(data);
        sessionStorage.setItem("usere",data);
        window.open("./index.html","_self");

      });

      request.fail(function (jqXHR, textStatus) {
        alert("Request failed: " + textStatus);
      });

});


 
 
})