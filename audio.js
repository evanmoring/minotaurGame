var AudioContext
var audioContext
var audioElement
var track
var gainNode 
var volumeControl 
var playButton
var oscillator
var audioCtx

var tempo = 65; // BPM (beats per minute)
var quarterNoteTime = 60 / tempo;
audioCtx = new AudioContext({
sampleRate: 22050,
});
var startTime = audioCtx.currentTime;
var frequency = 100;

var biquadFilter = audioCtx.createBiquadFilter();
biquadFilter.type = "lowpass";
biquadFilter.frequency.setValueAtTime(400, audioCtx.currentTime);
biquadFilter.gain.setValueAtTime(.05, audioCtx.currentTime);

var lowShelf = audioCtx.createBiquadFilter();
lowShelf.type = "lowshelf";
lowShelf.frequency.setValueAtTime(40, audioCtx.currentTime);

var mSeven = 8/9
var mSix = 64/81
var Five = 3/4
var mThree = mSix * Five
var mThree = 16/27
var Four = 2/3
var beats = 24

masterGain = audioCtx.createGain();
masterGain.gain.value = .25;
masterGain.connect(audioCtx.destination)


var shape = 'sine'

function fixedCurve(gainNode,curveList,startTime,length,number){
    try {
            gainNode.gain.setValueCurveAtTime(curveList, startTime, length);
        /*console.log(curveList)
        if(number){
            console.log(number)
        }*/
            
        }
        catch(err) {
            
            //console.log(gainNode)
            //console.log('err fixed! You are welcome')
            if(number){
                fixedCurve(gainNode,curveList, startTime+.01, length-.01,number+1);
            }
            else{
                fixedCurve(gainNode,curveList, startTime+.01, length-.01,1);
            }
            
        }

}

class sound {
  constructor(source,defaultGain) {
    this.source = source;
    this.defaultGain= defaultGain;
    this.preGain = audioCtx.createGain();
    this.postGain = audioCtx.createGain();
    this.postGain.gain.value = 0;
    this.filterOne
    this.filterTwo
    this.onOrOff = false;
    }
    
    off(){
        if (this.onOrOff){
            try {
                this.onOrOff=false;
                fixedCurve(this.postGain,[this.postGain.gain.value,0], audioCtx.currentTime, quarterNoteTime*8)
                //this.postGain.gain.setValueCurveAtTime([this.postGain.gain.value,0], audioCtx.currentTime, quarterNoteTime*8);

            }
            catch(err) {
                console.log('err')
                this.onOrOff=false;
                this.postGain.gain.setValueCurveAtTime([this.postGain.gain.value,0], audioCtx.currentTime+quarterNoteTime*8, quarterNoteTime*8);
                this.off()
            }
        }
        else{
            console.log('alreadyOff')
        }

    }
    on(){
        if(!(this.onOrOff)){
             try {
                 this.onOrOff = true;
                 fixedCurve(this.postGain,[0,this.defaultGain], audioCtx.currentTime, quarterNoteTime*8)
                //this.postGain.gain.setValueCurveAtTime([0,this.defaultGain], audioCtx.currentTime, quarterNoteTime*8);

            }
            catch(err) {
                console.log('err')
                this.onOrOff = true;
                //console.log(err)
                this.postGain.gain.setValueCurveAtTime([0,this.defaultGain], audioCtx.currentTime+quarterNoteTime*8, quarterNoteTime*8);
            }
        }
        else{
            console.log('alreadyOn')
        }
        
    }

    
    buildChain(chainList){
    for(let i = 0;i<chainList.length-1;i++){
        chainList[i].connect(chainList[i+1])
    }
    }
}

function droneShape(shape){
    for(let i = 0;i<oscillatorList.length;i++){
        oscillatorList[i].source.setValueAtTime(quarterNoteTime) = shape;
    }
}

function mainSound(){
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    playSound()
    setInterval(playSound,((60/tempo)*1000*beats+20),frequency);

}

function newOscillator(){
    let tempDict = {}
    let oscillator = new sound(audioCtx.createOscillator(),.25);
    oscillator.source.type = 'sine'; oscillator.buildChain([oscillator.source,oscillator.preGain,biquadFilter,lowShelf,oscillator.postGain,masterGain])
    oscillator.preGain.gain.value=0
    oscillator.source.start()
    oscillator.on()
    //oscillatorList.push(oscillator)
    tempDict.sine=oscillator;
    
    oscillator = new sound(audioCtx.createOscillator(),.25);
    oscillator.source.type = 'square'; oscillator.buildChain([oscillator.source,oscillator.preGain,biquadFilter,lowShelf,oscillator.postGain,masterGain])
    oscillator.preGain.gain.value=0
    oscillator.source.start()
    oscillator.on()
    tempDict.triangle=oscillator;
    oscillatorList.push(tempDict)
}
var oscillatorList=[]

newOscillator()
newOscillator()




function playSound(cFrequency){

    startTime = audioCtx.currentTime;
    //droneShape(shape);
    
    for(let i=0;i<beats*2;i+=4){
        fixedCurve(percussion.preGain,[1,0,1,0,1,0,1,1,1,0,1,0,1,0,0,0,],startTime+quarterNoteTime+(quarterNoteTime*i/2),quarterNoteTime*2)
        //percussion.preGain.gain.setValueCurveAtTime([1,0,1,0,1,0,1,1,1,0,1,0,1,0,0,0,], startTime+quarterNoteTime+(quarterNoteTime*i/2), quarterNoteTime*2-.05);
        //masterGainNode.gain.value()
    }
    for(let i=0;i<(beats/2);i++){
        tempFreq = frequency *8;
        let freqList = [tempFreq,tempFreq*mSeven,tempFreq*Five,tempFreq*mSix];
        function getRandomNote(){
            let random = Math.floor(Math.random() * freqList.length);
            let random2 = Math.floor(Math.random() * freqList.length);
            while(random2==random){
                random2 = Math.floor(Math.random() * freqList.length);
            }
            return [freqList[random],freqList[random2]];
        }
        fixedCurve(bell.preGain,[0,.125,0,.125,0], startTime+quarterNoteTime+(quarterNoteTime*2*i)+0*quarterNoteTime, (quarterNoteTime*1.25))
        //bell.preGain.gain.setValueCurveAtTime([0,.125,0,.125,0], startTime+quarterNoteTime+(quarterNoteTime*2*i)+0*quarterNoteTime, (quarterNoteTime*1.25));
        tempFreq
        randomList = getRandomNote()
        bell.source.frequency.setValueAtTime(randomList[0], startTime+((quarterNoteTime*2*i)+(7/4)*(quarterNoteTime)));
        //masterGainNode.gain.value()
        bell.source.frequency.setValueAtTime(randomList[1], startTime+((quarterNoteTime*2*i)+1.25*(quarterNoteTime)));
    }
    
    
    waves.filter.frequency.setValueAtTime(frequency, audioCtx.currentTime);
    fixedCurve(waves.preGain,[0,2,0], startTime+quarterNoteTime, quarterNoteTime*4)
    fixedCurve(waves.preGain,[0,2,0], startTime+quarterNoteTime*9, quarterNoteTime*4)
    fixedCurve(waves.preGain,[0,2,0], startTime+quarterNoteTime*17+.1, quarterNoteTime*8)
    /*waves.preGain.gain.setValueCurveAtTime([0,2,0], startTime+quarterNoteTime, quarterNoteTime*4-.1);
    waves.preGain.gain.setValueCurveAtTime([0,2,0], startTime+quarterNoteTime*9, quarterNoteTime*4-.1);
    waves.preGain.gain.setValueCurveAtTime([0,2,0], startTime+quarterNoteTime*17+.1, quarterNoteTime*8-.2);*/
    
    
    
    
    playNote(0, 1, quarterNoteTime*2,shape)
    playNote(quarterNoteTime*2, mSeven, quarterNoteTime*2,shape)
    playNote(quarterNoteTime*4, mSix, quarterNoteTime*2,shape)
    playNote(quarterNoteTime*6, Five, quarterNoteTime*2,shape)
    playNote(quarterNoteTime*8, mSeven, quarterNoteTime*2,shape)
    playNote(quarterNoteTime*10, mSix, quarterNoteTime*2,shape)
    playNote(quarterNoteTime*12, Five, quarterNoteTime*2,shape)
    playNote(quarterNoteTime*14, mThree, quarterNoteTime*2,shape)
    playNote(quarterNoteTime*16, Four, quarterNoteTime*8,shape)
    frequency = frequency*2/3
    if (frequency<100){
        frequency = frequency*2
    }
    
}    
var musicDict ={
    drone:true,
    percussion: false,
    bell: false,
    waves: false
}

function playNote(start, ratio, length, shape){
    let lengthFloor = Math.floor(length*8)
    let waveArray = new Float32Array(lengthFloor)
    for(let i=0;i<length*8;i++){
        if ((i == 0) || i == ((lengthFloor)-1)){
            waveArray[i]=0;
        }
        else if ((i == 1) || i == ((lengthFloor)-2)){
            waveArray[i]=.25;
        }
        else if ((i == 2)|| i == ((lengthFloor)-3)){
            waveArray[i]=.625;
        }
        else if ((i == 3)|| i == ((lengthFloor)-4)){
            waveArray[i]=.75;
        }
        /*else if (i>7){
            waveArray[i]=1-((i-7)*(1/((length*8)-7)));
        }*/
        else{
            waveArray[i]=1
        }
    }
  
    
    for (let oscillator = 0;oscillator<oscillatorList.length;oscillator++){

        let cO
        if(shape=='sine'){
            cO = oscillatorList[oscillator].sine;

        }
        if(shape=='triangle'){
            cO = oscillatorList[oscillator].triangle;
            
        }
    cO.source.frequency.setValueAtTime(frequency*ratio*(oscillator+1)*3/2, startTime+start+quarterNoteTime);
    fixedCurve(cO.preGain,waveArray, startTime+start+quarterNoteTime, length)
    //cO.preGain.gain.setValueCurveAtTime(waveArray, startTime+start+quarterNoteTime, length-.01);    
        
    }

    
}

function initPinkNoise (){
    var bufferSize = 4096;
     var pinkNoise= (function() {
        var b0, b1, b2, b3, b4, b5, b6;
        b0 = b1 = b2 = b3 = b4 = b5 = b6 = 0.0;
        var node = audioCtx.createScriptProcessor(bufferSize, 1, 1);
        node.onaudioprocess = function(e) {
            var output = e.outputBuffer.getChannelData(0);
            for (var i = 0; i < bufferSize; i++) {
                var white = Math.random() * 2 - 1;
                b0 = 0.99886 * b0 + white * 0.0555179;
                b1 = 0.99332 * b1 + white * 0.0750759;
                b2 = 0.96900 * b2 + white * 0.1538520;
                b3 = 0.86650 * b3 + white * 0.3104856;
                b4 = 0.55000 * b4 + white * 0.5329522;
                b5 = -0.7616 * b5 - white * 0.0168980;
                output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
                output[i] *= 0.11; // (roughly) compensate for gain
                b6 = white * 0.115926;
            }
        }
        return node;
    })();
    return pinkNoise
}

waves = new sound(initPinkNoise(),6)
waves.filter = audioCtx.createBiquadFilter();
waves.filter.type = "bandpass";
waves.filter.frequency.setValueAtTime(frequency*4, audioCtx.currentTime);
waves.filter.Q.value =3
waves.preGain.gain.value = 0;
//waves.postGain.gain.value = 6;
waves.buildChain([waves.source,waves.preGain,waves.filter,waves.postGain,masterGain])


bell = new sound(audioCtx.createOscillator(),1)
bell.source.type = 'sine';
bell.buildChain([bell.source,bell.preGain,bell.postGain,masterGain])
bell.preGain.gain.value =0;
//bell.postGain.gain.value =1;
bell.source.start()

percussion = new sound(initPinkNoise(),.25)
percussion.preGain.gain.value=0;
//percussion.postGain.gain.value=.25;
percussion.buildChain([percussion.source,percussion.preGain,percussion.postGain,masterGain])




