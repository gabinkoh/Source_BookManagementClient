/**
 * Created by CJuser on 2016-10-31.
 */


function insertBook() {

    $.ajax({
        url : "http://localhost:7070/book/bookInsert",
        type: "GET",
        dataType : "jsonp",
        jsonp : "callback",
        data :{
            isbn : $("#insertIsbn").val(),
            title : $("#insertTitle").val(),
            date: $("#insertDate").val(),
            page : $("#insertPage").val(),
            price : $("#insertPrice").val(),
            author : $("#insertAuthor").val(),
            translator : $("#insertTranslator").val(),
            publisher : $("#insertPublisher").val(),
            img : "http://image.hanbit.co.kr/cover/_m_1063m.gif"
        },
        success : function(result){

            alert("성공")
            $(location).attr("href", "index.html");

        },
        error: function () {
            alert("이상이상")
        }
    });
}
