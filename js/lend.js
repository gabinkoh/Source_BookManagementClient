/**
 * Created by CJuser on 2016-11-04.
 */

var sessionId = null;

$(function () {
    $.ajax({
        url: "http://localhost:7070/book/userSession",
        type: "GET",
        dataType: "jsonp",
        jsonp: "callback",
        success: function (result) {
            sessionId = result.id;

            $.ajax({
                url : "http://localhost:7070/book/bookLend",
                type: "GET",
                dataType : "jsonp",
                jsonp : "callback",
                data :{
                    id : sessionId
                },
                success : function(result){
                    //대여한 책이 있다면..
                    // $("#list-description").text("책 표지를 클릭하면 상세정보를 알 수 있습니다.");
                    // <th>이미지</th>
                    // <th>제목</th>
                    // <th>저자</th>
                    // <th>대여일</th>
                    // <th>반납일</th>
                    // <th>반납</th>
                    //결과창출력
                    $("tbody").empty();
                    for (var i = 0; i < result.length; i++) {
                        tr = $("<tr></tr>").attr("data-isbn",result[i].isbn);
                        titleTd = $("<td></td>").attr("id", "title"+result[i].isbn).text(result[i].title);
                        authorTd = $("<td></td>").text(result[i].author);
                        // lendDateTd = $("<td></td>").text(result[i].ldate);
                        // returnDateTd = $("<td></td>").text(result[i].rdate);

                        // titleTd
                        // detailDiv.hide();

                        var isbn = $(this).parent().parent().attr("data-isbn");
                        img = $("<input />").attr("type", "image").attr("src",result[i].img);
                        imgTd = $("<td></td>").append(img);
                        // var isbn = tr.attr("data-isbn");


                        var lendBtn =$("<input />").attr("type","button").attr("value","대여").attr("onclick","returnBook("+isbn+", "+sessionId+")");
                        var lendTd= $("<td></td>").append(lendBtn);

                        tr.append(imgTd);
                        tr.append(titleTd);
                        tr.append(authorTd);
                        tr.append(lendDateTd)
                        tr.append(returnDateTd)
                        tr.append(lendTd)

                        $("tbody").append(tr);
                    }

                },
                error: function () {
                    alert("이상이상")
                }
            });
        },
        error: function () {
            alert("이상이상")
        }
    });
})



function lendBook(isbn, sessionId){
    // var isbn = $(this).parent().parent().attr("data-isbn");
    //lend처리
    $.ajax({
        url : "http://localhost:7070/book/lendInsert",
        type : "GET",
        dataType : "jsonp",
        jsonp : "callback",
        data : {
            id : sessionId,
            isbn : isbn
        },
        success : function(result){
            alert("성공.");
            //페이지 이동 메인으로.
        },
        error : function () {
            alert("삭제 에러 발생!!")
        }
    });
}

function returnBook(isbn, sessionId){
    // var isbn = $(this).parent().parent().attr("data-isbn");
    //lend처리
    $.ajax({
        url : "http://localhost:7070/book/lendDelete",
        type : "GET",
        dataType : "jsonp",
        jsonp : "callback",
        data : {
            uid : sessionId
        },
        success : function(result){
            alert("성공.");
            //페이지 이동 메인으로.
        },
        error : function () {
            alert("삭제 에러 발생!!")
        }
    });
}