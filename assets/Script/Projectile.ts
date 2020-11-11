const {ccclass, property} = cc._decorator;

@ccclass
export default class Projectile extends cc.Component {

    cam: cc.Node = null;

    private speed:number=300;
    private state:string='init';
    private anim: cc.Animation = null;
    private animateState = null;
    private sarubiaPos:cc.Vec2=cc.v2(0,0);
    private boom:boolean=false;
    private flag: boolean = false;

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
        if(this.boom){
            this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 0);
        }
        else if(this.state=='init'){
            this.node.position=cc.v2(-75,33);
            this.node.position = this.node.position.addSelf(this.sarubiaPos);
        }else if(this.state=='fall'){
            if(this.node.getComponent(cc.RigidBody).linearVelocity.y==0){
                this.state='bounce';
            }
        }
        this.move(dt);
        this.animation();
    }


    public init(node: cc.Node) {
        this.node.parent = node.parent;
        this.sarubiaPos=node.position;
        /*if(this.state=='init'){
            this.node.position=cc.v2(-75,30);
            this.node.position = this.node.position.addSelf(node.position);
        }*/
    }
    

    private move(dt) {
        if(this.state=='roll'){
            this.node.x+=this.speed*-1*dt;
        }
    }

    private animation(){
        if(this.flag) {
            if(this.animateState == null || this.animateState.name != 'normal_explosion_small'){
                this.speed = 0;
                this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 0);
                this.animateState=this.anim.play("normal_explosion_small");
                this.animateState.on('finished',()=>this.node.destroy());
            }
        }
        else if(this.state=='init'){
            if(this.animateState == null || this.animateState.name != 'projectileExplosion'){
                this.animateState=this.anim.play('projectileExplosion');
                this.animateState.on('finished',()=>{
                    this.state='fall';
                });
            }
        }else if(this.state=='fall'){
            if(this.animateState == null || this.animateState.name != 'projectileFall'){
                this.animateState=this.anim.play('projectileFall');
            }
        }else if(this.state=='bounce'){
            if(this.animateState == null || this.animateState.name != 'projectileBounce'){
                this.animateState=this.anim.play('projectileBounce');
                this.animateState.on('finished',()=>{
                    this.state='roll';
                });
            }
        }else if(this.state=='roll'){
            if(this.animateState == null || this.animateState.name != 'projectileRoll'){
                this.animateState=this.anim.play('projectileRoll');
            }
        }
    }
    
    onBeginContact(contact, self, other) {
        if(other.node.name=='Player1' && this.flag) {
            contact.disabled = true;
        }
        else if(other.node.name=='Player1' || other.node.name=='leftbound' || other.node.name=='rightbound' || other.node.name=='Brouette'
        || other.node.name=='Landseek' || other.node.name=='Bradley'){
            this.flag=true;
            //
        }else if(other.node.name=='Rebel_Soldier' || other.node.name=='gift_laser' || other.node.name=='gift_mg' || other.node.name=='gift_shotgun'
        || other.node.name=='Projectile' ||  other.node.name=='Sarubia'){
            contact.disabled=true;
        }
    }
    
    

}
