const contentList = [glaucusOne,glaucusTwo,glaucusThree,glaucusFour,glaucusFive,ariadne,daedalus,daedalusThree,daedalusFour,daedalusFive,althaemenes,androgeus,scylla,scyllaTwo,mirror,hercules,catreus,Talos];

function contentTemplate(minotaur,theseus,minotaurVisited,theseusVisited){
    if(currentCharacter==Minotaur){
        if(currentCharacter.checkIfVisited()){
            document.getElementById('description').innerHTML += minotaurVisited;
        }
        else{
            document.getElementById('description').innerHTML += minotaur;}
        }
    
    if(currentCharacter==Theseus){
        if(currentCharacter.checkIfVisited()){
            document.getElementById('description').innerHTML += theseusVisited;
        }
        else{
            document.getElementById('description').innerHTML += theseus;
        }
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
    let theseus = "<p>Through a grate in the wall you see a bronze automaton. It is huge, almost ten feet long and has the body of a man and the head of a bull. It's left ankle is damaged and it leaks green goop on the floor.</p>"
    let minotaur = "<p>You see a grate in the ceiling. You hear a clanking echoing down the corridors. It gets louder and louder. Suddenly you see Talos step around the corridor. He is the first robot ever invented, a big bronze brute seven feet tall made by the forge God Hephaestus. He circles Crete thrice a day as a sentry, defending Crete. </p>"
    let visited ="<p>You see the grate where you saw the automaton.</p>"
    contentTemplate(minotaur,theseus,visited,visited)
}

function daedalus(){
    let mV = "<p>You see the grate where Daedalus spoke to Icarus.</p>"
    let m = "<p>You see a grate in the ceiling. You see a shadow cast by a candle of a large pair of wings. Through the grate you hear two men talking. 'Remember my boy, when you take to flight, fly neither high, lest the glue should melt in the sun and the wings should drop off, nor near the sea, lest the pinions should be detached by the damp.' 'Yes, father, you've told me a dozen times! You think I'll disregard your injunctions?'</p>"
    let tV = "<p>You see the grate where Minos heard of Icarus' death.</p>"
    let t = "<p>You see a grate. Through the grate a soldier is reporting Daedalus' escape to Minos. Minos is enraged. Daedalus' son, Icarus' body was found dashed against the rocks. He was wearing artificial wings made of candle wax and down feathers from pillows. The wax had melted.</p>"
    contentTemplate(m,t,mV,tV)

    }

function daedalusThree(){
    
    let mV = "<p>You see the grate where you saw Minos ponder Daedalus' punishment.</p>"
    let m = '<p>You see a grate. Through the grate you see Minos pacing angrily. You hear him muttering under his breath. "Curse that traitor Daedalus! This whole mess is completely his fault! If he hadn\'t built my wife the artificial bull... And now he has helped my enemy navigate the labyrinth." He pauses, stroking his beard. "Perhaps if he loves the Labyrinth so much it can be his grave..." </p> <p>With an evil glint in his eye Minos leaves the hall</p>'
    let tV = "<p>You see the grate where Minos had an idea.</p>"
    let t = '<p>You see a grate. Through the grate Minos mutters to himself. "I must pursue him, he cannot escape. But how? How to catch him?" He stands stroking his beard. "Perhaps there is a way. Daedalus can\'t resist a good puzzle." His eyes drift to a spiral shell forgotten on the table. He picks it up thoughtfully and walks from the room. </p>'
    contentTemplate(m,t,mV,tV)
}

function daedalusFive(){
        if (!currentCharacter.checkIfVisited()){
        document.getElementById('description').innerHTML += '<p>You see a grate. Through the grate a soldier is reporting Minos\' death to Pasiphae.  "...And having come to Sicily, to the court of Cocalus, with whom Daedalus was concealed, Minos showed the spiral shell. Cocalus took it, and promised to thread it, and gave it to Daedalus; who fastened a thread to an ant, and, having bored a hole in the spiral shell, allowed the ant to pass through it. But when Minos found the thread passed through the shell, he perceived that Daedalus was with Cocalus, and at once demanded his surrender. Cocalus promised to surrender him, and made an entertainment for Minos; but after his bath Minos was undone by the daughters of Cocalus; some say, however, that he died through being drenched with boiling water." After hearing the new Pasiphae excuses the soldier and gazes without expression through a window to the sea. </p>'
    }
    else{
        document.getElementById('description').innerHTML += "<p>You see the grate where the Pasiphae received new of Minos' death.</p>"}
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

function ariadne(){
    if(currentCharacter == Minotaur){
        document.getElementById('description').innerHTML += "<p>Through a grate you see the dance floor Daedalus designed for fair-tressed Ariadne. You would watch her for hours as she piroutted and pranced through the hall.</p>"}
        if(currentCharacter == Theseus){
        document.getElementById('description').innerHTML += "<p>Through a grate you see a grand dance floor. It is empty.</p>"}
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
        document.getElementById('description').innerHTML += "<p>Through a grate you see the interior of a stable. Your stepfather has assembled the kingdom's diviners and tests them by making them describe the color of a cow that changes thrice a day. Polyidus bests the other diviners by describing the color as that of the mulberry as it ripens.</p>"
        }
    if(currentCharacter==Theseus){
        document.getElementById('description').innerHTML += "<p>Through a grate you see a stable. At the far end you see something strange. At first you think it is a cow, but it is actually a wheeled construct. It is made of wood and painted white.</p>"
    }
    if(currentCharacter.checkIfVisited()){
        document.getElementById('description').innerHTML += "<p>Through a grate you see the stable</p>"
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
        document.getElementById('description').innerHTML += "<p>You see a wine-cellar through a grate. Inside the diviner Polyidus kills a snake with a sword. He watches the snake's mate emerge from a hole in the wall with an herb in its mouth. It uses the herb to revive the dead snake.</p>"
        }
    if(currentCharacter==Theseus){
        document.getElementById('description').innerHTML += "<p>You see a wine-cellar through a grate. You see the diviner, Polyidus opening a cask. Inside is the corpse of a child. Polyidus applies the herb to the child. Slowly, surely, the child loses its deathly palor. Color returns to his cheeks, and finally he opens his eyes.</p>"
    }
    if(currentCharacter.checkIfVisited()==true){
        document.getElementById('description').innerHTML += "<p>You see the wine-cellar through the grate.</p>"
    }
    }

function glaucusFive(){
        if(currentCharacter==Minotaur){
        document.getElementById('description').innerHTML += "<p>You see Polyidus' chambers through a grate. He is speaking with Minos. \"I have decided to offer you clemency.\" Minos says, \"You may leave... after you teach my son Glaucus your diviner ways.\" Polyidus nods uncertainly.</p>"
        }
    if(currentCharacter==Theseus){
        document.getElementById('description').innerHTML += "<p>Through a grate you see Polyidus' chambers. There is also a young child. \"Your training is complete Glaucus. Now there is only one more thing you must do. You must spit into my mouth.\" The child looks confused and scared but acquiesces. Polyidus gathers his pack and leaves./p>"
    }
    if(currentCharacter.checkIfVisited()==true){
        document.getElementById('description').innerHTML = "<p>You see Polyidus' chambers through a grate.</p>"
    }
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
        document.getElementById('description').innerHTML += "<p>On the wall you see engraved: \"And there is in legend another murderous virgin to be loathed,1 who ruined a loved one at the bidding of his foes, when, lured by Minos' gift, the Cretan necklace forged of gold, she with her dog's heart despoiled Nisus of his immortal lock as he drew breath in unsuspecting sleep.\"</p>" 
    }

function scyllaTwo(){
        document.getElementById('description').innerHTML += "<p>On the wall you see engraved: \"Scylla, the daughter of Nisus, who, they say, out of love for Minos betrayed Nisaea to him and was drowned in the sea by him, and was here cast ashore by the waves and buried.\"</p>" 
    }