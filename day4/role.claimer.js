var roleClaimer = {
    run: function(creep) {
        if (creep.room.name != creep.memory.target_room) {
            if(creep.memory.danger_tun!=1){
                var exit = creep.room.findExitTo(creep.memory.target_room);
              creep.moveTo(creep.pos.findClosestByRange(exit));                
            }
        }
        else {
            if (creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
    }
};
module.exports = roleClaimer;