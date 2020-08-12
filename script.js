var timeBlockDescriptions = ["", "", "", "", "", "", "", "", ""];

// FUNCTIONS

function initArray() {

    var storedDescriptions = JSON.parse(localStorage.getItem("descriptions"));

    if (storedDescriptions !== null) {

        timeBlockDescriptions = storedDescriptions

        // Save descriptionArray in local storage
        storeDesc(timeBlockDescriptions);

    } else {

        storeDesc(timeBlockDescriptions);
    }

    // Render Descriptions inside textarea
    renderDescription();
}

function storeDesc(descriptionArray) {

    localStorage.setItem("descriptions", JSON.stringify(descriptionArray));
}

function renderDescription() {
    
    for(var i=0; i< timeBlockDescriptions.length; i++) {
        $("div[data-row='"+ i +"'] > textarea").val(timeBlockDescriptions[i])
    }

}

function colorCodeTimeblock() {

    var currentTime = moment().hour();
    var time = ["9", "10", "11", "12", "13", "14", "15", "16", "17"]

    console.log(currentTime)

    for(var i = 0; i < time.length; i++) {
        
        console.log(time[i])
        if (time[i] == currentTime) {
            $("div[data-row='"+ i +"']").attr("class", "row time-block present")
            console.log("entered")
            
        } else if (time[i] <= currentTime) {
            $("div[data-row='"+ i +"']").attr("class", "row time-block past")

        } else if (time[i] >= currentTime) {
            $("div[data-row='"+ i +"']").attr("class", "row time-block future")

        }
    }

}

// EVENT LISTENER

$(".saveBtn").on("click", function(){
    var row = $(this).attr("data-btnRow"); /* index */
    var textAreaContent = $("div[data-row='"+ row +"'] > textarea").val();
    timeBlockDescriptions[row] = textAreaContent;

    storeDesc(timeBlockDescriptions);

})

//

$("#currentDay").text(moment().format('dddd, MMMM Do'));

initArray();

colorCodeTimeblock();