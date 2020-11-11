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
export default class ccmera extends cc.Component {
    
    player: cc.Node = null;
    cam: cc.Node = null;
    // LIFE-CYCLE CALLBACKS:



    onLoad () {
        this.player = cc.find("Canvas/Player1");
        this.cam = cc.find("Canvas/Main Camera");
    }

    //start () {

    //}

    update (dt) {

        let target_pos = this.cam.getPosition();
        let current_pos = this.node.getPosition();



        if(current_pos.x < -230 ) {
            current_pos.x = -230/4;
            current_pos.y = current_pos.y + 1250;
        } else if(current_pos.x > 7500){
            current_pos.x = 7500/4;
            current_pos.y = current_pos.y + 1250;
            this.node.setPosition(current_pos);
        }else {
            current_pos.x = target_pos.x / 4;
            current_pos.y = target_pos.y + 1250;
            this.node.setPosition(current_pos);            
        }



    }
}
