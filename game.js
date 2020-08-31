const tStart = [1,1];
const mStart = [height-2,width-2];
var tCurrent = tStart;
var mCurrent = mStart;
var currentFacing;
var closerNode;
var endCheck = false;
var debug = false;
var fadeModifier = 1;
var fadeTime = 1000;
var playCount = 0;
var initialDistance = false;

class character {
  constructor(location, indicator) {
    this.location = location;
    this.indicator = indicator;
    this.facing = 0;
    this.alreadyVisited = [this.location];
    }
    initialize(){
        getDiv(this.location).innerHTML=this.indicator;
        let tempDir = ((checkDirection(this.location,nodeAttributes[this.location[0]][this.location[1]][0][0]))[0]);
        this.facing = tempDir
    }
    
    move(where){
        if (checkListEquality(where,opposingCharacter.location)){
            console.log('endmove')
            end();
        }
        else{
            let checkArray = (checkDirection(this.location,where))
            this.alreadyVisited.push(where)
            getDiv(this.location).innerHTML='2'
            getDiv(this.location).style.backgroundColor='gray'
            this.facing = checkArray[0]
            this.location = where
            getDiv(this.location).innerHTML = this.indicator;
            getDiv(this.location).style.backgroundColor='red'
            displayOptions(where)
            document.getElementById('distance').innerHTML=`You walk ${checkArray[1]*2} paces`
        }
    }
    moveOpposing(where){
        if (checkListEquality(where,currentCharacter.location)){
            console.log('endmove')
            end();
        }
        else{
            this.alreadyVisited.push(where)
            let checkArray = (checkDirection(this.location,where))
            getDiv(this.location).innerHTML='2'
            getDiv(this.location).style.backgroundColor='gray'
            this.location = where
            getDiv(this.location).innerHTML = this.indicator;
            getDiv(this.location).style.backgroundColor='red'
            }
    }
    getNextOption (){
        return nodeAttributes[this.location[0]][this.location[1]]
    }
    chooseRandomOption(){
        let choice = getRandomNumber(this.getNextOption().length)
        this.moveOpposing(this.getNextOption()[choice][0])
    }
    checkIfVisited(){
    if(listWithinList(this.location,this.alreadyVisited.slice(0,-1))){
        return true;
    }
        else{return false;}
}
}

if (debug){
     fadeModifier= 0;
}


var specialSquares = [];
var runCount = 0;
var Theseus;
var Minotaur;
var currentCharacter = Minotaur;
var opposingCharacter =Theseus;
var foundExit;


function introduction () {
    
     endCheck = false;
    let text;
    
    if ((playCount %2) == 1){
        text = 'Athenian duke'
    }
    if ((playCount %2)==0){
        text = 'prince in the labyrinth'
    }
    document.getElementById('description').innerHTML = `<p class = 'fade' id='1'>A long time ago a child was born to the pairing of the Queen of Crete and the ceremonial bull. The resulting creature, the MINOTAUR, was born half-bull half-man.</p><p class = 'fade' id = '2'>Embrarrassed by his cuckolding, the King of Crete conscripted his prisoner Deadulus to design a Labyrinth beneath the palace to hide the abomination. The King of Crete was cruel as he was powerful and once every seven years he demanded as tribute the seven strongest boys and seven most beautiful girls from the surrounding kingdoms. The tributes were put into the Labyrinth to sate the Minotaur's appetite</p><p class = 'fade' id = '3'>THESEUS, the son of the ruler of Athens, decides enough is enough. He offers himself as tribute and sails to Crete. As he leaves, he promises his father that should he succeed he will fly a white flag from his ship's mast.  </p> <div class = 'fade' id='4'><p>You take the role of the ${(text)}. Travel the winding corridors until the inevitable confrontation with your foe.</p><p><input type='button' style="font-size:1em !important;" value = 'CONTINUE' onclick='flagIntro();if(playCount==0){mainSound()};'></p></div>`
    reveal('description')
    revealIntro(1,4);
    //setTimeout(function(){revealIntro(1,4);},fadeTime*fadeModifier);
}

function hideAll(){
    let els = document.getElementById('text').children;
    for(let i=0; i<(els.length); i++){
        els[i].style.opacity=0
        setTimeout(function(){els[i].style.display = 'none';} , fadeTime*fadeModifier);
    }
}

function reveal(elementName){
    document.getElementById(elementName).style.display = 'block';
    setTimeout(function(){ document.getElementById(elementName).style.opacity = 1;} , fadeTime*fadeModifier);
}

function revealAll(){
    let els = document.getElementById('text').children;
    for(let i=0; i<(els.length); i++){
        console.log(els[i])
        reveal(els[i].id)
    }
}

function revealGame(){
    reveal('distance');
    reveal('description');
    reveal('redThread');
    reveal('direction');
    reveal('controls');
}
function flagIntro(){
    hideAll()
    setTimeout(function(){ 
        if(typeof(flag)!="object"){
            flag = new asciiAnimation("flag/", 15);
        }
        flag.play()
        reveal('title')
        reveal('animation')
        reveal('description')
        document.getElementById('title').innerHTML='MINOTAUR';
        document.getElementById('description').innerHTML="<input type='button' value = 'CONTINUE' onclick='hideAll();setTimeout(function(){reveal(`seedChoice`);} , fadeTime*fadeModifier)'>";
        
    } , fadeTime*fadeModifier)
}
function game(){

foundExit = false;

for (i=1;i<height;i+=2){
    for (j=1;j<width;j+=2){
        for (k=0;k<4;k++){
            if (nodeAttributes[i][j][k]==false){
                nodeAttributes[i][j].splice(k,1);
                k=k-1;
            }
        }
    }
}
Theseus = new character(tStart,'T')
Minotaur = new character(mStart,'M')
    /*if (playCount==0){
        currentCharacter = Minotaur;
        opposingCharacter = Theseus;
        console.log('firstPlay');
    }*/
    //else{
        if (playCount%2==1){
            console.log('currentCharacter is now Theseus')
            
            currentCharacter = Theseus;
            opposingCharacter = Minotaur;
            foundExit = true;
        }
        else{
            console.log('currentCharacter is now Minotaur')
            currentCharacter = Minotaur;
            opposingCharacter = Theseus;
            foundExit = false;
        }
    //}
    //playCount ++
    if(debug){
        document.getElementById('masterGrid').style.display = 'block';
        document.getElementById('debugDiv').style.display = 'block';
    document.getElementById('debugDiv').innerHTML = `<p>Seed: ${seed.value}</p><p>Current Character: ${currentCharacter.indicator}</p>`
    }
    gameStart()





}

function gameStart (){
    Theseus.initialize();
    Minotaur.initialize();  
    /*if(debug == false){
    setTimeout(function(){ introduction(); }, 500*fadeModifier);}
    //displayOptions(currentCharacter.location) 
    else{*/
        displayFirstOptions();
    //}
}

function checkDirection(origin,destination){
        if (origin[0]>destination[0]){ //north
            return [0,origin[0]-destination[0]] 
        }
        if (origin[1]<destination[1]){ //east
            return [1,destination[1]-origin[1]] 
        }
        if (origin[0]<destination[0]){ //south
            return [2,destination[0]-origin[0]] 
        }

        if (origin[1]>destination[1]){ //west
            return [3,origin[1]-destination[1]] 
        }
}

const leftRightDict = {
    options:['ahead','behind','the right','the left'],
    redThread:["ahead of you","behind you", 'the right','the left']
}

function checkLeftRight(origin,destination,dictChoice) {  
    let cDirection = checkDirection(origin,destination)[0];
    let leftRight = (cDirection - currentCharacter.facing)
    if (leftRight == 0){
        return dictChoice[0];
    }
    if (leftRight == 2 || leftRight == -2){
        return dictChoice[1];
    }

    if (leftRight== 1 || leftRight ==-3){
        return dictChoice[2];
    }
    if (leftRight == -1 || leftRight == 3){
        return dictChoice[3];
    }
}

function resetGame(){
    initialDistance = false;
    bell.off()
    percussion.off()
    waves.off()
}

function end(){
    //if(!debug){
    if(true){
    resetGame()
    endCheck = true;
    playCount ++
    console.log('end')
    document.getElementById('redThread').innerHTML = ''
    document.getElementById('direction').innerHTML= ''
    document.getElementById('distance').innerHTML = ''
    document.getElementById('description').innerHTML = ''
    //setTimeout(function(){
        
        if (currentCharacter == Minotaur){
            document.getElementById('description').innerHTML = "<p class = 'fade' id =1>You finally meet your foe. He is about 6' tall: half your height. Unlike those you meet in the Labyrinth he is armed with a short bronze sword.</p><p class = 'fade' id =2>He leaps at you with the ferocity of a beast. His sword is sharp. You have never faced anyone with a weapon before. He hacks you down where you stand.</p><p class = 'fade' id =3> You were the first and last Minotaur. There will never be another <br><input type='button' value = 'CONTINUE' onclick='end2()'></p>"
        }
        if (currentCharacter == Theseus){
         document.getElementById('description').innerHTML = "<p class = 'fade' id =1>You finally meet your foe. He is a big ugly brute. You hack him down with a few swipes of your sword.You escape Crete with your lover, the Minotaur's sister, Ariadne. You brag to her that the Minotaur barely defended himself.</p><p class = 'fade' id =2>On the journey home to Athens you tire of Ariadne. You stop on the island Naxos and abandon her.</p><p class = 'fade' id =3>When you return home you forget to change out your sails to white to signal your success. In his grief your father dashes himself to death on the rocks below the city. You are remembered as a hero for thousands of years.   <br><input type='button' value = 'CONTINUE' onclick='end2()'></p>"
        }
        revealIntro(1,3);
        reveal('description');

    //}, fadeTime*fadeModifier);
    
  
              }
}

function end2(){
    hideAll();
    setTimeout(function(){
        reveal('description')
        document.getElementById('description').innerHTML = "<p class = 'fade' id =1>This game was inspired by House of Asterion by Jorge Luis Borges, Grendel by John Gardner, and the writings of Shane Moring</p><p class = 'fade' id =2>The maze was generated with Prim's Spanning Tree Algorithm. The Minotaur's keen hearing was simulated using Dijkstra's Shortest Path Algorithm. Coincidentally, 40 years ago my dad worked on a wireless radio project for the United States military that used the same algorithm</p><p class='fade' id =3><input type='button' value = 'PLAY AGAIN' onclick='delayStart()'></p>";
        revealIntro(1,3)
        //document.getElementById('text').style.opacity = 1;
        //document.getElementById('controls').style.display = 'none';
    }, fadeTime*fadeModifier)
}
function delayStart(){
    hideAll()
    setTimeout(function(){start()}, fadeTime*fadeModifier);
}

function delayCharacterMove (destination){
    hideAll()
     setTimeout(function(){ characterMove(destination);}, fadeTime*fadeModifier);
}


function characterMove(destination){
    opposingCharacter.chooseRandomOption();
    currentCharacter.move(destination);
    
    if (checkListEquality(currentCharacter.location,opposingCharacter.location)){
        console.log('end1')
        end();  
    }
    if(endCheck){
        return
    }
    revealGame();
    //revealGame()
}
function ascend(){
    foundExit = true;
    if (currentCharacter == Minotaur){
    document.getElementById('ascend').style.display="inline";
    document.getElementById('ascend').setAttribute("onClick",`ascendTwo()`)
    document.getElementById('ascend').value = 'ASCEND';}
}
function ascendTwo(){
    hideAll()
    setTimeout(function(){ 
        document.getElementById('redThread').innerHTML = ''
        document.getElementById('direction').innerHTML = ''
        document.getElementById('distance').innerHTML = ''
        let cNodes = document.getElementById('controls').childNodes;
            for (let i=0;i<cNodes.length;i++){
                if (cNodes[i]!=document.getElementById('ascend')){
                    cNodes[i].style.display="none"
                }
            }
        document.getElementById('ascend').value = 'KEEP GOING';
        document.getElementById('description').innerHTML = "<p>You exit the labyrinth. You've never been here before. It's so bright it's blinding at first. The red string was leading you to freedom all along. </p><p>You run, first on four limbs, then two, out onto the grassy hills of your country.</p>";
        document.getElementById('ascend').setAttribute("onClick",`ascendThree()`)
        revealGame()
      
    }, fadeTime*fadeModifier);
}

function ascendThree(){
    hideAll()
    setTimeout(function(){ 
         document.getElementById('description').innerHTML = 'The salty wind eases your pain. You are free.'    
        document.getElementById('ascend').setAttribute("onClick",`ascendFour()`)
        revealGame();
    }, fadeTime*fadeModifier);

}

function ascendFour(){
    
    hideAll();
    setTimeout(function(){ 
        document.getElementById('description').innerHTML = 'You continue to run.'  
    if (runCount >3){
    document.getElementById('goback').style.display = 'inline';
    document.getElementById('ascend').setAttribute("onClick",`ascendFour()`)
        }
    runCount += 1
        revealGame();
    }, fadeTime*fadeModifier);
    
}

   function delayDisplayOptions (where){
       hideAll()
       setTimeout(function(){ 
           displayOptions(where)
           revealGame()
       }, fadeTime*fadeModifier);
       
   } 
function ascendGoBack(){
    
        document.getElementById('text').style.opacity=0;
    setTimeout(function(){ 
          document.getElementById('ascend').value = 'CONTINUE';
    document.getElementById('goback').style.display = 'none';
document.getElementById('ascend').setAttribute("onClick",`delayDisplayOptions(currentCharacter.location)`)
    document.getElementById('description').innerHTML = "You slow to a jog and then to a walk. Something doesn't feel right.  In a different life it might have been yours. You turn back to the labyrinth";
        document.getElementById('text').style.opacity=1;
    }, fadeTime*fadeModifier);
}

function displayFirstOptions(){

    
    hideAll()
    setTimeout(function(){
        reveal('controls')
        reveal('inventory')
        reveal('text')
        reveal('description')
        document.getElementById('inventory').innerHTML = '<p>INVENTORY: NONE</p>';
        if(currentCharacter==Theseus){
        document.getElementById('inventory').innerHTML = '<p>INVENTORY: BRONZE SWORD, RED THREAD</p>';
    }
        displayOptions(currentCharacter.location); 
        
    }, fadeTime*fadeModifier);
}

function displayOptions(origin){
    writeRedThread(origin);
    let closerNode;
    
    let path =findPath(opposingCharacter.location,origin)
    let distance = findDistance(opposingCharacter.location,origin,path)
    if( initialDistance === false){
        initialDistance = distance;
    }
    console.log('distance: '+distance);
    console.log('delta: '+(distance-initialDistance));
    if((distance-initialDistance)<((initialDistance*3/4)*-1)-1){
        console.log('percussion on')
        percussion.on()
        waves.on()
        bell.on()
    }
    else if((distance-initialDistance)<((initialDistance/2)*-1)-1){
        console.log('bell.on');
        percussion.off()
        bell.on()
        waves.on()
        
    }
    else if((distance-initialDistance)<((initialDistance/4)*-1)-1){
        console.log('waves.on');
        waves.on()
        bell.off()
        percussion.off()
    }
    else{
        console.log('all off');
        waves.off()
        bell.off()
        percussion.off()
    }
    
    if (path.length==0){
        closerNode = opposingCharacter.location
    }
    else{
        closerNode =(path[0]);}
        let cNodes = document.getElementById('controls').childNodes;
        for (let i=0;i<cNodes.length;i++){
            cNodes[i].style.display="none"
        }
        let optionList = [];
        let currentNodeAttributes = nodeAttributes[origin[0]][origin[1]];
        for(let i=0;i<currentNodeAttributes.length;i++){
            let leftRight = checkLeftRight(origin,currentNodeAttributes[i][0],leftRightDict.options);
            optionList.push({direction:(checkDirection(origin,currentNodeAttributes[i][0]))[0],distance:currentNodeAttributes[i][1],coordinates:currentNodeAttributes[i][0],leftRight:leftRight})
            document.getElementById(optionList[i].leftRight).style.display = "inline"
            

        document.getElementById(optionList[i].leftRight).setAttribute("onClick",`delayCharacterMove([${optionList[i].coordinates}])`)
            if (getRandomNumber(5)<2){ //randomize showing direction
            if (checkListEquality(optionList[i].coordinates,closerNode)){
                document.getElementById('direction').innerHTML = `You hear noises from ${optionList[i].leftRight}`
            }}
            else{
                document.getElementById('direction').innerHTML = ''

            }
        }
    document.getElementById('description').innerHTML=`There are ${(optionList.length)} ways to go`
    if(optionList.length ==1){
        document.getElementById('description').innerHTML=`You are at a dead end`
    }
    if(optionList.length ==2){
        document.getElementById('description').innerHTML=`You are at a corner`
    }
    if(typeof specialSquares[origin[0]][origin[1]] == 'function'){
        specialSquares[origin[0]][origin[1]]();
    }
}

function writeRedThread(origin){
    document.getElementById('redThread').innerHTML='';
    let redThread = [];
    if (listWithinList(origin,Theseus.alreadyVisited)){
        for(let i =0;i<Theseus.alreadyVisited.length-1;i++){
            if (checkListEquality(origin,Theseus.alreadyVisited[i])){
                let cLeftRight = []
                if (Theseus.alreadyVisited[i+1]!=undefined){
                    cLeftRight.push(checkLeftRight(origin,Theseus.alreadyVisited[i+1],leftRightDict.redThread))
                }
                if (Theseus.alreadyVisited[i-1]!=undefined){
                    cLeftRight.push(checkLeftRight(origin,Theseus.alreadyVisited[i-1],leftRightDict.redThread))
                }
                redThread.push(cLeftRight)
                document.getElementById('redThread').innerHTML='';
                for(let i=0;i<redThread.length;i++){
                    if(i>2){
                        document.getElementById('redThread').innerHTML+="There are more red threads going every which way that you can't keep track of."
                        break
                    }
                    else{
                        generateRedThreadMessage(i); 
                    }
                     
                }
            }
        }
    }
    function generateRedThreadMessage(i){
        let textNode = '';
        if(i==0){
                textNode +=' You see '
                //document.getElementById('redThread').innerHTML+=`<p>You see `;
            }
            else{
                textNode +=' You see another '
                //document.getElementById('redThread').innerHTML+=`<p>You see another `
            }
            if(redThread[i].length==1){
                if(foundExit){
                    textNode+=`red thread leading from ${redThread[i][0]} to the secret door.`
                      //document.getElementById('redThread').innerHTML+="red thread leading to the secret door.</p>"
                }
                else{
                    textNode+=`the red thread coming from ${redThread[i][0]} curling off into a dark shadow. On further inspection you realize the wall isn't what it seems. The red thread leads to a pseudothyrum. When you open it, you see a narrow, winding set of stairs leading up to the unknown.`
                   //document.getElementById('redThread').innerHTML+="the end of the red thread curls off into a dark shadow. On further inspection you realize the wall isn't what it seems. The red thread leads to a pseudothyrum.</p> <p> When you open it, you see a narrow, winding set of stairs leading to the unknown.</p>"  
                }
            }
        else{
                if (redThread[i][0] == redThread[i][1]){
                    textNode+=`red thread coming from ${redThread[i][0]} then looping back around to ${redThread[i][1]}`;
                    //document.getElementById('redThread').innerHTML+=`red thread coming from ${redThread[i][0]} then looping back around to ${redThread[i][1]} </p>`
                }
                else{
                    textNode+=`red thread going from ${redThread[i][0]} to ${redThread[i][1]}`;
                    //document.getElementById('redThread').innerHTML+=`red thread going from ${redThread[i][0]} to ${redThread[i][1]} </p>`
                }
            }
        textNode = document.createTextNode(textNode);
            let p = document.createElement("P");
            p.appendChild(textNode);
            document.getElementById('redThread').append(p);
    }
}




function revealIntro(i,b){
    console.log(document.getElementById(i))
    reveal(i)
    i+=1;
    
    if (i>b){
        return
    }
    else{
        setTimeout(function(){ revealIntro(i,b); }, fadeTime*fadeModifier*3);
    }
}



