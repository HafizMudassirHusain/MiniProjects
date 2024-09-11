
var arr = [];
var getinfo = localStorage.getItem('userdetails');
if(getinfo != null){
    arr = JSON.parse(getinfo)
}

function signup(){
    var userName = document.getElementById('username');
    var email = document.getElementById('email');
    var pass = document.getElementById('password');
    var obj = {
        username : userName.value,
        eml : email.value,
        pswd : pass.value
    }
    arr.push(obj)
    localStorage.setItem('userdetails',JSON.stringify(arr));
}
function login(){
    var email = document.getElementById('email');
    var pass = document.getElementById('password');
    var arrFilters = arr.filter(data => data.eml === email.value && data.pswd === pass.value);
        if(arrFilters.length){
            alert('signIn successfull');
        }else{
            alert('email and pass is incorrect');
        }
}

