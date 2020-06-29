/// Check if the user is already logged in:
var storedUsername = Cookies.get('username');

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
      this.sound.play();
    }
    this.stop = function(){
      this.sound.pause();
    }
  }

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

var inviteeUsername = getUrlParameter("join");
console.log(inviteeUsername);
//invitedPhone = $.urlParam("uid");
var isInvitee = false;

if (!storedUsername){
    // variable is not set
    var txtUserName;
    var txtEmailAddress
    $('.welcome').effect( "slide", 3000,  welcomeCallback);

    /// Listen to the button next click event
    $(".btn-next").click(function(e){
        e.preventDefault();

        txtUserName = $("#txtUsername").val();

        //var txtPhoneNumber = $("#txtPhone").val();
        //console.log(txtUserName); console.log(txtPhoneNumber);

        if ( txtUserName.length < 3){
            $.toast({
                text: 'Username must be at least 3 characters',
                allowToastClose: false,
                textAlign: 'center',
                textColor: 'red'
            })
        }else{
            // append welcome
            //$(".welcome").html("Welcome, <span class=\"username\">"+ txtUserName +"!</span>");
            // $(".form-group-3").css("display", "block");
            // $(".form-group-1").css("display", "none");
            // $(".form-group-2").css("display", "block");
            Cookies.set('username', txtUserName, { expires: 365 });
            // Write to database

            // "https://sixtusdakurah.com/truthordare/home.html"
            if(inviteeUsername){
                // user was invited
                Cookies.set('inviteeUsername', inviteeUsername, { expires: 0.12 });
                // redirect to pconsole
                window.location.replace("/prufun/pconsole.html");
            }else{
                //alert((inviteeUsername));
                // user is just signing up or sigining in
                window.location.replace("/prufun/home.html");   
            }
        }
    });

    $(".btn-submit").click(function(e){
        e.preventDefault();

        txtEmailAddress = $("#txtEmailAddress").val();
        console.log(txtEmailAddress);

        if(!validateEmail(txtEmailAddress)){
            $.toast({
                text: 'Invalid Email Address',
                allowToastClose: false,
                textAlign: 'center',
                textColor: 'red'
            })
        }else{

            Cookies.set('username', txtUserName, { expires: 365 });
            console.log(txtUserName);
            Cookies.set('emailaddress', txtEmailAddress, { expires: 365 });
            // "https://sixtusdakurah.com/truthordare/home.html"
            window.location.replace("/prufun/home.html");
        }


    });


}else if(storedUsername && inviteeUsername){
    // user name is store
    Cookies.set('inviteeUsername', inviteeUsername, { expires: 0.12 });
    Cookies.set('username', txtUserName, { expires: 365 });
    window.location.replace("/prufun/pconsole.html");
}
else{
    // "https://sixtusdakurah.com/truthordare/home.html")
    window.location.replace("/prufun/home.html");
}
