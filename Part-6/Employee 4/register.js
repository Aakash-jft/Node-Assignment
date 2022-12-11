
$(function(){

  

$("#btn").on("click",(e)=>{
    let email = $("#email").val()   
    let obj = {
        name:email
    }

    
    alert("Welcome")
    

    let request = $.ajax({
        url: `http://localhost:3000/register`,
        type: "POST",
        crossDomain: true,
        withCredentials: true,
        
        
        data:  obj,
        
        contentType: "application/x-www-form-urlencoded",
        
        // dataType:"json"
        // contentType : "text/plain"
      });

      request.done(function (data) {
        console.log(data);

        // const expiry = 'Wed, 4 Feb 2023 12:00:00 UTC';
        // document.cookie = `key = ${data} , expires = ${expiry}`

      });

      request.fail(function (jqXHR, textStatus) {
        alert("Request failed: " + textStatus);
      });

});


 
 
})