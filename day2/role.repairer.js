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
                });
	            targets.sort((a,b) => a.hits - b.hits);
	            if(targets.length > 0) {
	                creep.memory.repair_site=[targets[0].pos.x,targets[0].pos.y,targets[0].structureType];
                if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
	            }
	        }
	    }
	    else {
            if(Game.spawns[creep.memory.mother].memory.urgent_produce==1 || Game.spawns[creep.memory.mother].memory.renewing==1){
                var target = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                    filter: (s) => (s.structureType == STRUCTURE_STORAGE
                                 || s.structureType == STRUCTURE_CONTAINER)
                                 && s.energy > 0
                });  
                if(creep.withdraw(target,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                } 
            }
            else{
                var target = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                    filter: (s) => (s.structureType == STRUCTURE_STORAGE
                                 || s.structureType == STRUCTURE_SPAWN
                                 || s.structureType == STRUCTURE_EXTENSION
                                 || s.structureType == STRUCTURE_CONTAINER)
                                 && s.energy > 0
                });
                if(creep.withdraw(target,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                } 
            }
	    }
    }
};
module.exports = roleRepairer;