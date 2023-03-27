function setup(){
    canvas=createCanvas(300, 300);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    classifier= ml5.imageClassifier('MobileNet', modelloaded);
}
function modelloaded(){
    console.log('modelo carregado');
}
function draw(){
    image(video, 0, 0, 300, 300);
    classifier.classify(video, gotResult);
}
previousResult='';
function gotResult(error, results){
  if(error){
    console.error(error);
  }else{
    if((results[0].confidence > 0.5) && (previousResult != results[0].label)){
        console.log(results);
        previousResult= results[0].label;
        synth = window.speechSynthesis;
        speakData= 'o objeto detectado é - '+results[0].label;
        utterThis= new SpeechSynthesisUtterance(speakData);
        synth.speak(utterThis);
        document.getElementById("resultObjectName").innerHTML = results[0].label;
        document.getElementById("resultObjectAccuracy").innerHTML = results[0].confidence.toFixed(3);
    }
  }
}
