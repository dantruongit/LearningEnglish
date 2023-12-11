import {app, config} from './general.js'

app.run();
let getElementCourse = function(obj){
    obj.star = ""
    for(let i = 0;i<parseInt(obj.currentStar);i++){
        obj.star += `<small class="fa fa-star text-primary"></small>`
    }
    return `<div class="col-lg-4 col-md-6">
            <div class="course-item bg-light">
                <div class="position-relative overflow-hidden">
                    <img class="img-fluid" src="${obj.image}?raw=true">
                    <div class="w-100 d-flex justify-content-center position-absolute bottom-0 start-0 mb-4">
                        <a href="/quiz.html?idCourse=${obj.id}" class="btn btn-primary px-3" style="border-radius: 30px;">Learn</a>
                    </div>
                </div>
                <div class="text-center p-4 pb-0">
                    <h3 class="mb-0">${obj.name}</h3>
                    <div class="mb-3">
                        ${obj.star}
                        <small>(${obj.countStar})</small>
                    </div>
                    <h5 class="mb-4 pb-4">English for kids</h5>
                </div>
            </div>
        </div>`
}

app.getData(`${config.apiData}courses`, function(data){
    data.forEach(item =>{
        item.image = `${config.urlImage}${item.image}`
        $('.courseList').append(getElementCourse(item))
    })
})
