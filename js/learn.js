import {app, config} from './general.js'
app.run()

if(!app.login()){
    window.location.href = "/login.html";
}

let idCourse = app.params.idCourse;
let idQuiz = parseInt(app.params.idQuiz);
$('.btnBack').on('click', function(){
    window.location.href = "/quiz.html?idCourse=" + idCourse;
})
let arr = []
let isSelect = false
let showAnswer = function(selector, idx, classNew){
    var intervalId = setInterval(function() {
        $(selector).eq(idx).toggleClass(classNew);
    }, 250);
    setTimeout(function() {
        clearInterval(intervalId);
        $(selector).eq(idx).addClass(classNew);
    }, 2000);
}
app.getData(config.apiData + `courses/${idCourse}`, function(course){
    let allQues = JSON.parse(course.questions);
    for(let quiz of allQues){
        if(quiz.id == idQuiz){
            $('.questionDesc').text(quiz.question);
            $('img.img-fluid').attr('src', config.urlImage + quiz.image);
            arr = Object.assign([], quiz.answers);
            for(let i = 0; i<quiz.answers.length ;i++){
                $('.word-options').append(`<div class="word-option" data-idx="${i}">${quiz.answers[i][1]}</div>`)
            }
        }
    }
    $('.word-option').on('click', function(){
        if(isSelect) return
        let word = $(this).text();
        $(this).addClass('selected');
        isSelect = true;
        let idxRight = 0
        for(let i = 0; i<arr.length ;i++){
            if(arr[i][0] == 1){
                idxRight = i;
            }
            let idx = parseInt($(this).data('idx'));
            if(arr[i][1] == word && arr[i][0] == idx){
                console.log("correct")
                console.log(app.userInfo.courses[idCourse].currentProgress, idQuiz)
                if(!app.userInfo.courses[idCourse].currentProgress.includes(idQuiz)){
                    app.userInfo.courses[idCourse].currentProgress.push(idQuiz);
                    app.saveData()
                    console.log("save data")
                }
            }
        }
        setTimeout(()=>{
            showAnswer('.word-option', idxRight, 'correct');
        }, 1500)
    })
})