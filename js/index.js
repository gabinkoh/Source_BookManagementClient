/**
 * Created by CJuser on 2016-10-31.
 */
$(function(){

    $.ajax({
        url : "http://localhost:7070/book/userSession",
        type: "GET",
        dataType : "jsonp",
        jsonp : "callback",
        success : function(result){
            if (result.id != null) {//
                $("#loginout").text("logout");
                $("#loginout").attr("href","signIn.html");
            } else {
                $("#loginout").text("login");
                $("#loginout").attr("href","toSignIn.html");
            }
        },
        error: function () {
            alert("session check 이상")
        }
    });


    $("#signUpBtn").on("click", function () {
        alert("signUpBtn click");
        $("#userCheck").load("toSignUp.html");
    })

    $("#signIn").on("click", function () {

        $.ajax({
            url : "http://localhost:7070/book/userConfirm",
            type: "GET",
            dataType : "jsonp",
            jsonp : "callback",
            data :{
                id : $("#id").val(),
                pw : $("#pw").val()
            },
            success : function(result){
                if (result == "logout") {
                    alert("logout");
                } else {
                    alert("sign in 성공" + result);
                    $("#userCheck").load("signIn.html");
                    $("#userId").innerHTML = result.id;
                }
            },
            error: function () {
                alert("sign in 이상")
            }
        });
    })
    //
});

function signUp() {
alert("signUp() ..");
    $.ajax({
        url : "http://localhost:7070/book/userInsert",
        type: "GET",
        dataType : "jsonp",
        jsonp : "callback",
        data :{
            id : $("#id").val(),
            pw : $("#pw").val(),
            gender: $("input[name='gender']:checked").val()
        },
        success : function(result){

            $("#userCheck").load("toSignIn.html");
            alert("sign up 성공")

        },
        error: function () {
            alert("이상이상")
        }
    });
}

function logout() {
    $.ajax({
        url : "http://localhost:7070/book/userConfirm",
        type: "GET",
        dataType : "jsonp",
        jsonp : "callback",
        success : function(result){
            // $(location).load("index.html");
            location.reload();
            // alert("logout " + result.session);
        },
        error: function () {
            alert("이상이상")
        }

    });

    console.log("2 ");
}