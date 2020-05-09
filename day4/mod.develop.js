function build_near(spawn,posi,max_num,b_thing,away){
    var ln=0;
    var b_lis=[];
    while(1){
        for(var j=away;;j+=1){
            for(let x0 of [posi[0]-j,posi[0]+j]){
                for(var y0=posi[1]-j;y0<=posi[1]+j;y0+=2){
                    var labj=0;
                    for(let con of spawn.memory.constructList){
                        if(con[0]==x0 && con[1]==y0){
                            labj=1;
                            break;
                        }
                    }
                    if(labj==1){
                        continue;
                    }
                    var things=spawn.room.lookAt(x0,y0);
                    for(var tem=0;tem<things.length;tem++){
                        if(things[tem]['type']=='creep'){
                            things.splice(tem,1);
                            tem-=1;
                        }
                    }
                    if(things.length==1 && things[0]['type']=='terrain' && things[0]['terrain']!='wall'){
                        spawn.construct([x0,y0,b_thing]);
                        b_lis.push([x0,y0]);
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
            for(let y0 of [posi[1]-j,posi[1]+j]){
                for(var x0=posi[0]-j+2;x0<=posi[0]+j-2;x0+=2){
                    var labj=0;
                    for(let con of spawn.memory.constructList){
                        if(con[0]==x0 && con[1]==y0){
                            labj=1;
                            break;
                        }
                    }
                    if(labj==1){
                        continue;
                    }
                    var things=spawn.room.lookAt(x0,y0);
                    for(var tem=0;tem<things.length;tem++){
                        if(things[tem]['type']=='creep'){
                            things.splice(tem,1);
                            tem-=1;
                        }
                    }
                    if(things.length==1 && things[0]['type']=='terrain' && things[0]['terrain']!='wall'){
                        spawn.construct([x0,y0,b_thing]);
                        b_lis.push([x0,y0]);
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
    return b_lis;
}
function build_along_the_way(spawn,start,end,max_num,thing){
    var ln=0;
    var pathi=spawn.room.findPath(start,end,{ignoreCreeps:1});
    for(var i=0;i<pathi.length;i++){
        if(i%2==0){
            continue;
        }
        var dirx=0;
        var diry=1;
        if(pathi[i].x==pathi[i-1].x){
            dirx=1;
            diry=0;
        }
        if(pathi[i].x-pathi[i-1].x==pathi[i].y-pathi[i-1].y){
            dirx=-1;
        }
        if(pathi[i].x-pathi[i-1].x==-pathi[i].y+pathi[i-1].y){
            dirx=1;
        }
        var r_lis=[];
        for(let g of [-1,1,-2,2]){
            var X=pathi[i].x+g*dirx;
            var Y=pathi[i].y+g*diry;
            var labi=0;
            var lab2=0;
            for(let each of spawn.memory.constructList){
                if(each[0]==X && each[1]==Y){
                    if(each[2]!=STRUCTURE_ROAD){
                        labi=1;
                        break;                        
                    }
                }
            }
            if(labi==1){
                continue;
            }
            var things=spawn.room.lookAt(X,Y);            
            for(var tem=0;tem<things.length;tem++){
                if(things[tem]['type']=='creep'){
                    things.splice(tem,1);
                    tem-=1;
                }
                if(things[tem]['type']=='terrain' && things[tem]['terrain']=='wall'){
                    labi=1;
                    break;
                }
                if((things[tem]['type']=='structure' && things[tem]['structure'].structureType==STRUCTURE_ROAD) || (things[tem]['type']=='constructionSite' && things[tem]['constructionSite'].structureType==STRUCTURE_ROAD)){
                    lab2=1;
                }
                if((things[tem]['type']=='structure' && things[tem]['structure'].structureType!=STRUCTURE_ROAD) || (things[tem]['type']=='constructionSite' && things[tem]['constructionSite'].structureType!=STRUCTURE_ROAD)){
                    labi=1;
                    break;
                }                
            }
            if(labi==1){
                continue;
            }
            if(lab2==0){
               spawn.construct([X,Y,STRUCTURE_ROAD]);
            }
            r_lis.push([X,Y]);
        }
        for(let h of r_lis){
            for(let tx of [-1,0,1]){
                for(let ty of [-1,0,1]){
                    var tv=Math.abs(tx)+Math.abs(ty);
                    if(!(tv==2 || tv==0)){
                        var labi=0;
                        for(let each of spawn.memory.constructList){
                            if(each[0]==h[0]+tx && each[1]==h[1]+ty){
                                labi=1;
                                break;
                            }
                        }
                        if(labi==1){
                            continue;
                        }
                        var things=spawn.room.lookAt(h[0]+tx,h[1]+ty);            
                        for(var tem=0;tem<things.length;tem++){
                            if(things[tem]['type']=='creep'){
                                things.splice(tem,1);
                                tem-=1;
                            }
                        }
                        if(things.length==1 && things[0]['type']=='terrain' && things[0]['terrain']!='wall'){
                           spawn.construct([h[0]+tx,h[1]+ty,thing]);
                           ln+=1;
                            if(ln==max_num){
                                return;
                            }
                        }
                    }
                }
            }
        }
    }
}
var modDevelop = {
    run: function(spawn) {
        if(spawn.room.memory.danger_run==1){
            if(Game.time-spawn.room.memory.run_time>=1600){
                spawn.room.memory.danger_run=0;
            }
        }
        if(!spawn.memory.spawnList){
            spawn.memory.spawnList=[];
        }
        if(spawn.memory.spawnList.length==0){
            for(var name in Game.creeps){
                if(Game.creeps[name].memory.lv<spawn.memory.capacity_lv && (Game.creeps[name].memory.role==5)){
                    Game.creeps[name].Recycle();
                }
            }            
        }
        if(typeof(spawn.memory.lv)=='undefined' || spawn.memory.lv<0){
            spawn.memory.lv=0;
            spawn.room.memory.danger_run=0;
            spawn.room.run_time=0;
            spawn.memory.capacity_lv=0;
            spawn.memory.mod=0;
            spawn.memory.spawnList=[];
            if(!spawn.room.memory.emegency){
                spawn.room.memory.emegency=0;
            }
            spawn.memory.constructList=[];
            spawn.memory.renewing=0;
            spawn.memory.renew_lis=[];
            spawn.room.memory.neighbor_room=[];
        }
        if(spawn.memory.lv==0){
            spawn.memory.sources_list=[];
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
                spawn.memory.sources_list.push([pos_x,pos_y]);
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
                    spawn.addTask([0,1,[pos_x,pos_y],[-1,-1],[-1,-1]]);
                }
            }
            spawn.addTask([1,1]);
             for(var j=0;j<4;j++){
                spawn.addTask([2,1]);
             }
             spawn.addTask([5,1]);
             spawn.addTask([6,1]); 
        }
        if(spawn.memory.lv==1 && spawn.room.controller.level>=2){
            spawn.memory.lv+=1;
            spawn.memory.building_container=1;
            build_near(spawn,[spawn.pos.x,spawn.pos.y],5,STRUCTURE_EXTENSION,2);
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
                            spawn.addUrgentTask([0,2,[spawn.memory.sources_list[c-1][0],spawn.memory.sources_list[c-1][1]],[spawn.memory.harvest_pos[c-1][0],spawn.memory.harvest_pos[c-1][1]],[-1,-1]]);
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
                    var c2=spawn.memory.harvest_pos.length;
                    spawn.addUrgentTask([3,2,[spawn.memory.harvest_pos[c2-1][0],spawn.memory.harvest_pos[c2-1][1]]]);
                    spawn.addUrgentTask([0,2,[spawn.memory.sources_list[c2-1][0],spawn.memory.sources_list[c2-1][1]],[spawn.memory.harvest_pos[c2-1][0],spawn.memory.harvest_pos[c2-1][1]]]);
                     for(var name in Game.creeps){          
                        if(Game.creeps[name].memory.role==0){
                            if(Game.creeps[name].memory.site1[0]==Game.spawns[Game.creeps[name].memory.mother].memory.sources_list[c2-1][0]
                              && Game.creeps[name].memory.site1[1]==Game.spawns[Game.creeps[name].memory.mother].memory.sources_list[c2-1][1]){
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
        if(spawn.memory.lv==2 && spawn.room.controller.level>=3 && spawn.memory.building_container==0){
            spawn.memory.lv+=1;
            build_near(spawn,[spawn.pos.x,spawn.pos.y],1,STRUCTURE_TOWER,2)
            build_near(spawn,[spawn.pos.x,spawn.pos.y],5,STRUCTURE_EXTENSION,2);
            for(let w of [FIND_EXIT_TOP,FIND_EXIT_RIGHT,FIND_EXIT_LEFT,FIND_EXIT_BOTTOM]){
                var k_y=-1;
                var k_x=-1;
                if(spawn.pos.findClosestByRange(w)!=null){
                    if(w==FIND_EXIT_TOP || w==FIND_EXIT_BOTTOM){
                        k_y=spawn.pos.findClosestByRange(w).y;
                    }
                    else{
                        k_x=spawn.pos.findClosestByRange(w).x;
                    }
                    if(k_y!=-1){
                        var one=2;
                        if(k_y==49){
                            one=-2;
                        }
                        var temp_con=[];
                        var temp_con2=[];
                        for(var i=0;i<50;i++){
                            var things=spawn.room.lookAt(i,k_y+one);
                            var labg=0;
                           for(let h of things){
                                if(h['type']=='terrain'&&h['terrain']=='wall'){
                                    labg=1;
                                    break;
                                }
                            }
                            if(labg==0){
                               temp_con.push([i,k_y+one,STRUCTURE_WALL]);
                                var things2=spawn.room.lookAt(i,k_y+one/2);
                                var labg2=0;
                               for(let h of things2){
                                    if(h['type']=='terrain'&&h['terrain']=='wall'){
                                        labg2=1;
                                        break;
                                    }
                                }
                                if(labg2==0){
                                    temp_con2.push([i,k_y+one/2,STRUCTURE_ROAD]);
                                }
                            }
                        }
                        var sta=0;
                        var end;
                        for(var vv=1;vv<temp_con.length;vv++){
                            if(temp_con[vv][0]-temp_con[vv-1][0]!=1 || vv==temp_con.length-1){
                                if(vv==temp_con.length-1){
                                    end=vv;
                                }
                                else{
                                    end=vv-1;    
                                }
                                temp_con[Math.round((sta+end)/2)][2]=STRUCTURE_RAMPART;
                                sta=vv;
                            }
                        }
                        for(let each of temp_con){
                            spawn.construct(each);
                            if(each[2]==STRUCTURE_RAMPART){
                                spawn.construct([each[0],each[1],STRUCTURE_ROAD]);
                            }
                        }
                        for(let each of temp_con2){
                            spawn.construct(each);
                        }
                    }
                    else{
                        var one=2;
                        if(k_x==49){
                            one=-2;
                        }
                        var temp_con=[];
                        var temp_con2=[];
                        for(var i=0;i<50;i++){
                            var things=spawn.room.lookAt(k_x+one,i);            
                            var labg=0;
                            for(let h of things){
                                if(h['type']=='terrain'&&h['terrain']=='wall'){
                                    labg=1;
                                    break;
                                }
                            }
                            if(labg==0){
                               temp_con.push([k_x+one,i,STRUCTURE_WALL]);
                                var things2=spawn.room.lookAt(k_x+one/2,i);
                                var labg2=0;
                               for(let h of things2){
                                    if(h['type']=='terrain'&&h['terrain']=='wall'){
                                        labg2=1;
                                        break;
                                    }
                                }
                                if(labg2==0){
                                   temp_con2.push([k_x+one/2,i,STRUCTURE_ROAD]);
                                }
                            }
                        }
                        var sta=0;
                        var end;
                        for(var vv=1;vv<temp_con.length;vv++){
                            if(temp_con[vv][1]-temp_con[vv-1][1]!=1 || vv==temp_con.length-1){
                                if(vv==temp_con.length-1){
                                    end=vv;
                                }
                                else{
                                    end=vv-1;    
                                }
                                temp_con[Math.round((sta+end)/2)][2]=STRUCTURE_RAMPART;
                                sta=vv;
                            }
                        }
                        for(let each of temp_con){
                            spawn.construct(each);
                            if(each[2]==STRUCTURE_RAMPART){
                                spawn.construct([each[0],each[1],STRUCTURE_ROAD]);
                            }
                        }
                        for(let each of temp_con2){
                            spawn.construct(each);
                        }
                    }
                }
            }
        }
        if(spawn.memory.capacity_lv==2 && spawn.room.energyCapacityAvailable>=800){
            spawn.memory.capacity_lv+=1;
            for(var c=0;c<spawn.memory.harvest_pos.length;c++){
               spawn.addUrgentTask([3,3,[spawn.memory.harvest_pos[c][0],spawn.memory.harvest_pos[c][1]]]);
               spawn.addUrgentTask([0,3,[spawn.memory.sources_list[c][0],spawn.memory.sources_list[c][1]],[spawn.memory.harvest_pos[c][0],spawn.memory.harvest_pos[c][1]],[-1,-1]]);  
            }
            spawn.addTask([1,3]);
            spawn.addTask([5,3]);
            for(var jj=0;jj<2;jj++){
                spawn.addTask([2,3]);
            }
            for(var ev=0;ev<spawn.memory.spawnList.length;ev++){
                if(spawn.memory.spawnList[ev][0][1]<3){
                    spawn.memory.spawnList.splice(ev,1);
                    ev-=1;
                }
            }
            for(var name in Game.creeps){
                if(Game.creeps[name].memory.lv==2 && Game.creeps[name].memory.role!=5){
                    Game.creeps[name].Recycle();
                }
            }
        }
        if(spawn.memory.lv==3 && spawn.room.controller.level>=4){
            spawn.memory.lv+=1;
            build_near(spawn,[spawn.pos.x,spawn.pos.y],1,STRUCTURE_STORAGE,2);
            var numi=Math.round(10/spawn.memory.harvest_pos.length);
            var numi2=10-numi*spawn.memory.harvest_pos.length;
            var labo=1;
            for(let eachi of spawn.memory.harvest_pos){
                var pos1=new RoomPosition(eachi[0],eachi[1],spawn.room.name);
                build_along_the_way(spawn,pos1,spawn.pos,numi+labo*numi2,STRUCTURE_EXTENSION);
                labo=0;
            }
            spawn.room.memory.neighbor_room=[];
            for(let i of ['1','3','5','7']){
                if(Game.map.describeExits(spawn.room.name)[i]!=null){
                    spawn.room.memory.neighbor_room.push(Game.map.describeExits(spawn.room.name)[i]);
                    spawn.addTask([8,1,Game.map.describeExits(spawn.room.name)[i]]);
                }
            }
        }
        if(spawn.memory.lv==4 && spawn.room.controller.level>=5){
            spawn.memory.lv+=1;
            spawn.room.memory.center_link=build_near(spawn,[spawn.room.storage.pos.x,spawn.room.storage.pos.y],1,STRUCTURE_LINK,1)[0];
            spawn.memory.links=0;
            build_near(spawn,[spawn.pos.x,spawn.pos.y],1,STRUCTURE_TOWER,2);
            var numi=Math.round(10/spawn.memory.harvest_pos.length);
            var numi2=10-numi*spawn.memory.harvest_pos.length;
            var labo=1;
            for(let eachi of spawn.memory.harvest_pos){
                var pos1=new RoomPosition(eachi[0],eachi[1],spawn.room.name);
                build_along_the_way(spawn,pos1,spawn.pos,numi+labo*numi2,STRUCTURE_EXTENSION);
                labo=0;
            }
            spawn.room.memory.links_list=[];
            for(var h=0;h<spawn.memory.harvest_pos.length;h++){
                spawn.room.memory.links_list.push([-1,-1]);
            }
            if(spawn.memory.links<spawn.memory.harvest_pos.length){
                var pozi=spawn.memory.harvest_pos[spawn.memory.links];
                var labn=0;
                for(let tx of [-1,0,1]){
                    for(let ty of [-1,0,1]){
                        var tv=Math.abs(tx)+Math.abs(ty);
                        if(!(tv==2 || tv==0)){
                            var things=spawn.room.lookAt(pozi[0]+tx,pozi[1]+ty);
                            var labh=0;
                            for(var tem=0;tem<things.length;tem++){
                                if(things[tem]['type']=='creep'){
                                    things.splice(tem,1);
                                    tem-=1;
                                }
                                if(things[tem]['type']=='terrain' && things[tem]['terrain']=='wall'){
                                    labh=1;
                                    break;
                                }
                            }
                            if(labh==1){
                                continue;
                            }
                            if(Math.abs(pozi[0]+tx-spawn.memory.sources_list[spawn.memory.links][0])+Math.abs(pozi[1]+ty-spawn.memory.sources_list[spawn.memory.links][1])==1){
                               spawn.construct([pozi[0]+tx,pozi[1]+ty,STRUCTURE_LINK]);
                               labn=1;
                                spawn.room.memory.links_list[spawn.memory.links]=[pozi[0]+tx,pozi[1]+ty];
                                spawn.memory.links+=1;
                                spawn.addUrgentTask([3,5,[spawn.room.memory.center_link[0],spawn.room.memory.center_link[1]]]);
                                spawn.addUrgentTask([0,5,[spawn.memory.sources_list[spawn.memory.links][0],spawn.memory.sources_list[spawn.memory.links][1]],
                    [spawn.memory.harvest_pos[c][0],spawn.memory.harvest_pos[spawn.memory.links][1]],[spawn.room.memory.links_list[spawn.memory.links][0],spawn.room.memory.links_list[spawn.memory.links][1]]]);  
                           for(var name in Game.creeps){
                                if(Game.creeps[name].memory.lv<5 && 
                                ((Game.creeps[name].memory.role==0 && Game.creeps[name].memory.site1[0]==spawn.memory.sources_list[spawn.memory.links][0] && Game.creeps[name].memory.site1[1]==spawn.memory.sources_list[spawn.memory.links][1])
                                || (Game.creeps[name].memory.role==3 && Game.creeps[name].memory.site1[0]==spawn.memory.harvest_pos[c][0] && Game.creeps[name].memory.site1[0]==spawn.memory.harvest_pos[c][1])  ) ){
                                    Game.creeps[name].Recycle();
                                }
                            } 
                               break;
                            }
                        }
                    }
                if(labn==1){
                    break;
                }
                }
            }
        }
        if(spawn.memory.capacity_lv==3 && spawn.room.energyCapacityAvailable>=1800){
            spawn.memory.capacity_lv=5;
            spawn.addTask([1,5]);
            spawn.addTask([5,5]);
            for(var jj=0;jj<2;jj++){
                spawn.addTask([2,5]);
            }
            for(var ev=0;ev<spawn.memory.spawnList.length;ev++){
                if(spawn.memory.spawnList[ev][0][1]<5){
                    spawn.memory.spawnList.splice(ev,1);
                    ev-=1;
                }
            } 
           for(var name in Game.creeps){
                if(Game.creeps[name].memory.lv==4 && (Game.creeps[name].memory.role==1 || Game.creeps[name].memory.role==2) ){
                    Game.creeps[name].Recycle();
                }
            }
        }
        if(spawn.memory.lv==5){
            spawn.memory.lv+=1;
            for(let each of spawn.room.memory.neighbor_room){
                if(Memory.room_information[each]!=null){
                    if( Memory.room_information[each]['controller']==null){
                        for(let each2 of Memory.room_information[each]['sources']){
                            //var each3=Memory.room_information[each]['sources'][0];
                            var t_pos=new RoomPosition(each2.pos.x,each2.pos.y,each);
                            //console.log(each2.pos);
                            var t_path=spawn.pos.findPathTo(t_pos);
                            for(let rr of t_path){
                                console.log(rr.x);
                            }
                            //spawn.addTask([4,5,each,[5,14]]);
                            //spawn.addTask([4,5,each,[5,14]]);
                            //spawn.addTask([0,5,[3,15],[2,15],[2,15],each]);
                            //spawn.addTask([3,5,[2,15],each]);
                        }
                    }
                }
            }
        }
            spawn.work();
    }
};
module.exports = modDevelop;