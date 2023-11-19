// sibling append : $("#element").after("html tag")
// carrige return line feed : &#10;&#13;

let currentLessonCount = 1;

let lessonCountHiddenElement = $("#class-total-lesson-count");

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
    newElement += "<span id='span-lesson-time-" + currentLessonCount + "' class='span-lesson-time span-lesson-time-" + currentLessonCount + "'></span>(초)";
    newElement += "<input type='hidden' id='lesson-time-" + currentLessonCount + "' class='lesson-time lesson-time-" + currentLessonCount + "' name='lesson-time-" + currentLessonCount + "' />" ;
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

    const forMinusTime = parseInt($("#span-lesson-time-" + thisLessonNumber).text());
    $("#lesson__item-" + thisLessonNumber).remove();

    // 총 강의 시간에서 minus하기
    const originalTotalClassTime = parseInt($("#span-class-total-time").text());
    //const forMinusTime = parseInt($("#span-lesson-time-" + thisLessonNumber).text());
    console.log(originalTotalClassTime, forMinusTime);
    const newUpdatedTime = originalTotalClassTime - forMinusTime;
    $("#span-class-total-time").text(newUpdatedTime);
    $("#class-total-time").attr("value", newUpdatedTime);

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
        let divLessonItem = $("#lesson__item-" + startElementNum); // 전체 wrapping하는 div태그
        let inputLessonNameItem = $("#lesson-name-" + startElementNum); // 서버에 전송될 lesson의 제목 태그
        let inputFileLessonVideoItem = $("#lesson-video-" + startElementNum); // 서버에 전송될 input:file 태그
        let buttonDeleteLessonItem = $("#delete-lesson-" + startElementNum); // 현 lesson 삭제 태그
        let spanLessonTime = $("#span-lesson-time-" + startElementNum); // 보여질(서버X) 수업의 길이 태그
        let inputLessonTime = $("#lesson-time-" + startElementNum); // 서버로 전송될 수업의 길이 태그

        let newNum = startElementNum - 1;

        divLessonItem.removeClass("lesson__item-" + startElementNum);
        inputLessonNameItem.removeClass("lesson-name-" + startElementNum);
        inputFileLessonVideoItem.removeClass("lesson-video-" + startElementNum);
        buttonDeleteLessonItem.removeClass("delete-lesson-" + startElementNum);
        spanLessonTime.removeClass("span-lesson-time-" + startElementNum);
        inputLessonTime.removeClass("lesson-time-" + startElementNum);

        divLessonItem.addClass("lesson__item-" + newNum);
        inputLessonNameItem.addClass("lesson-name-" + newNum);
        inputFileLessonVideoItem.addClass("lesson-video-" + newNum);
        buttonDeleteLessonItem.addClass("delete-lesson-" + newNum);
        spanLessonTime.addClass("span-lesson-time-" + newNum);
        inputLessonTime.addClass("lesson-time-" + newNum);

        divLessonItem.attr("id", "lesson__item-" + newNum);
        inputLessonNameItem.attr("id", "lesson-name-" + newNum);
        inputFileLessonVideoItem.attr("id", "lesson-video-" + newNum);
        buttonDeleteLessonItem.attr("id", "delete-lesson-" + newNum);
        spanLessonTime.attr("id", "span-lesson-time-" + newNum);
        inputLessonTime.attr("id", "lesson-time-" + newNum);

        divLessonItem.attr("name", "lesson__item-" + newNum);
        inputLessonNameItem.attr("name", "lesson-name-" + newNum);
        inputFileLessonVideoItem.attr("name", "lesson-video-" + newNum);
        buttonDeleteLessonItem.attr("name", "delete-lesson-" + newNum);
        spanLessonTime.attr("name", "span-lesson-time-" + newNum);
        inputLessonTime.attr("name", "lesson-time-" + newNum);

        startElementNum++;

        if (i == (totalIterationTimes - 1)) {
            currentLessonCount = newNum;
            lessonCountHiddenElement.val(currentLessonCount);
        }
    }
}

const showThumbnail = (event) => {
    alert("showThumbnail");
    const reader = new FileReader();
    reader.onload = (event) => {
        const imgTag = $("#class-image-thumbnail");
        imgTag.attr("src", event.target.result);
    }
    reader.readAsDataURL(event.target.files[0]);
}

$("#class-form").on("change", ".lesson-video", function(e) {
    alert("lesson-video-upload click");
    let thisClassValue = $(this).attr("class");
    let lastDashIndexInt = parseInt(thisClassValue.lastIndexOf("-"));
    let thisLessonNumber = parseInt(thisClassValue.substring(lastDashIndexInt + 1, thisClassValue.length));
    //console.log(`thisLessonNumber = ${thisLessonNumber}`);
    //console.dir(this);
    const file = this.files[0];
    loadVideoMetadata(file, thisLessonNumber);
})

const loadVideoMetadata = (file, targetLessonNumber) => {
    const video = document.createElement("video");
    video.preload = "metadata";
    video.onloadedmetadata = () => {
        console.log("onloadedmetadata first line");
        window.URL.revokeObjectURL(video.src);
        const videoDuration = video.duration;
        if (videoDuration < 1) {
            alert("수업 동영상의 길이는 1초 이상이어야 합니다.");
            return;
        } else {
            console.log(`video duration: ${videoDuration}`);
            const videoDurationInt = parseInt(videoDuration);

            // 보여지는 현재 lesson의 수업시간 값 변경
            $("#span-lesson-time-" + targetLessonNumber).text(videoDurationInt);
            // 서버에 전송될 현재 lesson의 수업시간 값 변경
            $("#lesson-time-" + targetLessonNumber).attr("value", videoDurationInt);


            // 보여지는 총 수업 시간에 더하기
            $("#span-class-total-time").text(
                parseInt($("#span-class-total-time").text()) + videoDurationInt
            );
            // 서버에 전송할 총 수업 시간에 더하기
            $("#class-total-time").attr("value", $("#span-class-total-time").text());
        }
    }
    video.src = window.URL.createObjectURL(file);
    console.log("loadVideoMetadata last line");
}
