var globalVarSugaroid = "NULL";
const BaseURL = "https://api-sugaroid.herokuapp.com";
const BaseBackendURL = `${BaseURL}/chatbot`
const emotionMapping = {
    70: "sugaroid_genie",
    0:  "sugaroid",
    50: "sugaroid_cry",
    11: "sugaroid_anger",
    53: "sugaroid_non_expressive",
    1:  "sugaroid_smile",
    4:  "sugaroid_wink_left",
    52: "sugaroid_non_expressive_left",
    13: "sugaroid_extreme_anger",
    5:  "sugaroid_cry",
    15: "sugaroid_dead",
    8:  "sugaroid_lol",
    10: "sugaroid_depressed",
    6:  "sugaroid_adorable",
    14: "sugaroid_github",
    12: "sugaroid_angel",
    2:  "sugaroid_rich",
    54: "sugaroid_seriously",
    2:  "sugaroid_wink_right",
    3:  "sugaroid_blush",
    55: "sugaroid_depressed",
    4:  "sugaroid_o",
    51: "sugaroid_wink_left",
    15: "sugaroid_dead",
    57: "sugaroid_sleep"
}


function pingServer() {
    console.log("Asking server to wake up. Please!");
    $.get(`${BaseURL}/wake`, function( data ) {
        if (data) {
            $('#sug-stat-icon').css('color', 'var(--online)');
            $('#sug-stat').text('Online')
        }
    })
}


function updateInterfaceSugaroidMessageCallback(data, status) {
    console.log(`Received data from server with Status: ${status}`);
    let sugaroidMessage = data['message'];
    appendChatReply(getFormattedSugaroidMessageHTML(sugaroidMessage));
    globalVarSugaroid = data['data'];
    scrollToBottom();
    console.log("Process completed");
    $('#sug-stat').text("Online");
    $('#sugaroidSendButton').removeClass("is-loading");
};


function clearUserInput() {
    /* Clears the user input field */
    $('#sug-msgbox-input').val('');
};


function scrollToBottom() {
    /* Scrolls to the bottom */
    $("#s-con").animate({ scrollTop: $('#s-con').prop("scrollHeight")}, 500);
};


function sendReplyToSugaroidBot() {
    /* Sends reply to the Sugaroid bot  */
    let response = $('#sug-msgbox-input').val();
    if ($.trim(response) == "") {
        // if string is empty, don't send it to server
        // for processing.
        return false;
    }
    $('#sugaroidSendButton').addClass("is-loading");
    $('#sug-stat').text("Thinking...");
    clearUserInput();
    appendChatReply(getFormattedUserMessageHTML(response));
    scrollToBottom();
    $.post(BaseBackendURL + "?usermsg=" + encodeURI(response), globalVarSugaroid, updateInterfaceSugaroidMessageCallback);
    console.log("Sent request.")
    return false;
};


function getFormattedUserMessageHTML(message) {
    return `<div class="sugaroid-msg sug-left">\
    <div class="sugaroid-message sugaroid-message-alice">\
    <p>${message}</p>\
    </div>\
    </div>`;
};

function getFormattedSugaroidMessageHTML(message) {
    return `<div class="sugaroid-msg sug-right">\
    <div class="sugaroid-message sugaroid-message-bob">\
    <p>${message}</p>\
    </div>\
    </div>`;
};

function appendChatReply(htmlMessage) {
    $('#s-con').append(htmlMessage);
    $('.sugaroid-msg:last-child').css('transform');
    $('.sugaroid-msg:last-child').css('transform', 'scale(1)');
};


pingServer();
