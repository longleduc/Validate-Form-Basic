function isEmail(emailStr)
{
        var emailPat=/^(.+)@(.+)$/
        var specialChars="\\(\\)<>@,;:\\\\\\\"\\.\\[\\]"
        var validChars="\[^\\s" + specialChars + "\]"
        var quotedUser="(\"[^\"]*\")"
        var ipDomainPat=/^\[(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})\]$/
        var atom=validChars + '+'
        var word="(" + atom + "|" + quotedUser + ")"
        var userPat=new RegExp("^" + word + "(\\." + word + ")*$")
        var domainPat=new RegExp("^" + atom + "(\\." + atom +")*$")
        var matchArray=emailStr.match(emailPat)
        if (matchArray==null) {
                return false
        }
        var user=matchArray[1]
        var domain=matchArray[2]
 
        // See if "user" is valid
        if (user.match(userPat)==null) {
            return false
        }
        var IPArray=domain.match(ipDomainPat)
        if (IPArray!=null) {
            // this is an IP address
                  for (var i=1;i<=4;i++) {
                    if (IPArray[i]>255) {
                        return false
                    }
            }
            return true
        }
        var domainArray=domain.match(domainPat)
        if (domainArray==null) {
            return false
        }
 
        var atomPat=new RegExp(atom,"g")
        var domArr=domain.match(atomPat)
        var len=domArr.length
 
        if (domArr[domArr.length-1].length<2 ||
            domArr[domArr.length-1].length>3) {
           return false
        }
 
        if (len<2)
        {
           return false
        }
 
        return true;
}

$(document).ready(function(){
    $("#register").click(function(){
        var loginName = $("#loginName").val();
        var pwd = $("#password").val();
        var cf_pwd = $("#cf_password").val();
        var email = $("#email").val();
        var phoneNum = $("#phone_number").val();
        var address = $("#address").val();

        if (loginName == "")
        {
            $("#login_err").text("Vui lòng nhập tên đăng kí");
        } else {
            $("#login_err").text("");
        }
        if (pwd == "")
        {
            $("#pwd_err").text("Vui lòng nhập mật khẩu");
        } else {
            $("#pwd_err").text("");
        }
        if (cf_pwd == "")
        {
            $("#cf_pwd_err").text("Vui lòng xác nhận mật khẩu");
        } else {
            $("#cf_pwd_err").text("");
        }
        if (!isEmail(email))
        {
            $("#email_err").text("Email ko được để trống và phải đúng định dạng. VD: abc@gmail.com");
        } else {
            $("#email_err").text("");
        }
        if (phoneNum == "")
        {
            $("#phone_err").text("Vui lòng nhập số điện thoại");
        } else {
            $("#phone_err").text("");
        }
        if (address == "")
        {
            $("#address_err").text("Vui lòng nhập địa chỉ");
        } else {
            $("#address_err").text("");
        }
        if (pwd != cf_pwd) {
            $("#cf_pwd_err").text("Mật khẩu nhập lại không đúng");
        }
    });
});