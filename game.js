const tStart = [1,1];
const mStart = [height-2,width-2];
var tCurrent = tStart;
var mCurrent = mStart;
var currentFacing;
var closerNode;
var endCheck = false;
const debug = true;
var fadeModifier = 1;
var playCount = 0;

if (debug){
     fadeModifier= 0;
}


var specialSquares = [];
var runCount = 0;
var Theseus;
var Minotaur;
var currentCharacter;
var opposingCharacter;
var foundExit;

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
Theseus = new character(tStart,'T')
Minotaur = new character(mStart,'M')
    if (playCount==0){
        currentCharacter = Minotaur;
        opposingCharacter = Theseus;
        console.log('firstPlay');
    }
    else{
    
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
    }
    

    playCount ++
    if(debug){
        document.getElementById('debugDiv').style.display = 'block';
    document.getElementById('debugDiv').innerHTML = `<p>Seed: ${seed.value}</p><p>Current Character: ${currentCharacter.indicator}</p>`
    }

    gameStart()

function gameStart (){
    Theseus.initialize();
    Minotaur.initialize();  
    if(debug == false){
    setTimeout(function(){ introduction(); }, 500*fadeModifier);}
    //displayOptions(currentCharacter.location) 
    else{
        displayFirstOptions();
    }
}

function introduction () {
    document.getElementById('description').innerHTML = "<p class = 'fade' id='1'>A long time ago a child was born to the pairing of the Queen of Crete and the ceremonial bull. The resulting creature, the MINOTAUR, was born half-bull half-man.</p><p class = 'fade' id = '2'>Embrarrassed by his cuckolding, the King of Crete conscripted his prisoner Deadulus to design a Labyrinth beneath the palace to hide the abomination. The King of Crete was cruel as he was powerful and once every seven years he demanded as tribute the seven strongest boys and seven most beautiful girls from the surrounding kingdoms. The tributes were put into the Labyrinth to sate the Minotaur's appetite</p><p class = 'fade' id = '3'>THESEUS, the son of the ruler of Athens, decides enough is enough. He offers himself as tribute and sails to Crete. As he leaves, he promises his father that should he succeed he will fly a white flag from his ship's mast.  </p><p class = 'fade' id='4'>You take the role of the prince in the Labyrinth. Travel the winding corridors until the inevitable confrontation with your foe.<br><input type='button' value = 'CONTINUE' onclick='displayFirstOptions(currentCharacter.location)'></p>"
    document.getElementById("description").style.opacity=1;
    revealIntro(1,4)
}

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

function end (){
    if(!debug){
    endCheck = true;
    console.log('end')
        document.getElementById('inventory').style.display = 'none'
    document.getElementById('redThread').innerHTML = ''
    document.getElementById('controls').style.display = 'none'
    document.getElementById('direction').innerHTML= ''
    document.getElementById('distance').innerHTML = ''
    document.getElementById('description').innerHTML = ''
    document.getElementById('description').style.opacity = 0;
    document.getElementById('text').style.opacity=1;
    setTimeout(function(){
        document.getElementById('description').style.opacity = 1;
        if (currentCharacter == Minotaur){
        document.getElementById('description').innerHTML = "<p class = 'fade' id =1>You finally meet your foe. He is about 6' tall: half your height. Unlike those you meet in the Labyrinth he is armed with a short bronze sword.</p><p class = 'fade' id =2>He leaps at you with the ferocity of a beast. His sword is sharp. You have never faced anyone with a weapon before. He hacks you down where you stand.</p><p class = 'fade' id =3> You were the first and last Minotaur. There will never be another <br><input type='button' value = 'CONTINUE' onclick='end2()'></p>"
        }
        if (currentCharacter == Theseus){
        document.getElementById('description').innerHTML = "<p class = 'fade' id =1>You finally meet your foe. He is a big ugly brute. You hack him down with a few swipes of your sword.You escape Crete with your lover, the Minotaur's sister, Ariadne. You brag to her that the Minotaur barely defended himself.</p><p class = 'fade' id =2>On the journey home to Athens you tire of Ariadne. You stop on the island Naxos and abandon her.</p><p class = 'fade' id =3>When you return home you forget to change out your sails to white to signal your success. In his grief your father dashes himself to death on the rocks below the city. You are remembered as a hero for thousands of years.   <br><input type='button' value = 'CONTINUE' onclick='end2()'></p>"
        }
        revealIntro(1,3)
        //document.getElementById('text').style.opacity = 1;
        //document.getElementById('controls').style.display = 'none';
    }, 1000*fadeModifier
              );}
}

function end2(){
    document.getElementById('description').style.opacity = 0;
    setTimeout(function(){
        document.getElementById('description').style.opacity = 1; 
        document.getElementById('description').innerHTML = "<p class = 'fade' id =1>This game was inspired by House of Asterion by Jorge Luis Borges, Grendel by John Gardner, and the writings of Shane Moring</p><p class = 'fade' id =2>The maze was generated with Prim's Spanning Tree Algorithm. The Minotaur's keen hearing was simulated using Dijkstra's Shortest Path Algorithm. Coincidentally, 40 years ago my dad worked on a wireless radio project for the United States military that used the same algorithm</p><p class='fade' id =3><input type='button' value = 'PLAY AGAIN' onclick='delayStart()'></p>";
        revealIntro(1,3)
        //document.getElementById('text').style.opacity = 1;
        //document.getElementById('controls').style.display = 'none';
    }, 1000*fadeModifier)
}
function delayStart(){
    document.getElementById('text').style.opacity = 0;
    setTimeout(function(){
        document.getElementById('seedChoice').style.display='block';
        document.getElementById('seedChoice').style.opacity=0;
    }, 1000*fadeModifier);
  
    setTimeout(function(){start()}, 2000*fadeModifier);
}

function delayCharacterMove (destination){
    document.getElementById('text').style.opacity=0;
     setTimeout(function(){ characterMove(destination); document.getElementById('text').style.opacity=1;}, 1500*fadeModifier);
}


function characterMove(destination){
    currentCharacter.move(destination);
    opposingCharacter.chooseRandomOption();
    if (checkListEquality(currentCharacter.location,opposingCharacter.location)){
        console.log('end1')
        end();  
    }
    if(endCheck){
        return
    }
    document.getElementById('text').style.opacity=1;
}
function ascend(){
    foundExit = true;
    if (currentCharacter == Minotaur){
    document.getElementById('ascend').style.display="inline";
    document.getElementById('ascend').setAttribute("onClick",`ascendTwo()`)
    document.getElementById('ascend').value = 'ASCEND';}
}
function ascendTwo(){
    document.getElementById('text').style.opacity=0;
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
        document.getElementById('text').style.opacity=1;
    }, 1500*fadeModifier);
}

function ascendThree(){
    document.getElementById('text').style.opacity=0;
    setTimeout(function(){ 
         document.getElementById('description').innerHTML = 'The salty wind eases your pain. You are free.'    
        document.getElementById('ascend').setAttribute("onClick",`ascendFour()`)
        document.getElementById('text').style.opacity=1;
    }, 1500*fadeModifier);

}

function ascendFour(){
    
    document.getElementById('text').style.opacity=0;
    setTimeout(function(){ 
        document.getElementById('description').innerHTML = 'You continue to run.'  
    if (runCount >3){
    document.getElementById('goback').style.display = 'inline';
    document.getElementById('ascend').setAttribute("onClick",`ascendFour()`)
        }
    runCount += 1
        document.getElementById('text').style.opacity=1;
    }, 1500*fadeModifier);
    
}

   function delayDisplayOptions (where){
       document.getElementById('text').style.opacity=0;
       setTimeout(function(){ 
           displayOptions(where)
           document.getElementById('text').style.opacity=1;
       }, 1500*fadeModifier);
       
   } 
function ascendGoBack(){
    
        document.getElementById('text').style.opacity=0;
    setTimeout(function(){ 
          document.getElementById('ascend').value = 'CONTINUE';
    document.getElementById('goback').style.display = 'none';
document.getElementById('ascend').setAttribute("onClick",`delayDisplayOptions(currentCharacter.location)`)
    document.getElementById('description').innerHTML = "You slow to a jog and then to a walk. Something doesn't feel right.  In a different life it might have been yours. You turn back to the labyrinth";
        document.getElementById('text').style.opacity=1;
    }, 1500*fadeModifier);
}

function displayFirstOptions(){

    
    document.getElementById('description').opacity = 0;
    document.getElementById('text').style.opacity=0;
    //document.getElementById('controls').style.opacity=0;
    setTimeout(function(){
        document.getElementById('controls').style.display = 'block';
            document.getElementById('inventory').style.display = 'block';
    document.getElementById('inventory').innerHTML = '<p>INVENTORY: NONE</p>';
    if(currentCharacter==Theseus){
    document.getElementById('inventory').innerHTML = '<p>INVENTORY: BRONZE SWORD, RED THREAD</p>';
    }
        displayOptions(currentCharacter.location); document.getElementById('description').style.opacity = 1; 
        document.getElementById('text').style.opacity = 1;
        document.getElementById('controls').style.opacity=1;
        
    }, 1000*fadeModifier
              );
}

function displayOptions(origin){
    writeRedThread(origin);
    let closerNode;
    if (findPath(opposingCharacter.location,origin).length==0){
        closerNode = opposingCharacter.location
    }
    else{
        closerNode =(findPath(opposingCharacter.location,origin)[0]);}
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

function origin(){
    document.getElementById('description').innerHTML += "<p>On the wall a message is inscribed: 'Draw your knowledge of the past from me and read the ancient tales of learned lore. Look neither at the page of Homer, nor of elegy, nor tragic muse, nor epic strain. Seek not the vaunted verse of the cycle; but look in me and you will find in me all that the world contains.'</p>"}

function west(){
    document.getElementById('description').innerHTML += "<p>You see bas-relief carved into the wall. It depicts Zephyrus, the West Wind. </p><p> On it is inscribed: 'Why do you weep, Asterie,/ for the man whom the bright West Winds will restore to you at the beginning of spring?'</p>"}
function north(){
    document.getElementById('description').innerHTML += "<p>You see bas-relief carved into the wall. It depicts Boreas, the North Wind. </p><p> On it is inscribed: 'Pursuing that doe he had also seen that land beyond the cold blasts of Boreas; there he had stood and marvelled at the trees, and sweet desire for them possessed him, to plant them around the boundary-line of the horse-racing ground with its twelve courses.'</p>"}
function east(){
    document.getElementById('description').innerHTML += "<p>You see bas-relief carved into the wall. It depicts Boreas, the North Wind. </p><p> On it is inscribed: 'Let him possess wild mountain crags, thy favored haunt and home, O Eurus! In his barbarous mansion there, let Aeolus look proud, and play the king in yon close-bounded prison-house of storms!”'</p>"}
function south(){
    document.getElementById('description').innerHTML += "<p>You see bas-relief carved into the wall. It depicts Notus, the South Wind. </p><p> On it is inscribed: '...But make all haste you can to return home again and do not wait till the time of the new wine and autumn rain and oncoming storms with the fierce gales of Notus who accompanies the heavy autumn rain of Zeus and stirs up the sea and makes the deep dangerous.'</p>"}
function Talos(){
    if (!currentCharacter.checkIfVisited()){
        document.getElementById('description').innerHTML += "<p>You see a grate in the ceiling. You hear a clanking echoing down the corridors. It gets louder and louder. Suddenly you see Talos step around the corridor. He is the first robot ever invented, a big bronze brute seven feet tall made by the forge God Hephaestus. He circles Crete thrice a day as a sentry, defending Minos. </p>"
    }
    else{
        document.getElementById('description').innerHTML += "<p>You see the grate where you saw Talos</p>"
    }
}

function Daedalus(){
        if (!currentCharacter.checkIfVisited()){
        document.getElementById('description').innerHTML += "<p>You see a grate in the ceiling. You see a shadow cast by a candle of a large pair of wings. Through the grate you hear two men talking. 'Remember my boy, when you take to flight, fly neither high, lest the glue should melt in the sun and the wings should drop off, nor near the sea, lest the pinions should be detached by the damp.' 'Yes, father, you've told me a dozen times! You think I'll disregard your injunctions?'</p>"
    }
    else{
        document.getElementById('description').innerHTML += "<p>You see the grate where you saw Icarus and Daedalus</p>"}
    }

function mirror(){

        document.getElementById('description').innerHTML += "<p>You see a mirror. Engraved on it is the text: Lo savio mio inver\' lui gridò: \"Forse tu credi che qui sia 'l duca d'Atene, che sú nel mondo la morte ti porse? Pártiti, bestia, ché questi non vene ammaestrato da la tua sorella, ma vassi per veder la vostre pene.\"</p>"
    }

function androgeus(){
    if(currentCharacter==Minotaur){
        document.getElementById('description').innerHTML += "<p>You see a fresco on the wall. It depicts your father slaying your half-brother in Marathon.</p>"
        }
    if(currentCharacter==Theseus){
        document.getElementById('description').innerHTML += "<p>You see a fresco on the wall. It depicts your the Cretan Bull slaying your Minos' son Androgeus in Marathon. You remember hunting down and slaying the bull not long after.</p>"
    }
    }

function hercules(){
    if(currentCharacter==Minotaur){
        document.getElementById('description').innerHTML += "<p>You see a fresco on the wall. It depicts a brutish man, Hercules, subduing your father.</p>"
        }
    if(currentCharacter==Theseus){
        document.getElementById('description').innerHTML += "<p>You see a fresco on the wall. It depicts your friend, Hercules, subduing the Cretan Bull. It would later be freed and wandered to Marathon where you crossed its path</p>"
    }
    }

function glaucusOne(){
    if(currentCharacter==Minotaur){
        document.getElementById('description').innerHTML += "<p>You see a fresco on the wall. It depicts a your brother Glaucus falling into a pot of honey and drowning.</p>"
        }
    if(currentCharacter==Theseus){
        document.getElementById('description').innerHTML += "<p><p>You see a fresco on the wall. It depicts a child falling into a pot of honey and drowning.</p>"
    }
    }

function glaucusTwo(){
    if(currentCharacter==Minotaur){
        document.getElementById('description').innerHTML += "<p>You see a fresco on the wall. It depicts a your stepfather testing the assembled diviners by making them describe the color of a cow that changes thrice a day. Polyidus bests the other diviners by describing the color as that of the mulberry as it ripens.</p>"
        }
    if(currentCharacter==Theseus){
        document.getElementById('description').innerHTML += "<p><p>You see a fresco on the wall. It depicts Polyidus and some cows.</p>"
    }
    }

function glaucusThree(){
    if(currentCharacter==Minotaur){
        document.getElementById('description').innerHTML += "<p>You see a fresco on the wall. It depicts Minos locking Polyidus in his wine-cellar with the honey cask containing Glaucus' corpse.</p>"
        }
    if(currentCharacter==Theseus){
        document.getElementById('description').innerHTML += "<p><p>You see a fresco on the wall. It depicts Polyidus in a wine-cellar.</p>"
    }
    }

function glaucusFour(){
    if(currentCharacter==Minotaur){
        document.getElementById('description').innerHTML += "<p>You see a fresco on the wall. It depicts Polyidus killing a snake with a sword. The snake's mate comes with a healing herb that revives the dead snake. Polyidus uses the herb to heal Glaucus.</p>"
        }
    if(currentCharacter==Theseus){
        document.getElementById('description').innerHTML += "<p><p>You see a fresco on the wall. It depicts Polyidus in a wine-cellar.</p>"
    }
    }

function glaucusFive(){
        document.getElementById('description').innerHTML += "<p>You see a fresco on the wall. It depicts Polyidus teaching Glaucus divination at the behest of Minos. Just before finishing Polyidus asks Glaucus to spit in his mouth, causing him to forget his training as a diviner.</p>" 
    }

function althaemenes(){
    if(currentCharacter == Minotaur){
        document.getElementById('description').innerHTML += "<p>You see a fresco on the wall. It depicts your neice and nephew Althaemenes and Apemosyne fleeing to the mountain Atabyrium after an oracle predicts one of them will slay their father. Then, Althaemenes became the murderer of his sister. She fled Hermes but he spread  fresh hides on the path. She slipped on them and so was deflowered. She revealed to her brother what had happened but he didn't believe her and kicked her to death.</p>" 
        }
        if(currentCharacter == Theseus){
        document.getElementById('description').innerHTML += "<p>You see a fresco on the wall. It depicts Althaemenes and Apemosyne fleeing to the mountain Atabyrium after an oracle predicts one of them will slay their father. Then, Althaemenes became the murderer of his sister. She fled Hermes but he spread  fresh hides on the path. She slipped on them and so was deflowered. She revealed to her brother what had happened but he didn't believe her and kicked her to death.</p>" 
        }
    }

function catreus(){
        document.getElementById('description').innerHTML += "<p>You see a fresco on the wall. It depicts Catreus consulting an oracle and discovering one of his children will slay him. His son Althaemenes then fled to Rhodes. Much later as an old man Catreus sails to try to find his son to pass on his kingship. He stops by Rhodes and is mistaken for a pirate. Catreus tries to explain who he is but can't be heard above the barking of the dogs. Althaemenes slays him with a javelin, fulfilling the prophecy. When he realizes what he has done Althaemenes prays and is swallowed by a chasm.</p>" 
    }

function scylla(){
        document.getElementById('description').innerHTML += "<p>And there is in legend another murderous virgin to be loathed,1 who ruined a loved one at the bidding of his foes, when, lured by Minos' gift, the Cretan necklace forged of gold, she with her dog's heart despoiled Nisus of his immortal lock as he drew breath in unsuspecting sleep.</p>" 
    }

function scyllaTwo(){
        document.getElementById('description').innerHTML += "<p>Scylla, the daughter of Nisus, who, they say, out of love for Minos betrayed Nisaea to him and was drowned in the sea by him, and was here cast ashore by the waves and buried. </p>" 
    }



function revealIntro(i,b){
    document.getElementById(i).style.opacity=1;
    i+=1
    if (i>b){
        return
    }
    else{
        setTimeout(function(){ revealIntro(i,b); }, 2000*fadeModifier);
    }
}



