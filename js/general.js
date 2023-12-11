const config = {
    apiData : "https://65766ddc0febac18d403e2e5.mockapi.io/api/",
    urlImage : "./img/"
}
const app = {
    userInfo : {},
    login : function(){
        var val = localStorage.getItem('user');
        return val != null && val != ''  ? true : false;
    },
    params : {},
    handleEvent : function(){
        $('.signUpLetter').click(()=>{
            alert('Chức năng đang được phát triển');
        })
        $('.logout').click(function(event){
            localStorage.setItem('user','');
            localStorage.setItem('userInfo', '');
            event.preventDefault();
            window.location.href = "/";
        })
    },
    parseParam : function(param){
        const _dis = this
        let arr = param?.replace("?","").split('&');
        arr.forEach(function(item){
            let a = item.split('=');
            _dis.params[a[0]] = a[1];
        })
    },
    getData : function(url, callback){
        $.get(url,(data) => callback(data))
    },
    loadData : function(){
        this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
        this.userInfo.courses = JSON.parse(this.userInfo.courses)
        console.log(this.userInfo.courses)
    },
    saveData : function(){
        this.userInfo.courses = JSON.stringify(this.userInfo.courses)
        console.log(this.userInfo.courses)
        $.ajax({
            url: `${config.apiData}users/${this.userInfo.id}`, 
            type: 'PUT',
            contentType: 'application/json', 
            data: JSON.stringify(this.userInfo), 
            success: function(response) {
              console.log('Update thành công !', response);
            },
            error: function(xhr, status, error) {
              console.error('Đã có lỗi khi thực hiện PUT request:', error);
            }
          });
        localStorage.setItem('userInfo', JSON.stringify(this.userInfo));
        this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
        this.userInfo.courses = JSON.parse(this.userInfo.courses)
    },
    setStateLogin : function(){
        if(this.login() == false){
            $('.login').text('Login');
        }
        else{
            this.loadData();
            $('.login').text('Logout');
            $('.login').addClass('logout').removeClass('login');
        }
    },
    run : function(){
        this.setStateLogin();
        this.handleEvent();
        this.parseParam(window.location.search);
    }
}

export {app, config}