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
export default class MachinegunBullet extends cc.Component {

    

    cam: cc.Node = null;

    private anim: cc.Animation = null;
    private animateState = null;
    private direction:string=null;
    player: cc.Node = null;

    onLoad() {
        cc.director.getPhysicsManager().enabled = true;
        this.anim = this.getComponent(cc.Animation);
        this.cam = cc.find("Canvas/Main Camera");
        this.player=cc.find('Canvas/Player1');
    }

    start () {

    }

    update (dt) {
        this.animation();

        if(this.node.scaleX == 1 && this.node.x > this.cam.x + 330){
            this.node.destroy();
        }else if(this.node.scaleX == -1 && this.node.x < this.cam.x - 330){
            this.node.destroy();
        }else if(this.node.y > this.cam.y + 255){
            this.node.destroy();
        }
    }

    private animation(){
        if(this.direction=='top' || this.direction=='down'){
            this.animateState=this.anim.play('vertical');
        }else{
            this.animateState=this.anim.play('horizontal');
        }
    }

    public init(node: cc.Node, direction: string){
        this.direction=direction;
        this.setInitPos(node, direction);
        this.bulletMove(direction);
    }

    private setInitPos(node: cc.Node, direction: string) {
        // don't mount under the player, otherwise it will change direction when player move
        this.node.parent = node.parent;
        if(direction == "top") {
            this.node.scaleY=-1;
            if(node.scaleX > 0) {
                this.node.position = cc.v2(-8, 62); 
            } else {
                this.node.position = cc.v2(8, 62);
            }
        } else if(direction == "down") {
            if(node.scaleX > 0) {
                this.node.position = cc.v2(-8, -62); 
            } else {
                this.node.position = cc.v2(8, -62);
            }
        } else {
            if(node.scaleX > 0) {
                this.node.position = cc.v2(62, 8); 
                this.node.scaleX = 1;
            } else {
                this.node.position = cc.v2(-62, 8);
                this.node.scaleX = -1;
            }
            if(this.player.getComponent('Player1').sDown && this.player.getComponent('Player1').onGround){
                this.node.position=this.node.position.addSelf(cc.v2(0,-25));
            }
        }
       // set the bullet’s absolute position  
       this.node.position = this.node.position.addSelf(node.position);
    }

    private bulletMove(direction: string) {
        let speed = 0;
        let p=Math.random()*300-100;
        if(direction == "top") {
            speed = 1000;
            this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(p, speed);
        } else if(direction == "down") {
            speed = -1000;
            this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(p, speed);
        } else {
            if(this.node.scaleX > 0) {
                speed = 1000; // the speed of bullet
            } else {
                speed = -1000;
            }
            // modify rigidbody’s velocity to move the bullet
            this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(speed, p);
        }
        
    }
    onBeginContact(contact, self, other) {
        if(other.node.name == "Ground" || other.node.name == "Brouette" 
        || other.node.name=='leftbound'|| other.node.name=='rightbound'|| other.node.name=='Sarubia'
        || other.node.name=='R-Shobu'|| other.node.name=='Landseek'|| other.node.name=='Rebel_Soldier'
        || other.node.name=='Bradley'|| other.node.name=='BradleyMissile'|| other.node.name=='R-Shobu Bomb') {
            self.node.destroy(); 
        }
        /*if(other.node.name == "Ground" || other.node.name == "Brouette" || other.node.name == "NPC" ) {
            self.node.destroy(); 
        }*/
    }

}
