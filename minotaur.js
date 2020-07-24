var height = 21;
var width = 21;
var grid = [];
var startLocation;
var currentLocation;
var nodeAttributes =[[]]  // [[yCoor of first option,xCoor of next option],distance];
var gridDiv;
var wallList;
var horizontalNodeDistance = 2;
var verticalNodeDistance = 2;

function start(){
    

    document.getElementById('seedChoice').style.opacity=1;
    if(debug){
        document.getElementById('masterGrid').style.display = 'block';
    }
    

}


function chooseSeed(seed){
    
    document.getElementById('description').style.opacity = 0;
    document.getElementById('seedChoice').style.opacity=0;
    setTimeout(function(){
           document.getElementById('seedChoice').style.display='none';
        document.getElementById('text').style.opacity = 1;
        
    randomNumber = seed*100+99;
    generateMaze();

    }, 1000*fadeModifier)

    
}

function generateMaze(){
    grid = []
    for ( let i = 0; i < height; i ++){
        let wList = []
        for (j = 0; j < width; j++){
            if ((i==0 || i==height-1)&&j%2==1){
                wList.push(1);
            }
            else{
                if ((j==0 || j==width-1)&&i%2==1){
                    wList.push(1);
                }
                else{
                    wList.push(0);
                }
            }
        }
        grid.push(wList)
    }
    let halfHeight = (Math.floor((height-2)/2))
    let halfWidth = (Math.floor(((width-2)/2)))
    currentLocation = {height: (getRandomNumber(halfHeight)*2)+1, width:(getRandomNumber(halfWidth)*2)+1};
    grid[currentLocation.height][currentLocation.width]=2;
    wallList = [];
    console.log(wallList)
    addWalls()
let wallListNumber = getRandomNumber(wallList.length); 
    console.log(wallList)
currentLocation = wallList[wallListNumber];
getSurroundingValues(currentLocation.width,currentLocation.height)

function getSurroundingValues(x, y){
    wallList.splice(wallListNumber,1);
    let values = []
    values.push(grid[y-1][x])
    values.push(grid[y+1][x])
    values.push(grid[y][x-1])
    values.push(grid[y][x+1])
    if (values[0]+(values[1]+values[2]+values[3])==2){
        for( let i=0;i<values.length;i++){
            if (values[i]==2){
                if (i==0){
                    grid[y+1][x]=2;
                    currentLocation.height=y+1;
                    currentLocation.width=x;
                }
                if (i==1){
                    grid[y-1][x]=2;
                    currentLocation.height=y-1;
                    currentLocation.width=x;
                }
                if (i==2){
                    grid[y][x+1]=2;
                    currentLocation.height=y;
                    currentLocation.width=x+1;
                }
                if (i==3){
                    grid[y][x-1]=2;
                    currentLocation.height=y;
                    currentLocation.width=x-1;
                }
                grid[y][x]=2;
                addWalls();   
            }
        }
    }
    if(wallList.length>0){
        wallListNumber = getRandomNumber(wallList.length);
        currentLocation = wallList[wallListNumber];
        getSurroundingValues(currentLocation.width,currentLocation.height);
    }
}
for (let i = 0; i<height;i++){
    nodeAttributes.push(false);
    if(i%2==1){
        nodeAttributes[i]=[];
        for (let j = 0; j<width;j++){
            nodeAttributes[i][j]=false;
            if(j%2==1){
            nodeAttributes[i][j]=[]
            nodeAttributes[i][j].push(false)
            nodeAttributes[i][j].push(false)
            nodeAttributes[i][j].push(false)
            nodeAttributes[i][j].push(false)
                }
        }
    }

}



getNodes()


linkNodes()

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

load()
}

function getNodes(){   
    for (let i = 1; i<height; i+=2){
        for (let j = 1; j<width; j+=2){
            let cNode = nodeAttributes[i][j];
            if((grid[i][j+1])==2){
                nodeAttributes[i][j][1]=true;
                nodeAttributes[i][j+2][0]=true;
             }   
            if(grid[i+1][j]==2){
                nodeAttributes[i][j][2]=true;
                nodeAttributes[i+2][j][3]=true;
                if(cNode[3]){
                    if((cNode[1]||cNode[0])==false){
                        nodeAttributes[i][j]=false
                        grid[i][j]='p'}
                }
            }
            if(((cNode[1]&&cNode[0])==true)&&(((cNode[2])||cNode[3])==false)){
                nodeAttributes[i][j]=false
                grid[i][j]='p'
            }
        }
    }}
   function linkNodes(){
    for (let i = 1; i<height; i+=2){
        for (let j = 1; j<width; j+=2){
            if (nodeAttributes[i][j][1]){
                let nextNode = checkHorizontalNode(i,j)
                nodeAttributes[i][j][1]=[[i,j+nextNode],nextNode]
                nodeAttributes[i][j+nextNode][0]=[[i,j],nextNode] 
            }
            if (nodeAttributes[i][j][2]){
                let nextNode = checkVerticalDistance(i,j)
                nodeAttributes[i][j][2]=[[i+nextNode,j],nextNode]
                nodeAttributes[i+nextNode][j][3]=[[i,j],nextNode] 
            }
        }
    }
    function checkHorizontalNode(y,x){
        let workingList = nodeAttributes[y];
        if (workingList[x+2][0]==true){
            let newHorizontalDistance = horizontalNodeDistance;
            horizontalNodeDistance = 2;
            return newHorizontalDistance;
        }
        else{horizontalNodeDistance+=2;
             return checkHorizontalNode(y,x+2)
            }
    }
    function checkVerticalDistance(y,x){
        if (nodeAttributes[y+2][x][3]==true){
            let newVerticalDistance = verticalNodeDistance;
            verticalNodeDistance = 2;
            return newVerticalDistance;
        }
        else{verticalNodeDistance+=2;
             return checkVerticalDistance(y+2,x)
            }
    }
}
                  
function addWalls(){
    for (let i = currentLocation.height-1; i < currentLocation.height+2; i+=2){
        if (grid[i][currentLocation.width]==0){
            grid[i][currentLocation.width]=3
            wallList.push({height: i, width: currentLocation.width});
        }
    }
    for (let i = currentLocation.width-1; i < currentLocation.width+2; i+=2){
        if (grid[currentLocation.height][i]==0){
            grid[currentLocation.height][i]=3
            wallList.push({height: currentLocation.height, width: i});
        }
    }
} 




var gridDivList;

function load(){
    document.getElementById('controls').style.display = 'none';
    document.getElementById('distance').style.display = 'none';
    gridDiv = [];
    gridDivList =[];
    gridDivList.fill(false,0,height)
    document.getElementById("masterGrid").innerHTML = '';
    /*let xGridWrap = document.createElement('div');
    let xGrid = document.createElement('div');
        xGrid.innerHTML = 0 ;
        xGrid.style.float = 'left';
        xGridWrap.appendChild(xGrid);
        for (let l = 0; l < grid[0].length; l++){
            let xGrid = document.createElement('div');
            xGrid.innerHTML = l;
            xGrid.style.float = 'left';
            xGridWrap.appendChild(xGrid);
        }
        document.getElementById("masterGrid").appendChild(xGridWrap);
    document.getElementById("masterGrid").appendChild(document.createElement('br'));*/
    for (let k =0; k <grid.length; k++){

        //THis gives grid number

        /*
        let newDiv = document.createElement('div');
        newDiv.innerHTML = k;
        newDiv.style.float = 'left';


        document.getElementById("masterGrid").appendChild(newDiv);
        */
        newDiv = document.createElement('div');
        document.getElementById("masterGrid").appendChild(newDiv);
        gridDiv.push(newDiv);
        for (let l = 0; l < grid[k].length; l++){
            let evenNewerDiv = document.createElement('div');
            evenNewerDiv.style.float = 'left'
            if (grid[k][l] == 2){
                evenNewerDiv.style.background = 'gray';
            }
            if (grid[k][l] != 'p'&&grid[k][l] != '2'){
                evenNewerDiv.style.background = 'black';
            }
            evenNewerDiv.innerHTML = grid[k][l];
            (gridDiv[k]).appendChild(evenNewerDiv);
        }
        gridDivList.push(gridDiv)
        document.getElementById("masterGrid").appendChild(document.createElement('br'));
    }
    game()
}
function getDiv (list){
    y = (list[0])
    x = list[1]
    return gridDiv[y].childNodes[x];
}