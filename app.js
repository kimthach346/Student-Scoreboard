let stt = 1
$(document).ready(function() {
    $("#modInfo").hide()
    $("#getInfo").click(function() {
        // Gán giá trị các biến nhập từ input
        let name = $("#fullName").val()
        let math = $("#mathScore").val()
        let physic = $("#phyScore").val()
        let chemistry = $("#chemScore").val()
        let avgScore = "?"

        // Xét điều kiện nhập tên
        if (name == "") {
            alert("Hãy nhập lại họ tên")
        }  
        // Xét điều kiện nhập điểm 
        else if (math < 0 || math > 10 ||
            physic < 0 || physic > 10 || 
            chemistry < 0 || chemistry > 10 || 
            math == "" || physic == "" || chemistry == "" ||
            isNaN(math) || isNaN(physic) || isNaN(chemistry)) {
                alert("Hãy nhập lại điểm thi!")
            }   
        else {
            // Tạo các dòng với data được gán cho từng ô
            let studentScore = "<tr data-chemistry='"+chemistry+"' data-physic='"+physic+"' data-math='"+math+"' data-name='"+name+"'><td>" + stt++ + "</td>" +
                                "<td>" +name+ "</td>" +
                                "<td>" +math+ "</td>" +
                                "<td>" +physic+ "</td>" +
                                "<td>" +chemistry+ "</td>" +
                                "<td>" +avgScore+ "</td>" +
                                "<td>" + '<button class="btn btn-outline-info hide updateInfo">Update</button>' +
                                '<button class="btn btn-outline-info editBtn">Edit</button>' + 
                                '<button class="btn btn-outline-info delBtn">Delete</button>' + "</td></tr>"
            $("#myTable").append(studentScore)
        
            // Xoá trắng dữ liệu trong input
            $("#fullName").val("")
            $("#mathScore").val("")
            $("#phyScore").val("")
            $("#chemScore").val("")
            }
    })

    // Xoá 1 hàng bất kì
    $("#myTable").on("click", ".delBtn", function() {
        $(this).parent().parent().remove()
        // Reset lại bộ đếm stt
        $("tr").each(function(i) {
            $(this).children("td").eq(0).html(i++)
        }) 
    })
    
    // Chỉnh sửa thông tin
    $("#myTable").on("click", ".editBtn", function() {
        // Nếu là HS giỏi sẽ xoá font chữ đỏ
        $(this).parents("tr").removeClass("red")
        // Gán thuộc tính cho từng biến
        let name = $(this).parents("tr").attr("data-name")
        let math = $(this).parents("tr").attr("data-math")
        let physic = $(this).parents("tr").attr("data-physic")
        let chemistry = $(this).parents("tr").attr("data-chemistry")
        // Thay đổi các ô thành input để sửa thông tin
        $(this).parents("tr").find("td:eq(1)").html("<input name='edit-name' type='text' value='"+name+"'>")
        $(this).parents("tr").find("td:eq(2)").html("<input name='edit-math' type='number' value='"+math+"'>")
        $(this).parents("tr").find("td:eq(3)").html("<input name='edit-physic' type='number' value='"+physic+"'>")
        $(this).parents("tr").find("td:eq(4)").html("<input name='edit-chemistry' type='number' value='"+chemistry+"'>")
        $(this).parents("tr").find("td:eq(5)").text("?")

        // Ẩn nút Edit và hiện nút Update 
        $(this).hide()
        $(this).parents("tr").find(".updateInfo").show().click(function() {
            // Lưu giá trị của các ô input vào từng biến
            let editName = $(this).parents("tr").find("input[name='edit-name']").val()
            let editMath = $(this).parents("tr").find("input[name='edit-math']").val()
            let editPhysic = $(this).parents("tr").find("input[name='edit-physic']").val()
            let editChemistry = $(this).parents("tr").find("input[name='edit-chemistry']").val()
            // Lưu thông tin đã chỉnh sửa vào bảng
            $(this).parents("tr").find("td:eq(1)").html(editName)
            $(this).parents("tr").find("td:eq(2)").html(editMath)
            $(this).parents("tr").find("td:eq(3)").html(editPhysic)
            $(this).parents("tr").find("td:eq(4)").html(editChemistry)
            // Cập nhật giá trị mới vào từng thuộc tính đã tạo
            $(this).parents("tr").attr("data-name", editName)
            $(this).parents("tr").attr("data-math", editMath)
            $(this).parents("tr").attr("data-physic", editPhysic)
            $(this).parents("tr").attr("data-chemistry", editChemistry)

            // Ẩn nút Update, hiện lại nút Edit
            $(this).hide()
            $(this).parents("tr").find(".editBtn").show()
        })

    })


    // Tính điểm trung bình
    $("#calcAvgScore").click(function() {
        $("tr").each(function() {
            let mScore = $(this).children("td").eq(2).html()
            let pScore = $(this).children("td").eq(3).html()
            let cScore = $(this).children("td").eq(4).html()
            let avgScore = ((parseFloat(mScore) + parseFloat(pScore) + parseFloat(cScore))/3).toFixed(1)
            $(this).find("td").eq(5).html(avgScore)
        })
    })

    // Tô đỏ học sinh giỏi
    $("#checkStudent").click(function() {
        $("tr").each(function() {
            let avgScore = $(this).children("td").eq(5).html()
            if (avgScore >= 8) {
                $(this).addClass("red")
            }
        })
    })
})