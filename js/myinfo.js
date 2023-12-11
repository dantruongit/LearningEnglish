import {app, config} from './general.js'

app.run()

if(!app.login()){
    window.location.href = "/";
}
const setProperty = (user) => {
    $('.nameUser').text(user.name);
    $('.username').text(user.username);
}
setProperty(app.userInfo);

let getProgress = (nameCourse, currentProgress, totalProgress) => {
    let progress = currentProgress/totalProgress * 100;
    return `<div>
                <small>${nameCourse}</small>
                <div class="progress mb-3" style="height: 5px">
                    <div class="progress-bar bg-primary" role="progressbar" style="width: ${progress}%"></div>
                </div>
            </div>`
}

app.getData(config.apiData + 'courses', (data) => {
    let html = '<h6 class="d-flex align-items-center mb-3">Thống kê cá nhân</h6>';
    data.forEach((item) => {
        item.questions = JSON.parse(item.questions)
        if(item.id in app.userInfo.courses){
            html += getProgress(item.name, app.userInfo.courses[item.id].currentProgress.length, item.questions.length);
        }
    })
    $('.subject').html(html);
})

