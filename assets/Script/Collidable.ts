import Mario from "./Mario";

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

    onLoad () {
        cc.director.getPhysicsManager().enabled = true;  
    }

    //start () {}


    onBeginContact(contact,self,other) {
        /*if(other.node.name == "mario_small_1"){
            cc.log(contact.getWorldManifold().normal)
            if(contact.getWorldManifold().normal.y!=1 || contact.getWorldManifold().normal.x!=0) {
                other.node.getComponent('Mario').onGround = false;
            } else {
                if(other.node.getComponent('Mario').onGround == false) {
                    other.node.getComponent('Mario').onGround = true;
                }
            }
        }*/
    }
}
