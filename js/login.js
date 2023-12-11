import {app, config} from './general.js'

app.run();

if(app.login()){
    window.location.href = "/"
}
$('form').on('submit',function(event){
    let usr = $('#username').val();
    let pwd = $('#password').val();
    app.getData(config.apiData + 'users', function(data){
        data.forEach(user =>{
            console.log(user)
            if(user.username == usr && user.password == pwd){
                localStorage.setItem('user',user.username)
                localStorage.setItem('userInfo',JSON.stringify(user))
                window.location.href = "/"
            }
        })
    })
    return false;
})