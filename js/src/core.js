var globalVarSugaroid = "NULL";
const BaseURL = "https://api-sugaroid.herokuapp.com";
const BaseBackendURL = `${BaseURL}/chatbot`


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
}


function scrollToBottom() {
    /* Scrolls to the bottom */
    $("#s-con").animate({ scrollTop: $('#s-con').prop("scrollHeight")}, 500);
}


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
}


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
}


pingServer();
