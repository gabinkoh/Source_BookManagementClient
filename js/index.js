/**
 * Created by CJuser on 2016-10-31.
 */

function sessionCheck() {
    $.ajax({
        url : "http://localhost:7070/book/userSession",
        type: "GET",
        dataType : "jsonp",
        jsonp : "callback",
        success : function(result){
            if (result != null) {//login된 상황
                $("#loginout").text("logout");
                $("#loginout").attr("onclick","logout()");
                // $(location).attr("href", "select.html");
            } else {

                console.log(result);
                // $("#loginout").text("login");
                location.replace("toSignIn.html");
            }
        },
        error: function () {
            alert("session check 이상")
        }
    });
}
$(function(){

    sessionCheck();

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
                } else {
                    alert("sign in 성공" + result);
                    $(location).attr("href", "index.html");
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

            $(location).attr("href","toSignIn.html");
            alert("sign up 성공")

        },
        error: function () {
            alert("이상이상")
        }
    });
}

function logout() {
    console.log("logout ");
    $.ajax({
        url : "http://localhost:7070/book/userConfirm",
        type: "GET",
        dataType : "jsonp",
        jsonp : "callback",
        success : function(result){
            // $(location).load("index.html");
            $(location).attr("href", "index.html");
            // alert("logout " + result.session);
        },
        error: function () {
            alert("이상이상")
        }

    });

}