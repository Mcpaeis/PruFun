function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

var countdown = $("#countdown").countdown360({
    radius: 50,
    seconds: 7,
    label: ['sec', 'secs'],
    fontColor: '#FFFFFF',
    autostart: false,
    onComplete: function () {
        displayWouldyouRather();
        countdown.start();
    }
});

countdown.start();

$('#countdown').click(function() {
    countdown.extendTimer(2);
});

// listen to the button click events

$(".u-1").click(function(e){
    restart();
});

$(".u-2").click(function(e){
    restart();
});

// listen to the ignore reward event
$('.ignore').click(function(){
    window.location.reload();
    $('#cover').css("display", "none");
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
                alert("Thank you! You'll be contacted shortly by an agent.");
                Cookies.set("wouldyourather", "yes");
                window.location.reload();
                $('#cover').css("display", "none");
             });

            request.fail(function(response, textStatus, jqXHR){
                 console.log(response);
            });
            
        }

});

function restart(){

    var checkEpq = parseInt($('.epq').text());

    if(checkEpq==5){
        // Redirect for reward
        countdown.stop();
        $('#cover').css("display", "block");
        
    }

    countdown.stop();
    index = Math.floor(Math.random(3)*5);
    console.log(index);

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
    rawFile.open("GET", "wouldyourather.txt", false);
    rawFile.onreadystatechange = function () {
        if(rawFile.readyState === 4) {
            if(rawFile.status === 200 || rawFile.status == 0) {
                var allText = rawFile.responseText;
                // split by line break
                allTruths = allText.split('\n');
                console.log(allTruths.length);
                // display the truth that has not been seen before
                index = Math.floor(Math.random()*39);
                if( (index % 2 )==1 ){
                    index  +=1
                }
                var truth = allTruths[index];
                console.log(index);
                console.log(truth);
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
            label: "Global Speed Line",
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