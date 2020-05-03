var rolePicker = {
    run: function(creep) {
        if(creep.memory.picking && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.picking = false;
	    }
	    if(!creep.memory.picking && creep.store.getFreeCapacity() == 0) {
	        creep.memory.picking = true;
	    }
	    if(creep.memory.picking) {
	        var target;
	        if(Game.spawns[creep.memory.mother].memory.urgent_produce==1 || Game.spawns[creep.memory.mother].memory.renewing==1){
                target = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                filter: (s) => (s.structureType == STRUCTURE_SPAWN
                             || s.structureType == STRUCTURE_EXTENSION)
                             && s.energy < s.energyCapacity
                });                    
	        }
	        else{
                var lab1=0;
                var towers = _.filter(Game.structures, s => s.structureType == STRUCTURE_TOWER);
                    for (let tower of towers) {
                        if(tower.store<500){
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
                }
	        }
            if(creep.transfer(target,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
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
};
module.exports = rolePicker;