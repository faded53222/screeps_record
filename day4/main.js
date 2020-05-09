require('prototype.creep');
require('prototype.spawn');
require('prototype.tower');
module.exports.loop = function () {
    for(var name in Game.spawns){
        //console.log(Game.spawns[name].memory.constructList);
        console.log(Game.spawns[name].memory.spawnList);
        //console.log(Game.spawns[name].memory.urgent_produce);
        //console.log(Game.spawns[name].memory.renew_lis);
        //console.log(Game.spawns[name].memory.renewing);
        Game.spawns[name].runMod();
        //console.log(Game.spawns[name].room.name);
        //console.log(Game.map.describeExits('E23S34')['3']);
        //console.log(Game.map.describeExits[Game.spawns[name].room]);
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
                    if(deadcreep.target_room==-1){
                        Game.spawns[deadcreep.mother].addUrgentTask([deadcreep.role,deadcreep.lv,deadcreep.site1,deadcreep.site2,deadcreep.site3,deadcreep.target_room]);                        
                    }
                    else{
                        Game.spawns[deadcreep.mother].addTask([deadcreep.role,deadcreep.lv,deadcreep.site1,deadcreep.site2,deadcreep.site3,deadcreep.target_room]);   
                    }
            
                }
                else if(deadcreep.role==3){
                    if(deadcreep.target_room==-1){
                        Game.spawns[deadcreep.mother].addUrgentTask([deadcreep.role,deadcreep.lv,deadcreep.site1,deadcreep.target_room]);      
                    }
                    else{
                        Game.spawns[deadcreep.mother].addUrgentTask([deadcreep.role,deadcreep.lv,deadcreep.site1,deadcreep.target_room]);
                    }
                }
                else if(deadcreep.role==4){
                    Game.spawns[deadcreep.mother].addUrgentTask([deadcreep.role,deadcreep.lv,deadcreep.target_room,deadcreep.target_pos]);
                }
                else if(deadcreep.role==10){
                    Game.spawns[deadcreep.mother].addTask([deadcreep.role,deadcreep.lv,deadcreep.target_room]);
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
    var towers = _.filter(Game.structures, s => s.structureType == STRUCTURE_TOWER);
    for (let tower of towers) {
        tower.runtower();
    }
    var links=_.filter(Game.structures, s => s.structureType == STRUCTURE_LINK);
    var c_link;
    for(let link of links){
        if(link.pos.x==link.room.memory.center_link[0] && link.pos.y==link.room.memory.center_link[1]){
            c_link=link;
            break;
        }
    }
    for(let link of links){
        if(link.pos.x!=link.room.memory.center_link[0] || link.pos.y!=link.room.memory.center_link[1]){
            link.transferEnergy(c_link);
        }
    }
    
}
