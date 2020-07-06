/// Check if the user is already logged in:
var storedUsername = Cookies.get('username');
// https://sixtusdakurah.com/truthordare/welcome.html
!storedUsername ? window.location.replace("/prufun/index.html") : $('.username').append('Welcome, '+storedUsername);

function welcomeCallback() {
    setTimeout(function() {
        $( ".form-group-1").css("display", "block")
    }, 1500 );
};

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

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

$('.txtFriendEmail').click(function(){
    var friendEmail = $('#txtFriendEmail').val();
    if(!validateEmail(friendEmail)){
        alert("Invalid Email");
    }else{
        // Send email and write to database
        request  = $.ajax({
            url: "/prufun/email.php",
            type: "post",
            data: { 'sendInvitationEmail': 'yes', 'txtEmail': friendEmail,  'txtUsername': storedUsername}
        });

        request.done(function(response, textStatus, jqXHR){
            //window.location.reload();
            alert("Thank you! You'll now be redirected to the console. Your friend will be notified to join you!");
            window.location.replace("/prufun/pconsole.html");
         });

        request.fail(function(response, textStatus, jqXHR){
             console.log(response);
        });

    }
})

// check for rewards

var truthReward = Cookies.get("truthordarereward");
var wouldUReward = Cookies.get("wouldyourather");
console.log(truthReward);

truthReward ? $(".todreward").css("display", "block") : null;
wouldUReward ? $(".wureward").css("display", "block") : null;

$(".logout").click(function(e){
    e.preventDefault();
    //remove the cookies
    Cookies.set("username", '');
    Cookies.set("inviteeUsername", '');
    // https://sixtusdakurah.com/truthordare/welcome.html
    window.location.replace("/prufun/index.html");
});