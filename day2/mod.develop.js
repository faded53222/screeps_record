var modDevelop = {
    run: function(spawn) {
        if(typeof(spawn.memory.lv)=='undefined' || spawn.memory.lv<0){
            spawn.memory.lv=0;
            spawn.memory.capacity_lv=0;
            spawn.memory.mod=0;
            spawn.memory.spawnList=[];
            spawn.memory.constructList=[];
            spawn.memory.renewing=0;
            spawn.memory.renew_lis=[];
        }
        if(spawn.memory.lv==0){
            spawn.memory.souces_list=[];
            spawn.memory.sources={};
            spawn.memory.urgent_produce=0;
            spawn.memory.lv+=1;
            spawn.memory.capacity_lv+=1;
            spawn.memory.harvest_pos=[];
            for(let i of [-1,0,1]){
                for(let j of [-1,0,1]){
                    if(i==0 && j==0){
                        continue;
                    }
                var things=spawn.room.lookAt(spawn.pos.x+i,spawn.pos.y+j);
                for(var tem=0;tem<things.length;tem++){
                    if(things[tem]['type']=='creep'){
                        things.splice(tem,1);
                        tem-=1;
                    }
                }
                if(things.length==1 && things[0]['type']=='terrain' && things[0]['terrain']!='wall'){
                    spawn.construct([spawn.pos.x+i,spawn.pos.y+j,STRUCTURE_ROAD]);
                }
                }
            }
            var path_0=spawn.pos.findPathTo(spawn.room.controller);
            path_0.pop();
            path_0.pop();
            path_0.pop();
            var p_w=path_0.slice(-1);
            var lis1=[];
            var lis2=[];
            if(p_w[0].x==spawn.room.controller.pos.x){
                lis1=[-1,0,1];
            }
            else{
                lis1=[0,(spawn.room.controller.pos.x-p_w[0].x)/Math.abs(spawn.room.controller.pos.x-p_w[0].x)];
            }
            if(p_w[0].y==spawn.room.controller.pos.y){
                lis2=[-1,0,1];
            }
            else{
                lis2=[0,(spawn.room.controller.pos.y-p_w[0].y)/Math.abs(spawn.room.controller.pos.y-p_w[0].y)];
            }
            for(let i of lis1){
                for(let j of lis2){
                    var things=spawn.room.lookAt(p_w[0].x+i,p_w[0].y+j);
                    if(things.length==1 && things[0]['type']=='terrain' && things[0]['terrain']!='wall'){                    
                        spawn.construct([p_w[0].x+i,p_w[0].y+j,STRUCTURE_ROAD]);
                    }
                }
            } 
            for(let d of path_0){
                spawn.construct([d['x'],d['y'],STRUCTURE_ROAD]);
            }
            var sources = spawn.room.find(FIND_SOURCES);
            for(let each of sources){
                var pos_x=each.pos.x;
                var pos_y=each.pos.y;
                var pos_x2=-1;
                var pos_y2=-1;
                var path_=spawn.pos.findPathTo(each);
                path_.pop();
                for(let d of path_){
                    spawn.construct([d['x'],d['y'],STRUCTURE_ROAD]);
                }
                spawn.memory.souces_list.push([pos_x,pos_y]);
                spawn.memory.sources[[pos_x,pos_y]]=0;
                var a_s=[];
                for(let i of [-1,0,1]){
                    for(let j of [-1,0,1]){
                        var things=spawn.room.lookAt(pos_x+i,pos_y+j);
                        for(var tem=0;tem<things.length;tem++){
                            if(things[tem]['type']=='creep'){
                                things.splice(tem,1);
                                tem-=1;
                            }
                        }
                        if(things.length==1 && things[0]['type']=='terrain' && things[0]['terrain']!='wall'){
                            spawn.memory.sources[[pos_x,pos_y]]+=1;
                            a_s.push([pos_x+i,pos_y+j]);
                        }
                    }
                }
                var min_dist=100000;
                var min_keep=[0,0];
                for(let g of a_s){
                    var dist=Math.abs(g[0]-spawn.pos.x)+Math.abs(g[1]-spawn.pos.y);
                    if(dist<min_dist){
                        min_dist=dist;
                        min_keep=g;
                    }
                }
                var min_pos=new RoomPosition(min_keep[0],min_keep[1],spawn.room.name);
                spawn.memory.harvest_pos.push([min_keep[0],min_keep[1]]);
                spawn.construct([min_keep[0],min_keep[1],STRUCTURE_ROAD]);
                for(let g of a_s){
                    if(g!=min_keep){
                        var g_pos=new RoomPosition(g[0],g[1],spawn.room.name);
                        var path_2=min_pos.findPathTo(g_pos);
                        for(let d2 of path_2){
                            spawn.construct([d2['x'],d2['y'],STRUCTURE_ROAD]);
                            }
                    }
                }
                for(var i=0;i<spawn.memory.sources[[pos_x,pos_y]];i++){
                    spawn.addTask([0,1,[pos_x,pos_y],[pos_x2,pos_y2]]);
                }
            }
            spawn.addTask([1,1]);
             for(var j=0;j<4;j++){
                spawn.addTask([2,1]);
             }
             spawn.addTask([5,1]);
             spawn.addTask([6,1]); 
        }
        if(spawn.memory.lv==1 && spawn.room.controller.level==2){
            spawn.memory.lv+=1;
            spawn.memory.building_container=1;
            var ln=0;
            var max_num=5;
            while(1){
                for(var j=2;;j+=1){
                    for(let x0 of [spawn.pos.x-j,spawn.pos.x+j]){
                        for(var y0=spawn.pos.y-j;y0<=spawn.pos.y+j;y0+=2){
                            var things=spawn.room.lookAt(x0,y0);
                            for(var tem=0;tem<things.length;tem++){
                                if(things[tem]['type']=='creep'){
                                    things.splice(tem,1);
                                    tem-=1;
                                }
                            }
                            if(things.length==1 && things[0]['type']=='terrain' && things[0]['terrain']!='wall'){
                                spawn.construct([x0,y0,STRUCTURE_EXTENSION]);
                                for(let tx of [-1,0,1]){
                                    for(let ty of [-1,0,1]){
                                        var tv=Math.abs(tx)+Math.abs(ty);
                                        if(!(tv==2 || tv==0)){
                                            var things=spawn.room.lookAt(x0+tx,y0+ty);
                                            for(var tem=0;tem<things.length;tem++){
                                                if(things[tem]['type']=='creep'){
                                                    things.splice(tem,1);
                                                    tem-=1;
                                                }
                                            }
                                            if(things.length==1 && things[0]['type']=='terrain' && things[0]['terrain']!='wall'){
                                               spawn.construct([x0+tx,y0+ty,STRUCTURE_ROAD]); 
                                            }
                                        }
                                    }
                                }
                                ln+=1;
                                if(ln==max_num){
                                    break;
                                }
                            }
                        }
                        if(ln==max_num){
                            break;
                        }
                    }
                    if(ln==max_num){
                        break;
                    }
                    for(let y0 of [spawn.pos.y-j,spawn.pos.y+j]){
                        for(var x0=spawn.pos.x-j+2;x0<=spawn.pos.x+j-2;x0+=2){
                            var things=spawn.room.lookAt(x0,y0);
                            for(var tem=0;tem<things.length;tem++){
                                if(things[tem]['type']=='creep'){
                                    things.splice(tem,1);
                                    tem-=1;
                                }
                            }
                            if(things.length==1 && things[0]['type']=='terrain' && things[0]['terrain']!='wall'){
                                spawn.construct([x0,y0,STRUCTURE_EXTENSION]);
                                for(let tx of [-1,0,1]){
                                    for(let ty of [-1,0,1]){
                                        var tv=Math.abs(tx)+Math.abs(ty);
                                        if(!(tv==2 || tv==0)){
                                        var things=spawn.room.lookAt(x0+tx,y0+ty);
                                        for(var tem=0;tem<things.length;tem++){
                                            if(things[tem]['type']=='creep'){
                                                things.splice(tem,1);
                                                tem-=1;
                                            }
                                        }
                                        if(things.length==1 && things[0]['type']=='terrain' && things[0]['terrain']!='wall'){
                                           spawn.construct([x0+tx,y0+ty,STRUCTURE_ROAD]); 
                                        }
                                        }
                                    }
                                }
                                ln+=1;
                                if(ln==max_num){
                                    break;
                                }
                            }
                        }
                        if(ln==max_num){
                            break;
                        }
                    }
                if(ln==max_num){
                    break;
                }
                }
                if(ln==max_num){
                    break;
                }
            }
        }
        if(spawn.memory.lv==2){
            if(spawn.memory.capacity_lv==1 && spawn.room.energyCapacityAvailable>=550){
                spawn.memory.capacity_lv+=1;
                spawn.addTask([1,2]);
                spawn.addTask([5,2]);
                spawn.addTask([6,2]);
                for(var jj=0;jj<2;jj++){
                    spawn.addTask([2,2]);
                }
                for(var ev=0;ev<spawn.memory.spawnList.length;ev++){
                    if(spawn.memory.spawnList[ev][0][1]==1 && spawn.memory.spawnList[ev][0][0]!=0){
                        spawn.memory.spawnList.splice(ev,1);
                        ev-=1;
                    }
                }
                for(var name in Game.creeps){
                    if(Game.creeps[name].memory.lv==1 && Game.creeps[name].memory.role!=0 && Game.creeps[name].memory.role!=5){
                        Game.creeps[name].Recycle();
                    }
                }
            }
            if(spawn.memory.building_container==1){
                var lab2=0;
                for(var c=0;c<spawn.memory.harvest_pos.length;c++){
                    var lab=0;
                    var lab0=0;
                    var each=spawn.memory.harvest_pos[c];
                    var things=spawn.room.lookAt(each[0],each[1]);
                    for(let eve of spawn.memory.constructList){
                        if(eve[0]==each[0] && eve[1]==each[1] && eve[2]=='container'){
                            lab0=1;
                            break;
                        }
                    }
                    if(lab0==0){
                        for(let one of things){
                            if(one['type']=='structure' && one['structure'].structureType=='container'){
                                lab=1;
                                break;
                            }
                            if(one['type']=='constructionSite' && one['constructionSite'].structureType=='container'){
                                lab0=1;
                                break;
                            }
                        }
                    }
                    if(lab0==1){
                        lab2=1;
                        break;
                    }
                    if(lab==0){
                        lab2=1;
                        spawn.construct([each[0],each[1],STRUCTURE_CONTAINER]);
                        if(c!=0){
                            spawn.addUrgentTask([3,2,[spawn.memory.harvest_pos[c-1][0],spawn.memory.harvest_pos[c-1][1]]]);
                            spawn.addUrgentTask([0,2,[spawn.memory.sources_list[c-1][0],spawn.memory.sources_list[c-1][1]],[spawn.memory.harvest_pos[c-1][0],spawn.memory.harvest_pos[c-1][1]]]);
                             for(var name in Game.creeps){          
                                if(Game.creeps[name].memory.role==0){
                                    if(Game.creeps[name].memory.site1[0]==Game.spawns[Game.creeps[name].memory.mother].memory.sources_list[c-1][0]
                                      && Game.creeps[name].memory.site1[1]==Game.spawns[Game.creeps[name].memory.mother].memory.sources_list[c-1][1]){
                                        Game.creeps[name].Recycle();
                                    }
                                    }
                                }
                        for(var ev=0;ev<spawn.memory.spawnList.length;ev++){
                            if(spawn.memory.spawnList[ev][0][1]==1 && spawn.memory.spawnList[ev][0][0]==0 &&
                            spawn.memory.spawnList[ev][0][3][0]==spawn.memory.harvest_pos[c-1][0]&&
                            spawn.memory.spawnList[ev][0][3][1]==spawn.memory.harvest_pos[c-1][1]){
                                spawn.memory.spawnList.splice(ev,1);
                                ev-=1;
                            }
                        }
                        }
                        break;
                    }
                }
                if(lab2==0){
                    var c=spawn.memory.harvest_pos.length;
                    spawn.addUrgentTask([3,2,[spawn.memory.harvest_pos[c-1][0],spawn.memory.harvest_pos[c-1][1]]]);
                    spawn.addUrgentTask([0,2,[spawn.memory.sources_list[c-1][0],spawn.memory.sources_list[c-1][1]],[spawn.memory.harvest_pos[c-1][0],spawn.memory.harvest_pos[c-1][1]]]);
                     for(var name in Game.creeps){          
                        if(Game.creeps[name].memory.role==0){
                            if(Game.creeps[name].memory.site1[0]==Game.spawns[Game.creeps[name].memory.mother].memory.sources_list[c-1][0]
                              && Game.creeps[name].memory.site1[1]==Game.spawns[Game.creeps[name].memory.mother].memory.sources_list[c-1][1]){
                                Game.creeps[name].Recycle();
                            }
                            }
                        }
                    for(var ev=0;ev<spawn.memory.spawnList.length;ev++){
                        if(spawn.memory.spawnList[ev][0][1]==1 && spawn.memory.spawnList[ev][0][0]==0 &&
                        spawn.memory.spawnList[ev][0][3][0]==spawn.memory.harvest_pos[c-1][0]&&
                        spawn.memory.spawnList[ev][0][3][1]==spawn.memory.harvest_pos[c-1][1]){
                            spawn.memory.spawnList.splice(ev,1);
                            ev-=1;
                        }
                    }
                    spawn.memory.building_container=0;
                }
                }
            }
        spawn.work();
    }
};
module.exports = modDevelop;