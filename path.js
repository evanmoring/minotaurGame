function findPath(start,end){
    console.log(start)
    console.log(end)
    if(checkListEquality(start,end)){
        console.log("bigEND")
        return
    }
    let nextList = [];// a list of next Nodes to try with their length from the origin[[[y,x],length,[lastY,lastX]]]
    let workingLengthList = [];// [length]
    let currentNode =[]; //the node connections of the current node[[[nextY,nextX],nextDistance,[lastY,lastX]]]
    let currentNodeCoor; //[y,x]
    //let alreadyVisitedList = []; //a list of coordinate values of nodes that have already been visited[[y,x]]
    let alreadyVisitedPath = []
    let alreadyVisitedList = []
    let minIndex;
    let maxIndex
    let min;
    let max;
    let previousLength = 0;
    let endCheck = false;
    let truePath = [];
    alreadyVisitedList.push(start)
    alreadyVisitedPath.push(false)
    currentNodeCoor = start;

    currentNode = nodeAttributes[currentNodeCoor[0]][currentNodeCoor[1]].slice()
    addNodeToNextList()
    findNextNode()
    return (getTruePath(alreadyVisitedPath,alreadyVisitedList,currentNodeCoor));

    function findNextNode(){
        if (endCheck == true){
            return
        }
        min = Math.min.apply(null, workingLengthList);
        minIndex = workingLengthList.indexOf(min);
        
        previousLength = nextList[minIndex][1]
        
        
        currentNodeCoor=nextList[minIndex][0];
        currentNode = nodeAttributes[nextList[minIndex][0][0]][nextList[minIndex][0][1]].slice();

        if(!(listWithinList(currentNodeCoor,alreadyVisitedList))){
            alreadyVisitedPath.push(nextList[minIndex][2]);
            alreadyVisitedList.push(currentNodeCoor);
            for (let i=0;i<currentNode.length;i++){

            addNodeToNextList()}
        }

        nextList.splice(minIndex,1);
        (workingLengthList.splice(minIndex,1));
        findNextNode()
    }
    function addNodeToNextList(){
        for (i=0;i<currentNode.length;i++){
            if(!(listWithinList((currentNode[i][0]),alreadyVisitedList))){
                if(checkListEquality(currentNode[i][0],end)){
                    endCheck = true;
                    return;
                }
            nextList.push(currentNode[i].slice());
            nextList[nextList.length-1][2]=(currentNodeCoor)
            nextList[nextList.length-1][1]=nextList[nextList.length-1][1]+previousLength
            workingLengthList.push(nextList[[nextList.length-1]][1]+previousLength);
            }
        }
    }
    function getTruePath (aVP,aVL,cNC){
        newcNC = aVP[findIndexOfCoor(cNC,aVL)]
        if (newcNC){
            truePath.push(cNC);
            getTruePath(aVP,aVL,newcNC)        
        }
        return(truePath)
        
        function findIndexOfCoor (currentCoor, coorList){
            for(let i=0;i<coorList.length;i++){
                if(checkListEquality(currentCoor,coorList[i])){
                    return i;
                }
            }
        }
    }

}
function listWithinList(list,container){
    for (let i =0; i<container.length; i++){
        if(checkListEquality(container[i],list)){
            return true;
        }
    }
    return false;
}

function checkListEquality(list1,list2){
    if (list1.length != list2.length){
        return false;
    }
    for (let i=0;i<list1.length;i++){
        if (list1[i]!=list2[i]){
            return false;
        }
    }
    return true;
}