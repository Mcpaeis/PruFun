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

var agent_id = getUrlParameter('reference');

console.log(agent_id);

if(agent_id){
    Cookies.set('agent_id', agent_id);
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", "https://raw.githubusercontent.com/Mcpaeis/PruFun/master/agents.txt", false);
    rawFile.onreadystatechange = function () {
        if(rawFile.readyState === 4) {
            if(rawFile.status === 200 || rawFile.status == 0) {
                var allText = rawFile.responseText;
                // split by line break
                allTruths = allText.split('\n\n');
                console.log(allTruths);
                console.log('length: '+allTruths.length);
                // display the truth that has not been seen before
                // index = Math.floor(Math.random()*allTruths.length);
                // console.log('index: '+index);

                var index_ = Cookies.get("agent_id");
                if(index_){
                    // agent index is set
                    var index = index_>0 ? index_ -1 : index_;
                    var truth = allTruths[index];
                    console.log(index);
                    //console.log(truth);
                    // split into ywo
                    truth1  = truth.split('|')[0];
                    console.log("truth1: "+truth1);
                    truth2  = truth.split('|')[1];
                    
                    truth3  = truth.split('|')[2];
                    console.log("truth3", truth3);
                    /// Check to ensure that the agents match
                    if( Number(truth1)==Number(index_)){
                        console.log("truth1: "+truth1);
                        // Now check to ensure that the email is set
                        if(truth2){
                            // agent email is set
                            //$("#agentEmail").val(truth2);
                            Cookies.set("agent_email", truth2);
                            console.log("truth2", Cookies.get("agent_email"));
                            //$("#category").val(truth3);
                            Cookies.set("agent_type", truth3);
                            console.log("truth3", Cookies.get("agent_type"));

                        }
                    }else{

                    }
                    
                    console.log("agent index: "+index_);
                }
                
            }
        }
    }
    rawFile.send(null);
    //$("agentEmail")
}

/// m for master, a for agent from from pru, p for promoter


$('.button-1').click(function(){
    window.location.replace("/prufun/welcome.html");
});

$('a').attr('href',"https://api.whatsapp.com/send?phone=2335450527");