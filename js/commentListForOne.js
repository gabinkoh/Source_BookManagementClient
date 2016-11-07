/**
 * Created by CJuser on 2016-10-31.
 * 책 한 권에 대한 서평 리스트 보기
 */

var dateTd = null;
var titleTd = null;
var authorTd = null;
var img = null;
var imgTd = null;
var textTd = null;
var deleteTd = null;
var tr = null;
var deleteReviewBtn = null;
var isbn = null;
var sessionId = null;
//
// $(function () {
//
//
//
//
// })

function searchComment() {


    var isbn = location.href.substr(
        location.href.lastIndexOf('=') + 1
    );
    ajaxForComment();
    // if(isbn != "")
    //     key = "bisbn";
    if(event.keyCode==13) {
        console.log("isbn check.." + isbn);
        ajaxForComment();

    }
}

function ajaxForComment() {
    $.ajax({
        url: "http://localhost:7070/book/userSession",
        type: "GET",
        dataType: "jsonp",
        jsonp: "callback",
        success: function (result) {
            sessionId = result.id;
            console.log("session id check 1.. " + sessionId);

            if (str == "")
                key = "bisbn";

            var key = $("#keywordSelect option:selected").val();
            var str = $("#keyword").val();

            console.log("searchComment key check 1.. " + key);
            console.log("searchComment str check 1.. " + str);

            $.ajax({
                url: "http://localhost:7070/book/commentList",
                type: "GET",
                dataType: "jsonp",
                jsonp: "callback",
                data: {
                    keyword: key,
                    content: str
                },
                success: function (result) {

                    console.log("test..." + result.length);
                    //결과창출력
                    $("tbody").empty();
                    for (var i = 0; i < result.length; i++) {
                        tr = $("<tr></tr>").attr("data-isbn", result[i].isbn);
                        titleTd = $("<td></td>").attr("id", "title" + result[i].isbn).text(result[i].title);
                        authorTd = $("<td></td>").text(result[i].author);
                        dateTd = $("<td></td>").text(result[i].date);
                        textTd = $("<td></td>").text(result[i].text);
                        var cid = result[i].cid;

                        var isbn = $(this).parent().parent().attr("data-isbn");
                        img = $("<input />").attr("type", "image").attr("src", result[i].img);
                        imgTd = $("<td></td>").append(img);


                        deleteReviewBtn = $("<input />").attr("type", "button").attr("value", "삭제").attr("id", "deleteReviewBtn");
                        deleteReviewBtn.on("click", function () {
                            // isbn = $(this).parent().parent().attr("data-isbn");
                            // $(location).attr("href", "insertComment.html?isbn=" + isbn);
                            var pos = $(this).parent().parent();
                            var author = $(this).parent().parent().find("td:nth-child(3)").text();
                            if (sessionId == author) {
                                $.ajax({
                                    url: "http://localhost:7070/book/commentDelete",
                                    type: "GET",
                                    dataType: "jsonp",
                                    jsonp: "callback",
                                    data: {
                                        cid: cid
                                    },
                                    success: function (result) {


                                        pos.remove();
                                        alert("삭제되었습니다.");

                                    },
                                    error: function () {
                                        alert("이상이상")
                                    }
                                });
                            } else {
                                alert("삭제할 수 없습니다.");
                            }
                        });

                        var deleteTd = $("<td></td>").append(deleteReviewBtn);

                        tr.append(imgTd);
                        tr.append(titleTd);
                        tr.append(authorTd);
                        tr.append(dateTd);
                        tr.append(textTd);
                        tr.append(deleteTd);

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
}