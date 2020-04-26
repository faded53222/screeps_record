var modDevelop = {
    run: function(spawn) {
        if(spawn.memory.lv==1){
            spawn.memory.lv+=1;
            var sources = spawn.room.find(FIND_SOURCES);
            for(let each of sources){
                for(var j=0;j<2;j++){
                    spawn.addTask( [0,1,[each.pos.x,each.pos.y]] );
                }
            }
            //for(var i=1;i<3;i++){
            //    for(var j=0;j<3;j++){
            //        spawn.addTask([i,1]);
            //    }
            }
        //spawn.room.createConstructionSite(); 
        spawn.work();
    }
};
module.exports = modDevelop;