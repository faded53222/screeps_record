var biuld_priority_lis=[STRUCTURE_SPAWN,STRUCTURE_WALL,STRUCTURE_RAMPART,STRUCTURE_LINK,STRUCTURE_EXTENSION,STRUCTURE_ROAD,STRUCTURE_TOWER,STRUCTURE_CONTAINER,STRUCTURE_STORAGE];
var roleRepairer = {
    run: function(creep) {
	    if(creep.memory.repairing && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.repairing = false;
	    }
	    if(!creep.memory.repairing && creep.store.getFreeCapacity() == 0) {
	        creep.memory.repairing = true;
	    }
	    if(creep.memory.repairing) {
	        var labi=0;
	        if(creep.memory.repair_site[0]==-1){
	            labi=1;
	        }
	        else{
	           var target;
               var things=creep.room.lookAt(creep.memory.repair_site[0],creep.memory.repair_site[1]);	           
               for(var tem=0;tem<things.length;tem++){
                    if(things[tem]['type']=='structure' && things[tem]['structure'].structureType==creep.memory.repair_site[2]){
                        target=things[tem]['structure'];
                        if(target.hits==target.hitsMax){
                            labi=1;
                        }
                        break;
                    }
               }
               if(labi==0){
                    if(creep.repair(target) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target);
                    }                   
               }
	        }
	        if(labi==1){
                var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: object => object.hits < object.hitsMax
                    && object.structureType!=STRUCTURE_WALL
                    && object.structureType!=STRUCTURE_RAMPART
                });
	            targets.sort((a,b) =>a.hits - b.hits);
	            if(targets.length > 0) {
    	            creep.memory.repair_site=[targets[0].pos.x,targets[0].pos.y,targets[0].structureType];
                    if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0]);
                    }
	            }
	            else{
                    var target;
                    for(let pr of biuld_priority_lis){
                         target = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES, {
                            filter: (s) => (s.structureType == pr)
                        });
                        if(target!=null){
                            break;
                        }
                    }
                    if(target!=null) {
                        if(creep.build(target) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(target);
                        }
                    } 
                    else{
                        if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(creep.room.controller);
                        }
                    }	                
	            }
	        }
	    }
	    else {
            if(Game.spawns[creep.memory.mother].memory.urgent_produce==1 || Game.spawns[creep.memory.mother].memory.renewing==1
            ||(Game.spawns[creep.memory.mother].memory.lv>=3 && creep.room.storage) ){
                var target =creep.room.storage;                 
                if(creep.withdraw(target,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                } 
            }
            else{
                var target = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                    filter: (s) => (s.structureType == STRUCTURE_SPAWN
                                 || s.structureType == STRUCTURE_EXTENSION)
                                 && s.energy > 10
                });
                if(creep.withdraw(target,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                } 
            }
	    }
    }
};
module.exports = roleRepairer;