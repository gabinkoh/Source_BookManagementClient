/**
 * Created by CJuser on 2016-10-31.
 */

var priceTd = null;
var titleTd = null;
var authorTd = null;
var img = null;
var imgTd = null;
var tr = null;
var reviewClickBtn = null;
var sessionId = null;

$(function () {

    var isbn = location.href.substr(
        location.href.lastIndexOf('=') + 1
    );
    console.log("isbn check.."+isbn);
    $.ajax({
        url : "http://localhost:7070/book/userSession",
        type: "GET",
        dataType : "jsonp",
        jsonp : "callback",
        success : function(result){
            sessionId = result.id;

        },
        error: function () {
            alert("이상이상")
        }
    });

})

function insertComment() {
   var isbn = location.href.substr(
        location.href.lastIndexOf('=') + 1
    );
    console.log("isbn check.."+isbn);
        $.ajax({
            url : "http://localhost:7070/book/commentInsert",
            type: "GET",
            dataType : "jsonp",
            jsonp : "callback",
            data :{
                title : $("#cTitle").val(),
                author : sessionId,
                text : $("#cText").val(),
                isbn : isbn

            },

            success : function(result){

                alert("성공")
                $(location).attr("href", "commentListForOne.html?isbn="+isbn);

            },
            error: function () {
                alert("이상이상")
            }
        });

}


