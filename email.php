<?php

    if (isset($_POST['sendAgentEmail'])){
        /* All form fields are automatically passed to the PHP script through the array $HTTP_POST_VARS. */
        $email = isset($_POST['txtEmail']) ? $_POST['txtEmail'] : 'error';
        $username = isset($_POST['txtUsername']) ? $_POST['txtUsername'] : 'User';
        $agentMail = "maccarthymaxwell74@gmail.com";
        $subject = "PruFun";
        $headers = 'From: webmaster@example.com' . "\r\n" .  'Reply-To: webmaster@example.com';
        $message1 = "This player expressed interest in exploring life insurance options. \n Username: " . $username . " \n Email Address: " . $email;
        $message2 = "Dear " . $username . " \n\n Thank you for trying Prufun and ultimately winning some coupons. Be rest assured of your pending Prize and we hope you will like it.";
        $message2 .= "\n\n We are Prudential Life Insurance Ghana and I am here to serve you just right. \n Across Africa,  specifically in Ghana, we continue to support communities, encourage innovation and always honor our commitments.\nAs it stands, we would be happy to have you onboard as we take the ride to Insuring the best way.";
        $message2 .= "\n\n Thank you for taking the time to read this email.";
        $message2 .= "\n\n\n Cheers\n Maxwell Maccarthy\n PLIG Agency Force";

        /* Sends the mail and outputs the "Thank you" string if the mail is successfully sent, or the error string otherwise. */
        if (mail($agentMail, $subject, $message1, $headers)) {

            print("success agent");

        } else {

            print("failure agent");
        }

        if (mail($email, $subject, $message2, $headers)) {

            print("success");

        } else {

            print("failure");
        }
    }
    
    if(isset($_POST['sendInvitationEmail'])){

        /* All form fields are automatically passed to the PHP script through the array $HTTP_POST_VARS. */
        $email = isset($_POST['txtEmail']) ? $_POST['txtEmail'] : 'error';
        $username = isset($_POST['txtUsername']) ? $_POST['txtUsername'] : 'User';
        // partner email
        $to = $email;
        $subject = "PruFun";
        $headers = 'From: webmaster@example.com' . "\r\n" .  'Reply-To: webmaster@example.com';
        $message = "Hey! " . $username . " is inviting you to PruFun! \n\n";
        $message .= "\n Click on this link to join the game: https://www.sixtusdakurah.com/prufun/welcome.html?join=". $username . "\n\n Happy GAMING!";

        /* Sends the mail and outputs the "Thank you" string if the mail is successfully sent, or the error string otherwise. */
        if (mail($to, $subject, $message, $headers)) {

            print("success");

        } else {

            print("failure");
        }

    }
?>