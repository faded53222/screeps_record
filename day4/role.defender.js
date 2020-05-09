var roleDefender= {
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
            if(each.memory.target_pos.x==creep.memory.target_pos.x && each.memory.target_pos.y==creep.memory.target_pos.y 
            && each.memory.target_room==creep.memory.target_room && !each.spawning){
                counti+=1;
            }
        }
        if(counti>=2 && creep.room.name!=creep.memory.target_room &&  Game.spawns[creep.memory.mother].room.memory.danger_run==0){
            var exit = creep.room.findExitTo(creep.memory.target_room);
            creep.moveTo(creep.pos.findClosestByRange(exit));
        }
        else if(creep.room.name==creep.memory.target_room){
            const targets = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 10);
            if(targets.length > 0) {
                if(targets[0].body.length>0){
                    creep.memory.battle=1;
                    if(creep.attack(targets[0])==ERR_NOT_IN_RANGE){
                       creep.moveTo(targets[0]);   
                    } 
                }
            }
            else{
                if(creep.memory.battle==1){
                    creep.memory.battle=0;
                    creep.renew();
                    return;
                }
                else{
                    var t_pos=new RoomPosition(creep.memory.target_pos[0],creep.memory.target_pos[1],creep.memory.target_room);
                    creep.moveTo(t_pos);                    
                }
            } 
        }
        else{
            creep.moveTo(Game.spawns[creep.memory.mother])
        }
    }
};
module.exports = roleDefender;