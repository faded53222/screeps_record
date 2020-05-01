require('prototype.creep');
require('prototype.spawn');
require('prototype.tower');
module.exports.loop = function () {
    for(var name in Game.spawns){
        //console.log(Game.spawns[name].memory.spawnList);
        Game.spawns[name].runMod();
    }
    for(var name in Memory.creeps){
        if(!Game.creeps[name]){
            var deadcreep=Memory.creeps[name];
            if(typeof(Game.spawns[deadcreep.mother])=='undefined' ){
                delete Memory.creeps[name];
                continue;
            }
            if(deadcreep.role==0 && deadcreep.reborn==1){
                console.log('reborn');
                Game.spawns[deadcreep.mother].addUrgentTask([deadcreep.role,deadcreep.lv,deadcreep.site1,deadcreep.site2]);
            }
            else if(deadcreep.role==3 && deadcreep.reborn==1){
                Game.spawns[deadcreep.mother].addUrgentTask([deadcreep.role,deadcreep.lv,deadcreep.site1]);
            }            
            else if(deadcreep.lv>=Game.spawns[deadcreep.mother].memory.capacity_lv){
                if(deadcreep.role==1){
                    Game.spawns[deadcreep.mother].addUrgentTask([deadcreep.role,deadcreep.lv]);
                }
                else{
                    Game.spawns[deadcreep.mother].addTask([deadcreep.role,deadcreep.lv]);
                }
            }

            delete Memory.creeps[name];
        }
        else{
            Game.creeps[name].runRole();
        }
    }
}
