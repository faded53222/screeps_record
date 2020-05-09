var roleReserver = {
    run: function(creep) {
      if(creep.room.name!=Game.spawns[creep.memory.mother].room.name){
            const targets0 = creep.room.find(FIND_HOSTILE_CREEPS);
            for(let eh of targets0){
                if(eh.owner.username=='Invader'){
                    if(Game.spawns[creep.memory.mother].room.memory.danger_run==0){
                       Game.spawns[creep.memory.mother].room.memory.run_time=Game.time;
                        Game.spawns[creep.memory.mother].room.memory.danger_run=1;
                    }
                    creep.renew();
                    return;
                }
            }
        }
        var defenders = _.filter(Game.creeps, s => s.memory.role == 4);
        var counti=0;
        for(let each of defenders){
            if(!each.spawning){
                counti+=1;
            }
        }
        if (creep.room.name != creep.memory.target_room) {
            if(counti>=2 &&  Game.spawns[creep.memory.mother].room.memory.danger_run==0){
                var exit = creep.room.findExitTo(creep.memory.target_room);
                creep.moveTo(creep.pos.findClosestByRange(exit));                
            }
            else{
                creep.moveTo(30,15);
            }

        }
        else {
            if (creep.reserveController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
    }
};
module.exports = roleReserver;