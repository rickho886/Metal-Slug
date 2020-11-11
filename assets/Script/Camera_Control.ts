// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    
    player: cc.Node = null;

    //private gate1 : boolean = true ; //-300
    public gate1 : boolean = false ; //1500
    public gate2 : boolean = false ; //2870
    public gate3 : boolean = true ; //4350
    public gate4 : boolean = false ; //6500
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.player = cc.find("Canvas/Player1");
    }

    //start () {

    //}

    update (dt) {
        
        let target_pos = this.player.getPosition();
        let current_pos = this.node.getPosition();
        cc.log(current_pos.x +" " + this.gate1);
        current_pos.lerp(target_pos, 1, current_pos);
        current_pos.y = cc.misc.clampf(target_pos.y, 0, 100)
        if(current_pos.x < -230 ) {
            current_pos.x = -230;
            this.node.setPosition(current_pos);
        } else if(current_pos.x > 7500){
            current_pos.x = 7500;
            this.node.setPosition(current_pos);
        }else if(target_pos.x >= -230 && target_pos.x < 1500 ){
            if(!(target_pos.x > 1200 && this.gate1==false )){
                current_pos.x = target_pos.x ;
                this.node.setPosition(current_pos);
            }
        }else if(target_pos.x >= 1500 && target_pos.x < 2870){
            this.gate1 = false ;
            if(!(target_pos.x > 2570 && this.gate2==false ) ){
                current_pos.x = target_pos.x ;
                this.node.setPosition(current_pos);
            }
        }else if(target_pos.x >= 2870 && target_pos.x < 4350){
            this.gate2 = false ;
            if(!(target_pos.x > 4050 && this.gate3==false ) ){
                current_pos.x = target_pos.x ;
                this.node.setPosition(current_pos);
            }
        }else if(target_pos.x >= 4350 && target_pos.x < 6500){
            this.gate3 = false ;
            if(!(target_pos.x > 6200 && this.gate4==false ) ){
                current_pos.x = target_pos.x ;
                this.node.setPosition(current_pos);
            }
        }else if(target_pos.x >= 6500 && target_pos.x < 7500){
            this.gate4 = false ;
            current_pos.x = target_pos.x ;
            this.node.setPosition(current_pos);
        }
    }
}
