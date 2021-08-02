<?php

    // Update the path below to your autoload.php,
    // see https://getcomposer.org/doc/01-basic-usage.md
    require_once 'vendor/autoload.php';

    use Twilio\Rest\Client;

    // Find your Account Sid and Auth Token at twilio.com/console
    // DANGER! This is insecure. See http://twil.io/secure
    $sid    = "";
    $token  = "";
    $twilio = new Client($sid, $token);

    $phone = isset($_POST['txtPhoneNumber']) ? $_POST['txtPhoneNumber'] : null;
    $username = isset($_POST['txtUsername']) ? $_POST['txtUsername'] : 'Your Friend';

    $body = $username . " will like to play Truth or Dare! \n Click this link to join: \n" . "http://localhost:8080/truthordare/?join=" . $username;

    if(!empty($phone)){

        $message = $twilio->messages
                    ->create($phone, // to
                            ["body" => $body, "from" => "+12517219528"]
                    );

        //print($phone);
        print($message->sid);
    }

    
?>
