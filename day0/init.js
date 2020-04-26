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
            this.memory.spawnList.push(task);
            return this.memory.spawnList.length;

            
        }
        Spawn.prototype.mainSpawn = function(task) {
            var Name = role_name_lis[task[0]]+'_lv'+task[1]+'_'+ Game.time;
            var Body=[];
            for (var i=0;i<task[1];i++){
                Body.push.apply(Body,creepConfigs[task[0]]);
            }
            if(task[0]==0){
                return this.spawnCreep(Body, Name, {memory: {role: task[0],lv: task[1],mother: this.name,site: task[2] } });                
            }
            else{
                return this.spawnCreep(Body, Name, {memory: {role: task[0],lv: task[1],mother: this.name} });                
            }

        }
    }
};