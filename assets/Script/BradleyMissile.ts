const {ccclass, property} = cc._decorator;

@ccclass
export default class BradleyMissile extends cc.Component {

    cam: cc.Node = null;

    private life:number=2;
    private anim: cc.Animation = null;
    private animateState = null;
    
    

    onLoad() {
        cc.director.getPhysicsManager().enabled = true;
        this.anim = this.getComponent(cc.Animation);
        this.cam = cc.find("Canvas/Main Camera");
    }



    update(dt){

        //cc.log(this.node.x);
        //cc.log(this.cam.x);
        /*if(this.node.scaleX == 1 && this.node.x > this.cam.x + 330){
            this.node.destroy();
        }else if(this.node.scaleX == -1 && this.node.x < this.cam.x - 330){
            this.node.destroy();
        }else if(this.node.y > this.cam.y + 255){
            this.node.destroy();
        }*/
        //cc.log(this.state);
        
        if(this.life<=0){
            this.node.destroy();
        }
        this.animation();
    }


    public init(node: cc.Node) {
        this.node.parent = node.parent;
        this.node.position=cc.v2(-40,67);
        this.node.position=this.node.position.addSelf(node.position);
        this.node.getComponent(cc.RigidBody).linearVelocity=cc.v2(-220,30);
    }
    

    private animation(){
        if(this.animateState == null || this.animateState.name != 'missile'){
            this.animateState=this.anim.play('missile');    
        }
    }
    
    onBeginContact(contact, self, other) {
        if(other.node.name=='leftbound' || other.node.name=='rightbound' || other.node.name=='Ground'
        || other.node.name=='Brouette' || other.node.name=='Leafy_edge' || other.node.name=='Roof'
        || other.node.name=='Rock' || other.node.name=='Sarubia' || other.node.name=='R-Shobu'
        || other.node.name=='Landseek' || other.node.name=='Player1' || other.node.name=='flame'){
            self.node.destroy();
        }else if(other.node.name=='bullet' || other.node.name=='MachinegunBullet'){
            this.life-=1;
        }
    }
    
    

}
