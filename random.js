var initialSeed = '000040';
var randomNumber = initialSeed;

function getRandomNumber(choices){
    randomNumber = randomNumber*randomNumber;
    let randomString = String(randomNumber);
    while(randomString.length<12){
        randomString= String(0)+randomString;
    }
    randomNumber = String(randomString).slice(2,(String(initialSeed.length)*2)+2);
    
    //return Math.floor((randomNumber*choices)/1000000)
    return randomNumber%choices
}


var testList = [0,0,0,0]
/*for (let i = 1;i<1000;i++){
    let testNum = (getRandomNumber(4));
    testList[testNum]+=1;
    console.log()
}
console.log(testList)*/