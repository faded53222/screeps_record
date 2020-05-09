var roleWarrior = {
    run: function(creep) {
        if (creep.room.name!=creep.memory.target_room) {
            var exit = creep.room.findExitTo(creep.memory.target_room);
            creep.moveTo(creep.pos.findClosestByRange(exit));
        }
        else {
            //var target=_.filter(Game.structures, s => s.structureType == STRUCTURE_TOWER);
            //if(target!=null){
             //   if(creep.attack(target[0])==ERR_NOT_IN_RANGE){
            //        creep.moveTo(target[0]);    
            //    }
            //} 
            
                var target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
                if (target != null) {
                    if(creep.attack(target)==ERR_NOT_IN_RANGE){
                        creep.moveTo(target);    
                    }
                    
                }
                else{
                    var target = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES);
                    if(target!=null){
                        if(creep.attack(target)==ERR_NOT_IN_RANGE){
                            creep.moveTo(target);    
                        }
                    }                
                }
                }
            
    }
};
module.exports = roleWarrior;