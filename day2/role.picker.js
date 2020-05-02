var rolePicker = {
    run: function(creep) {
        var target = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
        if(target!=null && target.energy>=20 && creep.store.getFreeCapacity()>100) {
            if(creep.pickup(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }
        else{
            if(creep.store[RESOURCE_ENERGY]>0){
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
                 creep.moveTo(Game.spawns[creep.memory.mother].pos.x-4,Game.spawns[creep.memory.mother].pos.y);
            }
        }
    }
};
module.exports = rolePicker;