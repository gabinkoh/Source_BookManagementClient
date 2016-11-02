/**
 * Created by CJuser on 2016-10-31.
 */
function searchBook() {
    if(event.keyCode==13){
        $.ajax({
            url : "http://localhost:7070/book/bookList",
            type: "get",
            dataType : "jsonp",
            jsonp : "callback",
            data :{
                keyword : $("#keyword").val()
            },

            success : function(result){

                console.log("here... ");
                console.log("here "+result.length);

                for (var i = 0; i < result.length; i++) {
                    var tr = $("<tr></tr>").attr("data-isbn", result[i].isbn);
                    var img = $("<img />").attr("src", result[i].img);
                    var imgTd = $("<td></td>").append(img);
                    var titleClick = $("<a></a>").attr("href", "detail.html").text(result[i].title);
                    var titleTd = $("<td></td>").append(titleClick);

                    var authorTd = $("<td></td>").text(result[i].author);
                    var priceTd = $("<td></td>").text(result[i].price);

                    var deletebtn = $("<input />").attr("type", "button").attr("value", "삭제");
                    var deleteBtnTd = $("<td></td>").append(deletebtn);
                    deletebtn.on("click", function () {
                        $(this).parent().parent().remove();
                    });

                    var updateBtn = $("<input />").attr("type", "button").attr("value", "수정");
                    var updateBtnTd = $("<td></td>").append(updateBtn);


                    updateBtn.on("updateBtn", function () {
                        //기존에 가격(숫자)는 입력칸으로 바뀌고 placeholder로 기존 값이 들어가 있고 삭제버튼은 disabled 수정버튼은 완료로 바꾼다.
                        //this : event source = updateBtn
                        //$(this).parent().parent().find("td:first-child").

                        // var title = $(this).parent().parent().find("td:nth-child(2)").text();
                        // var author = $(this).parent().parent().find("td:nth-child(3)").text();
                        var price = $(this).parent().parent().find("td:nth-child(4)").text();
                        var updateBox = ($("<input />")).attr("type", "text").val(price);
                        $(this).parent().parent().find("[type=button]").attr("value", "완료");
                        updateBtn.on("updateBtn", function () {
                            // if (event.keyCode == 13) {
                            //db처리. ajax호출해서 서버프로그램 실행시켜서 db의 데이터를 변경 : 변경된 책가격, isbn
                            var isbn = $(this).parent().parent().attr("data-isbn");
                            // var title = $(this).val();
                            // var author = $(this).val();
                            var price = $(this).parent().parent().find("td:nth-child(4)").val();
                            console.log("price " + price);
                            var tr = $(this).parent().parent();
                            //update 처리
                            $.ajax({
                                url: "http://localhost:7070/book/bookUpdate",
                                type: "GET",
                                dataType: "jsonp",
                                jsonp: "callback",
                                data: {
                                    isbn: isbn,
                                    price: price
                                },
                                success: function (data) {
                                    alert("updated");
                                    //화면처리
                                    tr.find("td:nth-child(4)").empty();
                                    tr.find("td:nth-child(4)").text(price);
                                    // tr.find("[type=button]").attr("value", "완료");
                                },
                                error: function () {
                                    alert("update error");
                                }
                            })
                            // }
                        });

                    //
                    //     var updateBox = ($("<input />")).attr("type", "text").val(price);
                    //     updateBox.on("keyup", function () {
                    //         if (event.keyCode == 13) {
                    //         //db처리. ajax호출해서 서버프로그램 실행시켜서 db의 데이터를 변경 : 변경된 책가격, isbn
                    //             var isbn = $(this).parent().parent().attr("data-isbn");
                    //             var price = $(this).val();
                    //             var tr = $(this).parent().parent();
                    //             //update 처리
                    //             $.ajax({
                    //                 url : "http://localhost:7070/book/bookUpdate",
                    //                 type : "GET",
                    //                 dataType : "jsonp",
                    //                 jsonp : "callback",
                    //                 data : {
                    //                     isbn : isbn,
                    //                     price : price
                    //                 },
                    //                 success : function (data) {
                    //                     alert("updated");
                    //                     //화면처리
                    //                     tr.find("td:nth-child(4)").empty();
                    //                     tr.find("td:nth-child(4)").text(price);
                    //                     tr.find("[type=button]").attr("disabled", "");
                    //                 },
                    //                 error : function () {
                    //                     alert("update error");
                    //                 }
                    //             })
                    //         }
                    //     });
                    //     $(this).parent().parent().find("td:nth-child(4)").text("");
                    //     $(this).parent().parent().find("td:nth-child(4)").append(updateBox);
                    //     $(this).parent().parent().find("[type=button]").attr("disabled", "disabled");
                    //     var here = $(this).parent().parent().find("td:nth-child(4)");
                    //
                    //
                    //
                    });

                    tr.append(imgTd);
                    tr.append(titleTd);
                    tr.append(authorTd);
                    tr.append(priceTd);
                    tr.append(deleteBtnTd);
                    tr.append(updateBtnTd);
                    $("tbody").append(tr);

                }
            },
            error: function () {
                alert("이상")
            }
        });
    }
}
