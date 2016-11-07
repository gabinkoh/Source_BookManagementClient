/**
 * Created by CJuser on 2016-10-31.
 */
var priceTd = null;
var titleTd = null;
var authorTd = null;
var img = null;
var imgTd = null;
var tr = null;
var dbtn = null;
var ubtn = null;
var stat = null;
var sessionId = null;
var id = null;
var lendBtn = null;
function searchBook() {
    if (event.keyCode == 13) {
    $.ajax({
        url: "http://localhost:7070/book/userSession",
        type: "GET",
        dataType: "jsonp",
        jsonp: "callback",
        success: function (result) {
            sessionId = result.id;
            console.log("sessionId.... " + sessionId);

            console.log(".... " + event.keyCode);
//

               test($("#keyword").val());


        },
        error: function () {
            alert("이상이상")
        }
    });
    }
}

function test(key) {
    $.ajax({
        url: "http://localhost:7070/book/bookList",
        type: "GET",
        dataType: "jsonp",
        jsonp: "callback",
        data: {
            keyword: key//$("#keyword").val()
        },
        success: function (result) {
            $("#list-description").text("책 표지를 클릭하면 상세정보를 알 수 있습니다.");

            //결과창출력
            $("tbody").empty();
            for (var i = 0; i < result.length; i++) {
                tr = $("<tr></tr>").attr("data-isbn", result[i].isbn);


                console.log("result[i].isbn " + result.length);
                lendBtn = $("<input />").attr("type", "button").attr("value", "lend");

                if (result[i].state != 1) {
                    lendBtn.attr("value", "대여");
                    lendBtn.on("click", function () {
                        var isbn = $(this).parent().parent().attr("data-isbn");
                        console.log("isbn "+isbn);
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
                                test(key);
                            },
                            error : function () {
                                alert("삭제 에러 발생!!")
                            }
                        });
                    });

                } else {
                    console.log("result[i].state == 1");
                    if (sessionId == result[i].uid) {

                        lendBtn.attr("value", "반납");
                        lendBtn.on("click", function () {
                            // alert("현재 내가 대여 중인 도서입니다.");
                            var isbn = $(this).parent().parent().attr("data-isbn");
                            $.ajax({
                                url : "http://localhost:7070/book/lendDelete",
                                type : "GET",
                                dataType : "jsonp",
                                jsonp : "callback",
                                data : {
                                    id : sessionId,
                                    isbn : isbn
                                },
                                success : function(result){
                                    alert("반납 성공.");
                                    test(key);
                                },
                                error : function () {
                                    alert("삭제 에러 발생!!")
                                }
                            });
                        })
                    } else {
                        //다른 사람이 빌린 책이면

                        lendBtn.attr("value", "대여불가");
                        lendBtn.on("click", function () {
                            alert("다른 이용자가 대여 중입니다.");

                        })
                    }
                }

                var lendTd = $("<td></td>").append(lendBtn);



                priceTd = $("<td></td>").text(result[i].price);
                // var detailBtn = $("<input />").attr("type","image").attr("src","detail1.png").attr("width", "15px").attr("height", "15px");
                var detailDiv = $("<div></div>").attr("id", result[i].isbn).attr("class", "detailDiv");
                var titleSpan = $("<span></span>").attr("id", "title" + result[i].isbn).text(result[i].title);
                titleTd = $("<td></td>").append(titleSpan).append(detailDiv);
                authorTd = $("<td></td>").text(result[i].author);

                // titleTd
                // detailDiv.hide();

                var isbn = $(this).parent().parent().attr("data-isbn");
                img = $("<input />").attr("type", "image").attr("src", result[i].img);
                imgTd = $("<td></td>").append(img);
                // var isbn = tr.attr("data-isbn");
                img.on("click", function () {
                    var isbn = $(this).parent().parent().attr("data-isbn");
                    //detail 처리
                    $.ajax({
                        url: "http://localhost:7070/book/bookDetail",
                        type: "GET",
                        dataType: "jsonp",
                        jsonp: "callback",
                        data: {
                            isbn: isbn
                        },
                        success: function (result) {
                            // detailBtn.parent().find("#"+isbn).append("123");
                            $("#" + isbn).append("출판일 : " + result.date + "<br>페이지 : " + result.page + "쪽<br>출판사 : " + result.publisher);

                        },
                        error: function () {
                            alert("상세정보 에러 발생!!")
                        }
                    });
                });

                dbtn = $("<input />").attr("type", "button").attr("value", "삭제");




                dbtn.on("click", function () {
                    var isbn = $(this).parent().parent().attr("data-isbn");
                    var pos = $(this).parent().parent();
                    //삭제처리
                    $.ajax({
                        url: "http://localhost:7070/book/bookDelete",
                        type: "GET",
                        dataType: "jsonp",
                        jsonp: "callback",
                        data: {
                            isbn: isbn
                        },
                        success: function (result) {
                            pos.remove();
                            alert("삭제되었습니다.");
                        },
                        error: function () {
                            alert("삭제 에러 발생!!")
                        }
                    });
                });
                var dbtnTd = $("<td></td>").append(dbtn);

                ubtn = $("<input />").attr("type", "button").attr("value", "수정").attr("id", "update");
                ubtn.on("click", function () {
                    detailDiv.remove();
                    var isbn = $(this).parent().parent().attr("data-isbn");
                    $(isbn).remove();
                    //수정처리
                    //title
                    var title = $(this).parent().parent().find("#title" + isbn).text();
                    var updateTitleBox = $("<input />").attr("type", "text").val(title);
                    $(this).parent().parent().find("#title" + isbn).text("");
                    $(this).parent().parent().find("td:nth-child(2)").append(updateTitleBox);

                    //author
                    var author = $(this).parent().parent().find("td:nth-child(3)").text();
                    var updateAuthorBox = $("<input />").attr("type", "text").val(author);
                    $(this).parent().parent().find("td:nth-child(3)").text("");
                    $(this).parent().parent().find("td:nth-child(3)").append(updateAuthorBox);

                    //price
                    var price = $(this).parent().parent().find("td:nth-child(4)").text();
                    var updatePriceBox = $("<input />").attr("type", "text").val(price);
                    $(this).parent().parent().find("td:nth-child(4)").text("");
                    $(this).parent().parent().find("td:nth-child(4)").append(updatePriceBox);

                    $(this).parent().parent().find($("#update")).attr("value", "완료");
                    var btn = $(this).parent().parent().find($("#update"));
                    btn.on("click", function () {
                        var title = updateTitleBox.val();
                        var author = updateAuthorBox.val();
                        var price = updatePriceBox.val();
                        var tr = $(this).parent().parent();
                        $.ajax({
                            url: "http://localhost:7070/book/bookUpdate",
                            type: "GET",
                            dataType: "jsonp",
                            jsonp: "callback",
                            data: {
                                isbn: isbn,
                                title: title,
                                author: author,
                                price: price
                            },
                            success: function (result) {
                                alert("정상입니다");
                                tr.find("#title" + isbn).empty();
                                tr.find("#title" + isbn).text(title);
                                tr.find("td:nth-child(3)").empty();
                                tr.find("td:nth-child(3)").text(author);
                                tr.find("td:nth-child(4)").empty();
                                tr.find("td:nth-child(4)").text(price);
                            },
                            error: function () {
                                alert("업데이트 에러 발생!!")
                            }
                        });
                    })
                });

                var ubtnTd = $("<td></td>").append(ubtn);


                selectReviewBtn = $("<input />").attr("type", "button").attr("value", "조회").attr("id", "selectReview");
                selectReviewBtn.on("click", function () {
                    $(location).attr("href", "commentListForOne.html?isbn=" + isbn);

                });
                reviewBtn = $("<input />").attr("type", "button").attr("value", "등록").attr("id", "review");
                reviewBtn.on("click", function () {
                    $(location).attr("href", "insertComment.html?isbn=" + isbn);

                });

                var reviewTd = $("<td></td>").append(selectReviewBtn).append(reviewBtn);

                tr.append(imgTd);
                tr.append(titleTd);
                tr.append(authorTd);
                tr.append(priceTd);
                tr.append(dbtnTd);
                tr.append(ubtnTd)
                tr.append(lendTd)
                tr.append(reviewTd)

                $("tbody").append(tr);
            }

        },
        error: function () {
            alert("이상이상")
        }
    });
}