const {ccclass, property} = cc._decorator;

@ccclass
export default class NPC extends cc.Component {

    @property({type: cc.AudioClip})
    Thank_you: cc.AudioClip = null

    private anim: cc.Animation = null;
    private animateState: cc.AnimationState = null;

    private rescued : boolean = false;
    private gift : boolean = false;
    public interact : boolean = false;
    private away : boolean = false;
    private anim_run: boolean = false;
    private speed : number = 0;
    private origin_x : number = 0;


    @property(cc.Prefab)
    private gift_laser: cc.Prefab = null;

    @property(cc.Prefab)
    private gift_mg: cc.Prefab = null;

    @property(cc.Prefab)
    private gift_shotgun: cc.Prefab = null;

    onLoad () {
        cc.game.setFrameRate(61);
        cc.director.getPhysicsManager().enabled = true; 
        //this.animateState = this.anim.play('npc_idle');
        
    }

    start () {
        this.anim = this.getComponent(cc.Animation);
        this.animateState = this.anim.play('npc_idle');
        this.origin_x =this.node.x;
    }

    update (dt) {
        //cc.log(this.node.x);
        this.node.x += this.speed * dt;
        if(this.node.x < -500){this.node.destroy();}
        this.NPCAnimation();
        if(this.away==true){
            this.speed = -350;
            this.node.scaleX = 1;
        }else if(this.node.x>this.origin_x+100 ){
            this.speed = -1 * this.speed;
            this.node.scaleX = 1;
        }else if(this.node.x<this.origin_x-100 ){
            this.speed = -1 * this.speed;
            this.node.scaleX = -1;
        }
    }
    private creategift() {
        let random_g = Math.floor(Math.random() * 3);
        if(random_g==0){
            let laser = cc.instantiate(this.gift_laser);
            laser.getComponent('Gift').init(this.node);
        }else if(random_g==1){
            let mg = cc.instantiate(this.gift_mg);
            mg.getComponent('Gift_mg').init(this.node);
        }else{
            let sg = cc.instantiate(this.gift_shotgun);
            sg.getComponent('Gift_shotgun').init(this.node);
        }

    }
    public NPCAnimation(){
        if(this.rescued == false ){
            if(this.animateState.name != 'npc_idle' ){
                this.animateState = this.anim.play('npc_idle');
            }
        }else if(this.interact == true  ){
            if(this.animateState.name == 'npc_walk'){
                this.animateState = this.anim.play('npc_interact');
                cc.audioEngine.playEffect(this.Thank_you, false);
                this.scheduleOnce(function(){ this.creategift();}, 0.5);
                this.scheduleOnce(function(){this.animateState = this.anim.play('npc_away'); this.away =true; }, 3);
            }
        }else{
            if(this.animateState.name == 'npc_idle'){
                this.animateState = this.anim.play('npc_free');
                
                this.scheduleOnce(function(){this.animateState = this.anim.play('npc_walk');this.speed = 100;this.anim_run=true;this.node.scaleX = -1;  }, 1);
                
            }
        }
        
    }

    onBeginContact(contact, self, other) {
        //cc.log(other.node.name);
        if(other.node.name == "Player1"){contact.disabled = true;}

        if((other.node.name == "bullet" || other.node.name == "MachinegunBullet" || other.node.name == "flame"
        || other.node.name == "Shotgun")&& this.rescued == false ) {
            other.node.destroy();
            this.rescued = true;
            let collider = this.node.getComponent(cc.PhysicsBoxCollider);
            collider.size = cc.size(45,65);
        } else if(other.node.name == "Player1" && this.rescued == true && this.gift == false && this.anim_run == true) {
            this.node.scaleX = 1;
            this.speed = 0;
            this.interact = true;
            this.gift = true;
        } 
    }
}
