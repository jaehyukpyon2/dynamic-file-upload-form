// sibling append : $("#element").after("html tag")
// carrige return line feed : &#10;&#13;

let currentLessonCount = 1;

let lessonCountHiddenElement = $("#lesson-count");

$("#lesson-plus-button").on("click", function(event) {
    alert("lesson-plus-button click");
    addLessonElement();
    addMinusButton();
    lessonCountHiddenElement.val(currentLessonCount);
})

const addLessonElement = () => {
    let afterThis = $("#lesson__item-" + currentLessonCount);
    currentLessonCount++;
    let newElement = "<div class='lesson__item lesson__item-" + currentLessonCount + "' id='lesson__item-" + currentLessonCount + "'>&#10;&#13;";
    newElement += "<input type='text' class='lesson-name lesson-name-" + currentLessonCount + "' name='lesson-name-" + currentLessonCount + "' id='lesson-name-" + currentLessonCount + "' placeholder='수업 제목을 입력해 주세요' />&#10;&#13;";
    newElement += "<input type='file' class='lesson-video lesson-video-" + currentLessonCount + "' name='lesson-video-" + currentLessonCount + "' id='lesson-video-" + currentLessonCount +"' />&#10;&#13;<br>";
    newElement += "</div>";
    afterThis.after(newElement);
}

const addMinusButton = () => {
    let afterThis = $("#lesson-video-" + currentLessonCount);
    let newElement = "<button type='button' class='delete-lesson delete-lesson-" + currentLessonCount + "' name='delete-lesson-" + currentLessonCount + "' id='delete-lesson-" + currentLessonCount + "'>수업 삭제하기</button>";
    afterThis.after(newElement);
}

$("#class-form").on("click", ".delete-lesson", function(event) {
    alert("delete-lesson click");
    let thisClassValue = $(this).attr("class");
    let lastDashIndexInt = parseInt(thisClassValue.lastIndexOf("-"));
    let thisLessonNumber = parseInt(thisClassValue.substring(lastDashIndexInt + 1, thisClassValue.length));    
    console.log(`delete-lesson-num: ${thisLessonNumber}`);    

    $("#lesson__item-" + thisLessonNumber).remove();
    if (thisLessonNumber == currentLessonCount) {
        currentLessonCount--;
        lessonCountHiddenElement.val(currentLessonCount);
    } else {
        decreaseNumberByOne(thisLessonNumber);
    }
});

const decreaseNumberByOne = (deleteTargetNum) => {
    console.log(`decreaseNumberByOne called - deleteTargetNum: ${deleteTargetNum}`);
    let totalIterationTimes = currentLessonCount - deleteTargetNum;
    console.log(`decreaseNumberByOne called - totalIterationTimes: ${totalIterationTimes}`);
    let startElementNum = deleteTargetNum + 1;

    for (let i = 0; i < totalIterationTimes; i++) {
        console.log(`for called - i: ${i}`);
        let divLessonItem = $("#lesson__item-" + startElementNum);
        let inputLessonNameItem = $("#lesson-name-" + startElementNum);
        let inputFileLessonVideoItem = $("#lesson-video-" + startElementNum);
        let buttonDeleteLessonItem = $("#delete-lesson-" + startElementNum);

        let newNum = startElementNum - 1;

        divLessonItem.removeClass("lesson__item-" + startElementNum);
        inputLessonNameItem.removeClass("lesson-name-" + startElementNum);
        inputFileLessonVideoItem.removeClass("lesson-video-" + startElementNum);
        buttonDeleteLessonItem.removeClass("delete-lesson-" + startElementNum);

        divLessonItem.addClass("lesson__item-" + newNum);
        inputLessonNameItem.addClass("lesson-name-" + newNum);
        inputFileLessonVideoItem.addClass("lesson-video-" + newNum);
        buttonDeleteLessonItem.addClass("delete-lesson-" + newNum);

        divLessonItem.attr("id", "lesson__item-" + newNum);
        inputLessonNameItem.attr("id", "lesson-name-" + newNum);
        inputFileLessonVideoItem.attr("id", "lesson-video-" + newNum);
        buttonDeleteLessonItem.attr("id", "delete-lesson-" + newNum);

        divLessonItem.attr("name", "lesson__item-" + newNum);
        inputLessonNameItem.attr("name", "lesson-name-" + newNum);
        inputFileLessonVideoItem.attr("name", "lesson-video-" + newNum);
        buttonDeleteLessonItem.attr("name", "delete-lesson-" + newNum);

        startElementNum++;

        if (i == (totalIterationTimes - 1)) {
            currentLessonCount = newNum;
            lessonCountHiddenElement.val(currentLessonCount);
        }
    }
}
