var moddevelop = require('mod.develop');
var mod_lis=[moddevelop];
const creepConfigs=[ [[WORK,WORK,CARRY,MOVE], //harvester
                      [WORK,WORK,CARRY,MOVE],//upgrader
                      [WORK,WORK,CARRY,MOVE],//builder
                      [],//carrier
                      [],//defender
                      [CARRY,CARRY,MOVE],//picker
                      [WORK,CARRY,MOVE]//repairer
                     ],//lv1
                      [[WORK,WORK,WORK,WORK,WORK,MOVE], //harvester
                      [WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE],//upgrader
                      [WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE],//builder
                      [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE],//carrier
                      [],//defender
                      [CARRY,CARRY,CARRY,CARRY,MOVE,MOVE],//picker
                      [WORK,CARRY,CARRY,MOVE,MOVE]//repairer
                     ]//lv2
                    ]

var role_name_lis=['harvester','upgrader','builder','carrier','defender','picker','repairer'];
Spawn.prototype.construct=function(struct){
  for(let eve of this.memory.constructList){
        if(eve[0]==struct[0] && eve[1]==struct[1] && eve[2]==struct[2]){
            console.log('repeat build');
            return this.memory.constructList.length;
        }
    }    
    this.memory.constructList.push(struct);
    return this.memory.constructList.length;
}
Spawn.prototype.runMod=function () {
        if(!this.memory.mod){
            this.memory.mod=0;
        }
        mod_lis[this.memory.mod].run(this);
    };

Spawn.prototype.work = function() {
    while(1){
        if(!Game.creeps[this.memory.renew_lis[0]]){
            this.memory.renew_lis.splice(0,1);
        }
        else{
            break;
        }
        if(this.memory.renew_lis.length==0){
            break;
        }
    }
    if(this.memory.renew_lis.length>0){
        Game.creeps[this.memory.renew_lis[0]].memory.renewing=1;        
    }
    if (!(!this.memory.constructList || this.memory.constructList.length == 0)){
        for(var jj=0;jj<this.memory.constructList.length;jj++){
            var things=this.room.lookAt(this.memory.constructList[jj][0],this.memory.constructList[jj][1]);
            for(var tem=0;tem<things.length;tem++){
                if((things[tem]['type']=='structure' && things[tem]['structure'].structureType==this.memory.constructList[jj][2])
                ||(things[tem]['type']=='constructionSite' && things[tem]['constructionSite'].structureType==this.memory.constructList[jj][2])){
                    this.memory.constructList.splice(jj,1);
                    jj-=1;
                    break;
                }
            }
            if(jj<0){
                break;
            }
            var constructSuccess=this.room.createConstructionSite(this.memory.constructList[jj][0],this.memory.constructList[jj][1],this.memory.constructList[jj][2]);
            if(constructSuccess==ERR_FULL){
                break;
            }
        }
    }
    if(!this.memory.spawnList || this.memory.spawnList.length==0){
        this.memory.urgent_produce=0;
    }
    if (!(this.spawning || !this.memory.spawnList || this.memory.spawnList.length == 0)){
        var labi=0;
        var now=0;
        for(var i=0;i<this.memory.spawnList.length;i++){
            if(this.memory.capacity_lv>=this.memory.spawnList[i][0][1]){
                labi=1;
                break;
            }
            now+=1;
        }
        if(labi==1){
            //console.log('try to spawn  ',this.memory.spawnList[now]);
            const spawnSuccess = this.mainSpawn(this.memory.spawnList[now]);
            if(spawnSuccess==0){
                this.memory.spawnList.splice(now,1);
            }
        }
        else{
            this.memory.urgent_produce=0;
        }

    }
}
Spawn.prototype.addTask = function(task) { 
    this.memory.spawnList.push([task,0]);
    return this.memory.spawnList.length;
}
Spawn.prototype.addUrgentTask = function(task) {
    this.memory.spawnList.splice(0, 0,[task,1]);
    return this.memory.spawnList.length;
}
Spawn.prototype.mainSpawn = function(task_urgency) {
    var task=task_urgency[0];
    var agency=task_urgency[1];
    this.memory.urgent_produce=agency;
    var Name = role_name_lis[task[0]]+'_lv'+task[1]+'_'+ Game.time;
    var Body=creepConfigs[task[1]-1][task[0]];
    if(task[0]==0){
        var spawnSuccess=this.spawnCreep(Body, Name, {memory: {role: task[0],lv: task[1],mother: this.name,site1: task[2],site2: task[3], harvesting: true,reborn:1} });   
    }
    if(task[0]==1){
        var spawnSuccess=this.spawnCreep(Body, Name, {memory: {role: task[0],lv: task[1],mother: this.name,carrying: false} });                
    }
    if(task[0]==2){
        var spawnSuccess=this.spawnCreep(Body, Name, {memory: {role: task[0],lv: task[1],mother: this.name,building: false} });                
    }
    if(task[0]==3){
        var spawnSuccess=this.spawnCreep(Body, Name, {memory: {role: task[0],lv: task[1],mother: this.name,site1: task[2],carrying: false,reborn:1} }); 
    }
    if(task[0]==5){
        var spawnSuccess=this.spawnCreep(Body, Name, {memory: {role: task[0],lv: task[1],mother: this.name} }); 
    }
    if(task[0]==6){
        var spawnSuccess=this.spawnCreep(Body, Name, {memory: {role: task[0],lv: task[1],mother: this.name,repairing: false,repair_site:[-1,-1]} }); 
    }
    if(this.spawning){
        this.memory.urgent_produce=1;
    }
    return spawnSuccess;
}