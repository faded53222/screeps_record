var roleCarrier = {
    run: function(creep) {
        if(creep.memory.carrying && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.carrying = false;
	    }
	    if(!creep.memory.carrying && creep.store.getFreeCapacity() == 0) {
	        creep.memory.carrying = true;
	    }
	    if(creep.memory.carrying) {
	        if(Game.spawns[creep.memory.mother].memory.urgent_produce==1 || Game.spawns[creep.memory.mother].memory.renewing==1){
                var target = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                    filter: (s) => (s.structureType == STRUCTURE_SPAWN
                                 || s.structureType == STRUCTURE_EXTENSION)
                                 && s.energy < s.energyCapacity
                });	            
                if(creep.transfer(target,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
	        }
	        else{
	            var lab1=0;
	            var target;
                var towers = _.filter(Game.structures, s => s.structureType == STRUCTURE_TOWER);
                for (let tower of towers) {
                    if(tower.store[RESOURCE_ENERGY]<500){
                        target=tower;
                        lab1=1;
                        break;
                    }
                }
                if(lab1==0){
                    target = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                    filter: (s) => (s.structureType == STRUCTURE_SPAWN
                                 || s.structureType == STRUCTURE_EXTENSION)
                                 && s.energy < s.energyCapacity
                    });                    
                   if(target!=null){
                     if(creep.transfer(target,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                         creep.moveTo(target);
                    }                    
                }
                else{
    	            for(const resourceType in creep.carry) {
                        creep.transfer(creep.room.storage, resourceType);
                    }
                     if(creep.transfer(creep.room.storage,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room.storage);
                    } 	
                    }
	            }
	            else{
                    if(target!=null){
                        if(creep.transfer(target,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                         creep.moveTo(target);
                        }
                    }
	            }
	        }
	    }
        else {
            var things=creep.room.lookAt(creep.memory.site1[0],creep.memory.site1[1]);
            var target;
            for(let thing of things){
                if(thing['type']=='structure' && (thing['structure'].structureType=='container'||thing['structure'].structureType=='link') ){
                    target=thing['structure'];
                    break;
                }
            }
            if(target){
                if(creep.withdraw(target,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.memory.site1[0],creep.memory.site1[1]);
                }                
            }
            else{
                var target = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
                if(target!=null && target.energy>=20) {
                    if(creep.pickup(target) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target);
                    }
                }                
            }

        }
    }
};
module.exports = roleCarrier;