var modDevelop = {
    run: function(spawn) {
        if(spawn.memory.lv==1){
            spawn.memory.sources={};
            spawn.memory.sources_work={};
            spawn.memory.sources_carry={};
            spawn.memory.urgent_produce=0;
            spawn.memory.lv+=1;
            var sources = spawn.room.find(FIND_SOURCES);
            for(let each of sources){
                var pos_x=each.pos.x;
                /**/
                if(pos_x==6){
                    continue;
                }
                var pos_y=each.pos.y;
                var pos_x2=0;
                var pos_y2=0;
                var lab=0;
                spawn.memory.sources[[pos_x,pos_y]]=0;
                spawn.memory.sources_work[[pos_x,pos_y]]=0;
                spawn.memory.sources_carry[[pos_x,pos_y]]=0;
                for(let i of [-1,0,1]){
                    for(let j of [-1,0,1]){
                        var things=spawn.room.lookAt(pos_x+i,pos_y+j);
                        if(things.length==1 && things[0]['type']=='terrain' && things[0]['terrain']!='wall'){
                            spawn.memory.sources[[pos_x,pos_y]]+=1;
                            if(lab==0){
                                lab=1;
                                pos_x2=pos_x+i;
                                pos_y2=pos_y+j;
                                spawn.room.createConstructionSite(pos_x2,pos_y2,STRUCTURE_CONTAINER);     
                            }
                        }
                    }
                }
                for(var i=0;i<spawn.memory.sources[[pos_x,pos_y]];i++){
                    spawn.addTask([0,1,[pos_x,pos_y],[pos_x2,pos_y2]]);
                }
            }
             for(var j=0;j<5;j++){
                spawn.addTask([2,1]);
             }
        }
        spawn.work();
        
    }
};
module.exports = modDevelop;