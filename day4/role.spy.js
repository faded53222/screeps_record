var roleSpy = {
    run: function(creep) {
        if (creep.room.name != creep.memory.target) {
            var exit = creep.room.findExitTo(creep.memory.target);
            creep.moveTo(creep.pos.findClosestByRange(exit));
        }
        if(!Memory.room_information){
             Memory.room_information={}; 
        }
        if(!Memory.room_information.hasOwnProperty(creep.room.name)){
            Memory.room_information[creep.room.name]={}
        }
        var sources = creep.room.find(FIND_SOURCES);
        Memory.room_information[creep.room.name]['controller']=creep.room.controller;
        Memory.room_information[creep.room.name]['sources']=creep.room.find(FIND_SOURCES);
        Memory.room_information[creep.room.name]['hostile_creeps']=creep.room.find(FIND_HOSTILE_CREEPS);
        creep.suicide();
    }
};
module.exports=roleSpy;