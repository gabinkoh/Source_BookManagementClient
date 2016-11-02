/**
 * Created by CJuser on 2016-10-31.
 */
function searchBook() {
    if(event.keyCode==13){
        $.ajax({
            url : "http://localhost:8080/lastTest/list",
            type: "get",
            dataType : "jsonp",
            jsonp : "callback",
            data :{
                keyword : $("#keyword").val()
            },

            success : function(result){

                console.log("here "+result.length);

                for (var i = 0; i < result.length; i++) {
                    var tr = $("<tr></tr>");
                    var titleTd = $("<td></td>").text(result[i].title);
                    var authorTd = $("<td></td>").text(result[i].author);
                    var priceTd = $("<td></td>").text(result[i].price);
                    var imgTd = $("<td></td>");
                    var img = $("<img />").attr("src", result[i].img);
                    imgTd.append(img);
                    var btnTd = $("<td></td>");
                    var btnInput = $("<input>");
                    btnInput.attr("type", "button");
                    btnInput.attr("value", "삭제");
                    btnInput.attr("onclick", "deleteFunc(this)");
                    btnTd.append(btnInput);
                    tr.append(imgTd);
                    tr.append(titleTd);
                    tr.append(authorTd);
                    tr.append(priceTd);
                    tr.append(btnTd);
                    $("tbody").append(tr);
                }
            },
            error: function () {
                alert("이상")
            }
        });
    }
}

function deleteFunc(obj) {
    $(obj).parent().parent().remove();
}