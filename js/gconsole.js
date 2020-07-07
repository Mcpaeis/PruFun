/// Count down timer
var countdown = $("#countdown").countdown360({
    radius: 50,
    seconds: 7,
    label: ['sec', 'secs'],
    fontColor: '#FFFFFF',
    autostart: false,
    onComplete: function () {

        audioElement.pause();
        audioElement2.pause();
        audioElement3.pause();
        displayWouldyouRather();
        countdown.start();
    }
});

var audioElement = document.createElement('audio');
audioElement.setAttribute('src', 'https://sixtusdakurah.com/prufun/audio/Harp 1.wav');

audioElement.addEventListener('ended', function() {
    this.play();
}, false);

var audioElement2 = document.createElement('audio');
audioElement2.setAttribute('src', 'https://sixtusdakurah.com/prufun/audio/Harp 3.wav');

audioElement2.addEventListener('ended', function() {
    this.play();
}, false);

var audioElement3 = document.createElement('audio');
audioElement3.setAttribute('src', 'https://sixtusdakurah.com/prufun/audio/Electrical_Sweep-Sweeper-1760111493.mp3');

audioElement3.addEventListener('ended', function() {
    this.play();
}, false);

/// Start timer in page load
countdown.start();

/// Extend time by 2 seconds on click
$('#countdown').click(function() {
    countdown.extendTimer(2);
});

/// listen to the button click events   
$(".u-1").click(function(e){
    audioElement2.pause();
    audioElement.play();
    restart();
});

$(".u-2").click(function(e){
    audioElement.pause();
    audioElement2.play();
    restart();
});

/// listen to the ignore reward event
$('.ignore').click(function(){
    window.location.reload();
    $('#cover').css("display", "none");
});

/// Set username hidden value

/// Check if agent reference is set and set values of hidden text
$( document ).ready(function() {

    $("#username").val(Cookies.get("username"));

    /// Pick the policy choice randomly
    var policyChoices = [ "Pruwealth",  "Prudent Life", "Farewell Plan", "Education Policy"];
    choiceIndex =  Math.floor(Math.random()*policyChoices.length);
    console.log("c index", choiceIndex);
    $("#policy").val(policyChoices[choiceIndex]);

    /// Pick the interest level randomly
    var interestLevel = ['Immediate Interest', 'Fairly Interested', 'Probably not interested'];
    interestIndex = Math.floor(Math.random()*interestLevel.length);
    $("#level").val(interestLevel[interestIndex]);

    var agentEmail = Cookies.get("agent_email");
    console.log("agent email", agentEmail);
    var agentType = Cookies.get("agent_type");
    console.log("agent type", agentType);
    // Handler for .ready() called.
    !agentEmail ? null : $("#agentEmail").val(agentEmail);
    !agentEmail ? null : $(".gform").attr('data-email', agentEmail);
    !agentType ? null : $("#category").val(agentType);
  
});



// /listen to the get reward event
// $('.send-email').click(function(){

//         txtEmailAddress = $("#txtEmailAddress").val();
//         storedUsername = Cookies.get('username');

//         if(!validateEmail(txtEmailAddress)){

//             alert('Invalid Email Address');

//         }else{
//             request  = $.ajax({
//                 url: "/prufun/email.php",
//                 type: "post",
//                 data: { 'sendAgentEmail': 'yes', 'txtEmail': txtEmailAddress,  'txtUsername': storedUsername}
//             });

//             request.done(function(response, textStatus, jqXHR){
//                 alert("Thank you! You'll be contacted shortly by an agent.");
//                 Cookies.set("wouldyourather", "yes");
//                 window.location.reload();
//                 $('#cover').css("display", "none");
//              });

//             request.fail(function(response, textStatus, jqXHR){
//                  console.log(response);
//             });
            
//         }

// });

function restart(){
    var checkEpq = parseInt($('.epq').text());

    if(checkEpq==2){ // change back to 5
        // Redirect for reward
        audioElement.pause();
        audioElement2.pause();
        audioElement3.play();
        
        countdown.stop();
        $('#cover').css("display", "block");
        
    }

    countdown.stop();
    index = Math.floor(Math.random(3)*5);
    //console.log(index);

    switch(index) {
        case 0:
          // code block
          $('.display-block').toggle( "clip" );
          break;
        case 1:
          // code block
          $('.display-block').toggle( "drop" );
          break;
        case 2:
            // code block
            $('.display-block').toggle( "fold" );
            break;
        case 3:
            // code block
            $('.display-block').toggle( "puff" );
            var epq = parseInt($('.epq').text()) + 1;
            $('.epq').html(epq);
            break;
        default:
            $('.display-block').toggle( "explode" );
    }
         
    
    $('.display-block').toggle( "explode" );
    $('#countdown').toggle( "explode" );
    $('.display-block').fadeIn();
    $('#countdown').fadeIn();
    displayWouldyouRather();
    countdown.start();
}

// Function to read text file
function displayWouldyouRather(){
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", "https://raw.githubusercontent.com/Mcpaeis/PruFun/master/wouldyourather.txt", false);
    rawFile.onreadystatechange = function () {
        if(rawFile.readyState === 4) {
            if(rawFile.status === 200 || rawFile.status == 0) {
                var allText = rawFile.responseText;
                // split by line break
                allTruths = allText.split('\r\n');
                //console.log(allTruths);
                // display the truth that has not been seen before
                index = Math.floor(Math.random()*allTruths.length);
                console.log(index);
                // if( (index % 2 )==1 ){
                //     index  +=1
                // }
                var truth = allTruths[index];
                //console.log(index);
                //console.log(truth);
                // split into ywo
                truth1  = truth.split('|')[0];
                truth2  = truth.split('|')[1];
                $(".u-1").html(truth1);
                $(".u-2").html(truth2);
            }
        }
    }
    rawFile.send(null);
}

// charts
let data = [12, 19, 3, 5, 2, 3, 12, 9, 3, 15];
            
var ctx = document.getElementById("myChart").getContext("2d");
var myChart = new Chart(ctx, {
    // type: "bar ",
    type: "line",
    data: {
        labels: [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
        datasets: [{
            label: "We're running Models! Looking for that awesome recommendation!",
            data: data,
            backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)"
            ],
            borderColor: [
                "rgba(255,99,132,1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)"
            ],
            borderWidth: 1,
            fill: "start",
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },
        elements: {
            line: {
                tension: 0,
                // no smooth
            }
        }
    }
});
// update
let flag = setInterval(() => {
    // get the first element in the data
    // remove the first one out
    let newData = data[0],
        oldData = data.slice(1);
    // add the first datapoint as new data   
    oldData.push(newData)
    // reconstruct the new data
    data = [].concat(oldData);
    myChart.data.datasets[0].data = data;
    myChart.update(0);
    // disable animation
}, 1000);