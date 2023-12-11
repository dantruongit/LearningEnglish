import {app, config} from './general.js'
app.run()

if(!app.login()){
    window.location.href = "/login.html";
}
let idCourse = app.params.idCourse;

if(app.userInfo.courses[idCourse] == undefined){
    app.userInfo.courses[idCourse] = {
        currentProgress : []
    }
    app.saveData()
}

let getQuizHtml = function(user, quiz){
    let done = ''
    if(quiz.id in user.courses[idCourse].currentProgress){
        done = `<i class="fa fa-check-circle" style="color : green"></i>`
    }
    return `<li class="list-group-item d-flex align-items-center justify-content-between">
                <span>${quiz.question} ${done}</span>
                <a href="/learn.html?idCourse=${idCourse}&idQuiz=${quiz.id}" style="font-size: 1.5rem;"><i class="fa fa-arrow-right"></i></a>
            </li>`
}
app.getData(config.apiData + `courses/${idCourse}`, function(course){
    let quizHtml = '';
    let allQues = JSON.parse(course.questions);
    console.log(allQues)
    allQues.forEach(quiz =>{
        quizHtml += getQuizHtml(app.userInfo, quiz);
    })
    $('.allquiz').html(quizHtml);
})