require('prototype.creep');
require('prototype.spawn');
require('prototype.tower');
module.exports.loop = function () {
    for(var name in Game.spawns){
        console.log(Game.spawns[name].memory.constructList);
        console.log(Game.spawns[name].memory.spawnList);
        //console.log(Game.spawns[name].memory.urgent_produce);
        //console.log(Game.spawns[name].memory.renew_lis);
        //console.log(Game.spawns[name].memory.renewing);
        Game.spawns[name].runMod();
    }
    for(var name in Memory.creeps){
        if(!Game.creeps[name]){
            var deadcreep=Memory.creeps[name];
            if(typeof(Game.spawns[deadcreep.mother])=='undefined' ){
                delete Memory.creeps[name];
                continue;
            }
            if(deadcreep.reborn!=0){
                if(deadcreep.role==0){
                    Game.spawns[deadcreep.mother].addUrgentTask([deadcreep.role,deadcreep.lv,deadcreep.site1,deadcreep.site2]);
                }
                else if(deadcreep.role==3){
                    Game.spawns[deadcreep.mother].addUrgentTask([deadcreep.role,deadcreep.lv,deadcreep.site1]);
                }
                else if(deadcreep.role==5){
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
