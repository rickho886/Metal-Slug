const {ccclass, property} = cc._decorator;

@ccclass
export default class Bullet extends cc.Component {

    player: cc.Node = null;
    cam: cc.Node = null;

    onLoad() {
        cc.director.getPhysicsManager().enabled = true;

        this.cam = cc.find("Canvas/Main Camera");
        this.player=cc.find('Canvas/Player1');
    }

    update(){

        //cc.log(this.node.x);
        //cc.log(this.cam.x);
        if(this.node.scaleX == 1 && this.node.x > this.cam.x + 330){
            this.node.destroy();
        }else if(this.node.scaleX == -1 && this.node.x < this.cam.x - 330){
            this.node.destroy();
        }else if(this.node.y > this.cam.y + 255){
            this.node.destroy();
        }
    }


    public init(node: cc.Node, direction: string) {
        this.setInitPos(node, direction);
        this.bulletMove(direction);
    }
    
    private setInitPos(node: cc.Node, direction: string) {
        // don't mount under the player, otherwise it will change direction when player move
        this.node.parent = node.parent;
        if(direction == "top") {
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
                this.node.position=this.node.position.addSelf(cc.v2(0,-17));
            }

        }
       // set the bullet’s absolute position  
       this.node.position = this.node.position.addSelf(node.position);
    }

    private bulletMove(direction: string) {
        let speed = 0;
        if(direction == "top") {
            speed = 600;
            this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, speed);
        } else if(direction == "down") {
            speed = -600;
            this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, speed);
        } else {
            if(this.node.scaleX > 0) {
                speed = 600; // the speed of bullet
            } else {
                speed = -600;
            }
            // modify rigidbody’s velocity to move the bullet
            this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(speed, 0);
        }
        
    }
    
    onBeginContact(contact, self, other) {
        if(other.node.name == "Ground" || other.node.name == "Brouette" 
        || other.node.name=='leftbound'|| other.node.name=='rightbound'|| other.node.name=='Sarubia'
        || other.node.name=='R-Shobu'|| other.node.name=='Landseek'|| other.node.name=='Rebel_Soldier'
        || other.node.name=='Bradley'|| other.node.name=='BradleyMissile'|| other.node.name=='R-Shobu Bomb') {
            self.node.destroy(); 
        }
    }
    
    

}
