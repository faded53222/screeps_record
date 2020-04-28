const creepConfigs = [[WORK,WORK,CARRY,MOVE], //harvester
                      [WORK,WORK,CARRY,MOVE],//upgrader
                      [WORK,WORK,CARRY,MOVE],//builder
                      [CARRY,CARRY,MOVE],//carrier
                      [WORK,CARRY,MOVE]//defender
                    ];
var role_name_lis=['harvester','upgrader','builder','carrier','defender'];
module.exports = {
    run: function() {
        for(var name in Game.spawns){
            var spawn = Game.spawns[name];
            if(!spawn.memory.lv){
                spawn.memory.lv=1;
                spawn.memory.mod=0;
                spawn.memory.spawnList=[];
            }
        }
        Spawn.prototype.work = function() {
            if (this.spawning || !this.memory.spawnList || this.memory.spawnList.length == 0){
                return;
            }
            const spawnSuccess = this.mainSpawn(this.memory.spawnList[0]);
            if(spawnSuccess==0){
                this.memory.spawnList.shift();
            }
        }
        Spawn.prototype.addTask = function(task) { 
            this.memory.spawnList.push([task,0]);
            return this.memory.spawnList.length;
        }
        Spawn.prototype.addUrgentTask = function(task) {        
            this.memory.urgent_produce=1;
            this.memory.spawnList.splice(0, 0,[task,1]);
            return this.memory.spawnList.length;
        }
        Spawn.prototype.mainSpawn = function(task_urgency) {
            var task=task_urgency[0];
            var agency=task_urgency[1];
            var Name = role_name_lis[task[0]]+'_lv'+task[1]+'_'+ Game.time;
            var Body=[];
            for (var i=0;i<task[1];i++){
                Body.push.apply(Body,creepConfigs[task[0]]);
            }
            if(task[0]==0){
                var spawnSuccess=this.spawnCreep(Body, Name, {memory: {role: task[0],lv: task[1],mother: this.name,site1: task[2],site2: task[3], harvesting: true} });   
            }
            if(task[0]==2){
                var spawnSuccess=this.spawnCreep(Body, Name, {memory: {role: task[0],lv: task[1],mother: this.name,building: false} });                
            }
            if(task[0]==3){
                var spawnSuccess=this.spawnCreep(Body, Name, {memory: {role: task[0],lv: task[1],mother: this.name,site1: task[2],site2: task[3], carrying: false} }); 
            }

            if(spawnSuccess==0){
                if(agency==1){
                    this.memory.urgent_produce=0;
                }
                if(task[0]==0){
                    this.memory.sources_work[[task[2][0],task[2][1]]]+=1;
                }
            }
            return spawnSuccess;

        }
    }
};