var roleHarvester = {
    run: function(creep) {
        if(!creep.memory.harvesting && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.harvesting = true;
	    }
	    if(creep.memory.harvesting && creep.store.getFreeCapacity() == 0 && creep.store[RESOURCE_ENERGY]!=0) {
	        creep.memory.harvesting = false;
	    }
	    if(creep.memory.harvesting) {
            var things=creep.room.lookAt(creep.memory.site1[0],creep.memory.site1[1]);
            var target;
            for(let thing of things){
                if(thing['type']=='source'){
                    target=thing['source'];
                    break;
                }
            }
            if(creep.memory.site2[0]!=-1 && !(creep.pos.x==creep.memory.site2[0]&&creep.pos.y==creep.memory.site2[1])){
                creep.moveTo(creep.memory.site2[0],creep.memory.site2[1]);
            }
            if(creep.harvest(target) == ERR_NOT_IN_RANGE) {
                if(creep.memory.site2[0]==-1){
                    creep.moveTo(creep.memory.site1[0],creep.memory.site1[1]);                    
                }
            }
        }
        else{
            if(creep.memory.site3[0]!=-1){
                var target;
                var things=creep.room.lookAt(creep.memory.site3[0],creep.memory.site3[1]);
                for(var tem=0;tem<things.length;tem++){
                    if(things[tem]['type']=='structure'&& things[tem]['structure'].structureType==STRUCTURE_LINK){
                        target=things[tem]['structure'];
                        break;
                    }
                }
                if(creep.transfer(target,RESOURCE_ENERGY)==ERR_NOT_IN_RANGE){
                    creep.moveTo(target);
                }
                if(creep.transfer(target,RESOURCE_ENERGY)==ERR_FULL){
                    var targets = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_CONTAINER) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                        }
                    });
                    if(targets.length > 0) {
                        if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(targets[0]);
                        }
                    }                
                }   
            }
            else{
                var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_CONTAINER) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
                });
                if(targets.length > 0) {
                    if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0]);
                    }
                }                
            }
        }
    }
};

module.exports = roleHarvester;