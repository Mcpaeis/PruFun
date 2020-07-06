(function() {
    // get all data in form and return object
    function getFormData(form) {
      var elements = form.elements;
      //var honeypot;
  
      var fields = Object.keys(elements).filter(function(k) {
        // if (elements[k].name === "honeypot") {
        //   honeypot = elements[k].value;
        //   return false;
        // }
        return true;
      }).map(function(k) {
        if(elements[k].name !== undefined) {
          return elements[k].name;
        // special case for Edge's html collection
        }else if(elements[k].length > 0){
          return elements[k].item(0).name;
        }
      }).filter(function(item, pos, self) {
        return self.indexOf(item) == pos && item;
      });
  
      var formData = {};
      fields.forEach(function(name){
        var element = elements[name];
        
        // singular form elements just have one value
        formData[name] = element.value;
  
        // when our element has multiple items, get their values
        if (element.length) {
          var data = [];
          for (var i = 0; i < element.length; i++) {
            var item = element.item(i);
            if (item.checked || item.selected) {
              data.push(item.value);
            }
          }
          formData[name] = data.join(', ');
        }
      });
  
      // add form-specific values into the data
      formData.formDataNameOrder = JSON.stringify(fields);
      formData.formGoogleSheetName = form.dataset.sheet || "responses"; // default sheet name
      formData.formGoogleSendEmail
        = form.dataset.email || ""; // no email by default
  
      return {data: formData};
    }
    
    /// Email validator
    function validateEmail(email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }

    function handleFormSubmit(event) {  // handles form submit without any jquery
      event.preventDefault();           // we are submitting via xhr below

      // Validate the email address and send message

      txtEmailAddress = $("#txtEmailAddress").val();
      storedUsername = Cookies.get('username');

      if(!validateEmail(txtEmailAddress)){

          alert('Invalid Email Address');

      }else{
          request  = $.ajax({
              url: "/prufun/email.php",
              type: "post",
              data: { 'sendAgentEmail': 'yes', 'txtEmail': txtEmailAddress,  'txtUsername': storedUsername}
          });

          request.done(function(response, textStatus, jqXHR){

            /// make the ajax request to post to sheet and send email

            var form = event.target;
            var formData = getFormData(form);
            var data = formData.data;

            console.log(data);
            //alert(response)
        
            //disableAllButtons(form);
            var url = form.action;
            var xhr = new XMLHttpRequest();
            xhr.open('POST', url);
            // xhr.withCredentials = true;
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4 && xhr.status === 200) {
                  form.reset();
                  var formElements = form.querySelector(".form-elements")
                  if (formElements) {
                    formElements.style.display = "none"; // hide form
                  }
                  console.log("success");
                }
            };
            // url encode form data for sending as post data
            var encoded = Object.keys(data).map(function(k) {
                return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
            }).join('&');
            xhr.send(encoded);

              alert("Thank you! You'll be contacted shortly by an agent.");
              Cookies.set("wouldyourather", "yes");
              window.location.reload();
              $('#cover').css("display", "none");
            });

          request.fail(function(response, textStatus, jqXHR){
                console.log(response);
          });
          
      }
    }


    
    function loaded() {
      // bind to the submit event of our form
      var forms = document.querySelectorAll("form.gform");
      for (var i = 0; i < forms.length; i++) {
        forms[i].addEventListener("submit", handleFormSubmit, false);
      }
    };
    document.addEventListener("DOMContentLoaded", loaded, false);
  
    function disableAllButtons(form) {
      var buttons = form.querySelectorAll("button");
      for (var i = 0; i < buttons.length; i++) {
        buttons[i].disabled = true;
      }
    }
  })();