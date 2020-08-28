class asciiAnimation {
  constructor(folder,frameQuantity) {
    this.folder = folder;
    this.frameQuantity = frameQuantity;
    this.textList =new Array(frameQuantity)
    this.animationCheck = true;
    this.test = ''
    this.currentFrame = 0;
      this.animationDelay = 200;
      this.load()
  }
    load(){
        var _this = this;
        for(let i=0;i<this.frameQuantity;i++){
        let stringCounter = i.toString();
        while (3 > stringCounter.length){
            stringCounter = '0'+stringCounter
        }
        let textFile = stringCounter+'.txt';
        var xhr=new XMLHttpRequest;
            console.log(i)
            xhr.frameNumber = i 
        xhr.open('GET',this.folder+textFile);
        xhr.onload = function(){_this.textList[this.frameNumber] = this.response}
            xhr.send()
        } 
    }
    
    nextFrame(){    
        if(this.animationCheck){
           let pre=document.getElementById('animation');

        pre.innerHTML=this.textList[this.currentFrame];
        this.currentFrame ++
        if (this.currentFrame>=this.textList.length){
            this.currentFrame = 0;
        } 
        setTimeout(() => {this.nextFrame(); }, this.animationDelay);
        }
    }
    pause(){
    
        this.animationCheck=false;
        let _this = this
        //document.getElementById('pauseButton').value = 'Play'
        //document.getElementById('pauseButton').onclick = function(){_this.play()}
        }
    play(){
        this.animationCheck=true;
        this.nextFrame()
        //document.getElementById('pauseButton').value = 'Pause'
        let _this = this
        //document.getElementById('pauseButton').onclick = function(){_this.pause()};
}
}
var flag
function load(){
    flag = new asciiAnimation('flag/', 15);
}

