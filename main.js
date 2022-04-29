prediction_1 = "";
prediction_2 = "";

Webcam.set({

    width : 400,
    height : 300,
    img_format : 'png',
    img_quality : 90
});

camera = document.getElementById("camera");

Webcam.attach("camera");

function take_snapshot()
{
    Webcam.snap(function(data_uri)
    {
        document.getElementById("result").innerHTML = '<img id = "captured_image"  src="'+data_uri+'">'
    });
}

console.log("ml5 version : ", ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/Rt1AGEXs-/model.json", modelLoaded)

function modelLoaded()
{
    console.log("Model Loaded!");
}

function speak()
{
    var synth = window.speechSynthesis;
    speak_text_1 = "The first prediction is"+ prediction_1;
    speak_text_2 = "And the second prediction is " + prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speak_text_1 + speak_text_2 );
    synth.speak(utterThis);
}

function check()
{
    img = document.getElementById("captured_image");
    classifier.classify(img, gotResult);
}


function gotResult (error, result)
{
    if(error)
    {
            console.error(error);
    }

    else
    {
        console.log(result);

        document.getElementById("result_emotion_name").innerHTML = result[0].label;
        document.getElementById("result_emotion_name2").innerHTML = result[1].label;

        prediction_1 = result[0].label;
        prediction_2 = result[1].label;
        speak();


        if(result[0].label == "Best")
        {
            document.getElementById("update_gesture").innerHTML = "&#128077";
        }   

        if(result[0].label == "Victory")
        {
            document.getElementById("update_gesture").innerHTML = "&#9996";
        }

        if(result[0].label == "Amazing")
        {
            document.getElementById("update_gesture").innerHTML = "&#128076";
        } 


        if(result[0].label == "Best")
        {
            document.getElementById("update_gesture2").innerHTML = "&#128077";
        }   

        if(result[0].label == "Victory")
        {
            document.getElementById("update_gesture2").innerHTML = "&#9996";
        }

        if(result[0].label == "Amazing")
        {
            document.getElementById("update_gesture2").innerHTML = "&#128076";
        } 
    }
}