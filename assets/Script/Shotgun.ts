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
export default class Shotgun extends cc.Component {

    player: cc.Node = null;

    private anim: cc.Animation = null;
    private animateState = null;
    private direction :string=null;
    

    onLoad() {
        cc.director.getPhysicsManager().enabled = true;
        this.anim = this.getComponent(cc.Animation);
        this.player=cc.find('Canvas/Player1');
    }

    start () {

    }

    update (dt) {
        this.animation();
    }

    private animation(){
        if(this.direction=='top' || this.direction=='down'){
            if(this.animateState==null || this.animateState.name!='vertical'){
                this.animateState=this.anim.play('vertical');
                this.animateState.on('finished',()=>this.node.destroy());
            }
        }else{
            if(this.animateState==null || this.animateState.name!='horizontal'){
                this.animateState=this.anim.play('horizontal');
                this.animateState.on('finished',()=>this.node.destroy());
            }
        }
    }

    public init(node: cc.Node, direction: string){
        this.setInitPos(node, direction);
        this.direction=direction;
    }

    private setInitPos(node: cc.Node, direction: string) {
        // don't mount under the player, otherwise it will change direction when player move
        this.node.parent = node.parent;
        if(direction == "top") {
            this.node.scaleY=-1;
            if(node.scaleX > 0) {
                this.node.position = cc.v2(-8, 170); 
            } else {
                this.node.position = cc.v2(8, 170);
            }
        } else if(direction == "down") {
            this.node.scaleY=1;
            if(node.scaleX > 0) {
                this.node.position = cc.v2(-8, -160); 
            } else {
                this.node.position = cc.v2(8, -160);
            }
        } else {
            if(node.scaleX > 0) {
                this.node.position = cc.v2(130, 20); 
                this.node.scaleX = 1;
            } else {
                this.node.position = cc.v2(-130, 20);
                this.node.scaleX = -1;
            }
            if(this.player.getComponent('Player1').sDown && this.player.getComponent('Player1').onGround){
                this.node.position=this.node.position.addSelf(cc.v2(0,-25));
            }
        }
       // set the bullet’s absolute position  
       this.node.position = this.node.position.addSelf(node.position);
    }

    

}
