/// Check if the user is already logged in:
var storedUsername = Cookies.get('username');
console.log("store username "+storedUsername);
var inviteeUsername = Cookies.get('inviteeUsername');
console.log("invitee username "+inviteeUsername);

storedUsername ? null : window.location.replace("prufun/welcome.html"); 

// Set the play count, update EPQ and request user email
var playCount = 0;

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};

//inviteeUsername = getUrlParameter("join");
//console.log(inviteeUsername);
//invitedPhone = $.urlParam("uid");
var isInvitee = false;

if(inviteeUsername){
    isInvitee = true;
    //Cookies.set("originatorUsername", inviteeUsername, { expires: 0.12});

    var channelNameT = inviteeUsername + "newTruth";
    console.log('You have been invited by: '+ channelNameT);
    var channelNameD = inviteeUsername + "newDare";
}
else if (!storedUsername){
    window.location.replace("/prufun/welcome.html?join=" + inviteeUsername);
    // variable is not set
    // var txtUserName;
    // var txtPhoneNumber
    // $('.welcome').effect( "slide", 3000,  welcomeCallback);

    // /// Listen to the button next click event
    // $(".btn-next").click(function(e){
    //     e.preventDefault();

    //     txtUserName = $("#txtUsername").val();

    //     //var txtPhoneNumber = $("#txtPhone").val();
    //     //console.log(txtUserName); console.log(txtPhoneNumber);

    //     if ( txtUserName.length < 3){
    //         $.toast({
    //             text: 'Username must be at least 3 characters',
    //             allowToastClose: false,
    //             textAlign: 'center',
    //             textColor: 'red'
    //         })
    //     }else{
    //         // append welcome
    //         $(".form-group-3").append("Welcome, "+ txtUserName +"!");
    //         $(".form-group-3").css("display", "block");
    //         $(".form-group-1").css("display", "none");
    //         $(".form-group-2").css("display", "block");

    //     }
    // });

    // $(".btn-submit").click(function(e){
    //     e.preventDefault();

    //     txtPhoneNumber = $("#txtPhone").val();

    //     if(txtPhoneNumber.length !=10 ){
    //         $.toast({
    //             text: 'Incorrect phone number',
    //             allowToastClose: false,
    //             textAlign: 'center',
    //             textColor: 'red'
    //         })
    //     }else{
    //         txtPhoneNumberl = '+1'+txtPhoneNumber;
    //         console.log(txtPhoneNumber);
    //         /// Send the text message
    //         request  = $.ajax({
    //             url: "/truthordare/messages.php",
    //             type: "post",
    //             data: {'txtPhoneNumber': txtPhoneNumberl,  'txtUsername': txtUserName}
    //         });

    //         request.done(function(response, textStatus, jqXHR){
    //             console.log(response);
    //         });

    //         request.fail(function(response, textStatus, jqXHR){
    //             console.log(response);
    //         });

    //         Cookies.set('username', txtUserName, { expires: 365 });
    //         console.log(txtUserName);
    //         Cookies.set('phonenumber', txtPhoneNumber, { expires: 365 });
    //         console.log(txtPhoneNumber);
    //         $(".login-form").css("display", "none");
    //         $("header").css("display", "none");
    //         $(".display-overview").css("display", "block");
    //         $(".btn-overview").css("display", "block");
    //         //$(".tble").css("display", "");

    //         var channelNameT = Cookies.get("username") + "newTruth";
    //         console.log(channelNameT);
    //         var channelNameD = Cookies.get("username") + "newDare";
    //     }


    // });


}else{
    console.log(storedUsername);
    $(".login-form").css("display", "none");
    $("header").css("display", "none");
    $(".display-overview").css("display", "block");
    $(".btn-overview").css("display", "block");
    //$(".tble").css("display", "");

    var channelNameT = storedUsername + "newTruth";
    console.log( 'Originator name: '+ channelNameT);
    var channelNameD = storedUsername + "newDare";
}


// Establish connection to Ably
var ably = new Ably.Realtime('WAxr4g.LV6bMQ:r-QxbY8rhBZ6e66q');
ably.connection.on('connected', function() {

    console.log("That was simple, you're now connected to Ably in realtime");

});

var channel = ably.channels.get('truthordare');

// Utility functions

function checkCount(playCount){
    if(playCount==15){
        $('#cover').css("display", "block");
    }else if(playCount <=15){
        $('.epq').html(Math.floor(playCount/3) + 1);
    }
}

function publishTruth(message){
    isInvitee = true;
    var channel = ably.channels.get('truthordare');
    // Send a message to a channel
    channel.publish(channelNameT, message);
    playCount +=1;
    checkCount(playCount);
}

function publishDare(message){
    isInvitee = true;
    var channel = ably.channels.get('truthordare');
    // Send a message to a channel
    console.log(channelNameD);
    channel.publish(channelNameD, message);
    playCount +=1;
    checkCount(playCount);
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
//publishMessage("hello");

// Function to read text file
function displayTruth(file){
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function () {
        if(rawFile.readyState === 4) {
            if(rawFile.status === 200 || rawFile.status == 0) {
                var allText = rawFile.responseText;
                //console.log(allText);
                // split by line break
                allTruths = allText.split('\n');
                //console.log(allTruths);
                // display the truth that has not been seen before
                index = getRandomInt(60);
                // console.log(index);
                if( (index % 2 )== 1 ){
                     index +=1
                }
                //console.log(index)

                var truth = allTruths[index];
                //console.log(truth);
                publishTruth(truth);
            }
        }
    }
    rawFile.send(null);
}

// Function to read text file
function displayDare(file){
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function () {
        if(rawFile.readyState === 4) {
            if(rawFile.status === 200 || rawFile.status == 0) {
                var allText = rawFile.responseText;
                // split by line break
                allDares = allText.split('\n');
                // display the truth that has not been seen before
                index = getRandomInt(30);
                if( (index % 2 )== 1 ){
                    index +=1
               }
                //console.log(index)
                var dare = allDares[index];
                //console.log(allText);
                publishDare(dare);
            }
        }
    }
    rawFile.send(null);
}

// Subscribe to a new channel
channel.subscribe(channelNameT, function(message){
    if(isInvitee){
        $(".chats").append("<span class='u2 chat'>" + message.data + "<span />");
        isInvitee = false;
    }else{
        $(".chats").append("<span class='u1 chat'>" + message.data + "<span />");
    }
    console.log(isInvitee);
});

$(".btnn-response").click(function(){

    resp = $(".response-txt").val();
    
    if(resp){
        publishTruth(resp);
        $(".response-txt").val('');
    }

});

$(document).on('keypress',function(e) {
    if(e.which == 13) {
        resp = $(".response-txt").val();
    
        if(resp){
            publishTruth(resp);
            $(".response-txt").val('');
        }
    }
    e.stopPropagation();
});

channel.subscribe(channelNameD, function(message){
    if(isInvitee){
        $(".chats").append("<span class='u2 chat1'>" + message.data + "<span />");
    }else{
        $(".chats").append("<span class='u1 chat1'>" + message.data + "<span />");
    }
    console.log(isInvitee);
});

// read data files
$(".truth").click(function(){
    displayTruth("truthdata1.txt");             
});

// read data files
$(".dare").click(function(){
    displayDare("daredata1.txt");             
});

// listen to the get reward event
$('.send-email').click(function(){

    txtEmailAddress = $("#txtEmailAddress").val();
    storedUsername = Cookies.get('username');

    if(!validateEmail(txtEmailAddress)){
        alert('Invalid Email Address');
        // $.toast({
        //     text: 'Invalid Email Address',
        //     allowToastClose: false,
        //     textAlign: 'center',
        //     textColor: 'red'
        // })
    }else{
        request  = $.ajax({
            url: "/prufun/email.php",
            type: "post",
            data: { 'sendAgentEmail': 'yes', 'txtEmail': txtEmailAddress,  'txtUsername': storedUsername}
        });

        request.done(function(response, textStatus, jqXHR){
            //window.location.reload();
            Cookies.set("truthordarereward", "yes");
            alert("Thank you! You'll be contacted shortly by an agent.");
            $('#cover').css("display", "none");
         });

        request.fail(function(response, textStatus, jqXHR){
             console.log(response);
        });
        
    }

});

// listen to the ignore reward event
$('.ignore').click(function(){
    $('#cover').css("display", "none");
});

// listen to the end game click event
$(".end-game").click(function(e){
    e.preventDefault();
    // Clear the invitee username
    Cookies.set("inviteeUsername", "");
    window.location.replace("/prufun/home.html");
});