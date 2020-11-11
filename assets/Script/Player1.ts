import Bottom from "./Player1_bottom"
import Top from "./Player1_top"

const {ccclass, property} = cc._decorator;
var temp_score;

@ccclass
export default class Player extends cc.Component 
{



    @property({type: cc.AudioClip})
    player_die: cc.AudioClip = null

    @property({type: cc.AudioClip})
    heavy_machine_gun: cc.AudioClip = null

    @property(Bottom)
    bottom: Bottom = null;

    @property(Top)
    top: Top = null;

    @property(cc.Prefab)
    private bulletPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    private machinegunPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    private shotgunPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    private player_grenadePrefab: cc.Prefab = null;

    @property(cc.Prefab)
    private flameprefab: cc.Prefab = null;

    @property({type: cc.AudioClip})
    win_sound: cc.AudioClip = null;

    @property({type: cc.AudioClip})
    win_sound2: cc.AudioClip = null;

    private playerSpeed: number = 0;

    private anim = null; //this will use to get animation component

    private animateState = null; //this will use to record animationState

    public aDown: boolean = false; // key for player to go left

    public dDown: boolean = false; // key for player to go right

    public jDown: boolean = false; // key for player to shoot

    public kDown: boolean = false; // key for player to shoot

    public wDown: boolean = false; // key for player to look up

    public sDown: boolean = false; // key for player to crouch

    public rDown: boolean = false; // key for player to grenade

    public spaceDown: boolean = false; // key for player to jump

    private isshoot: boolean=false;

    private isDead: boolean = false;

    public onGround: boolean = false;

    public knife: boolean = false;

    soldier : cc.Node = null;

    cam : cc.Node = null;

    public gun_type : string = 'normal'; //normal, laser, machinegun, shotgun
    
    public to_laser : boolean = false;

    public to_mg : boolean = false;

    public to_shotgun : boolean = false;

    public isWin: boolean = false;

    onLoad() {
        cc.audioEngine.stopAll();
        cc.game.setFrameRate(61);
        cc.director.getPhysicsManager().enabled = true;        	
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        this.soldier = cc.find("Canvas/Rebel_Soldier");
        this.cam = cc.find("Canvas/Main Camera");
    }

    onKeyDown(event) {
        if(!this.isWin) {
            if(event.keyCode == cc.macro.KEY.a) {
                this.aDown = true;
                this.dDown = false;
            } else if(event.keyCode == cc.macro.KEY.d) {
                this.dDown = true;
                this.aDown = false;
            } else if(event.keyCode == cc.macro.KEY.w) {
                this.wDown = true;
                if(event.keyCode == cc.macro.KEY.j) {
                    
                    //this.jDown = true;
                    //this.createBullet("top");
                }
            } else if(event.keyCode == cc.macro.KEY.s) {
                this.sDown = true;
            } else if(event.keyCode == cc.macro.KEY.space) {
                this.spaceDown = true;
            } else if(event.keyCode == cc.macro.KEY.r) {
                this.rDown = true;
            } else if(event.keyCode == cc.macro.KEY.j) {
                this.jDown = true;
                /*if(!this.isshoot){
                    if(this.wDown) {
                        this.createBullet("top");
                    } else if(this.sDown && !this.onGround) {
                        this.createBullet("down");
                    } else {
                        this.createBullet("front");
                    }
                    this.isshoot=true;
                }*/
                
            } else if(event.keyCode == cc.macro.KEY.k) {
                this.kDown = true;
                this.knife = true;
            }
        }
    }
    
    onKeyUp(event) {
        if(event.keyCode == cc.macro.KEY.a)
            this.aDown = false;
        else if(event.keyCode == cc.macro.KEY.d)
            this.dDown = false;
        else if(event.keyCode == cc.macro.KEY.w)
            this.wDown = false;
        else if(event.keyCode == cc.macro.KEY.s)
            this.sDown = false;
        else if(event.keyCode == cc.macro.KEY.r)
            this.rDown = false;
        else if(event.keyCode == cc.macro.KEY.space)
            this.spaceDown = false;
        else if(event.keyCode == cc.macro.KEY.j){
            this.jDown = false;
            this.isshoot=false;
        }
        else if(event.keyCode == cc.macro.KEY.k){
            this.kDown = false;
            this.scheduleOnce(function(){ this.knife=false; }, 0.7);
        }
        
    }
    
    private playerAnimation()
    {
        if(this.sDown)
        {
            if(this.aDown)
            {
                this.node.scaleX = -1;
                this.playerSpeed = -150;
            }
            else if(this.dDown)
            {
                this.node.scaleX = 1;
                this.playerSpeed = 150;
            } else {
                this.playerSpeed = 0;
            }
        }
        else if(this.aDown)
        {
            this.node.scaleX = -1;
            this.playerSpeed = -300;

            /*if(!this.onGround) {
                this.animateState = this.anim.play('mario_small_jump');
            }
            else if(this.animateState == null || this.animateState.name != 'mario_small_move') {// when first call or last animation is shoot or idle
                this.animateState = this.anim.play('mario_small_move');
            }*/
            
            
        }
        else if(this.dDown)
        {
            this.node.scaleX = 1;

            this.playerSpeed = 300;
            /*if(!this.onGround) {
                this.animateState = this.anim.play('mario_small_jump');
            }
            else if(this.animateState == null || this.animateState.name != 'mario_small_move') {// when first call or last animation is shoot or idle
                this.animateState = this.anim.play('mario_small_move');
            }*/
        }
        else
        {
            /*if(!this.onGround) {
                this.animateState = this.anim.play('mario_small_jump');
            }
            else  if(this.animateState != null)
            {
                this.anim.play('mario_small_idle');
                this.animateState = null;
            }*/
            this.playerSpeed = 0;
        }
        if(this.spaceDown && this.onGround) {
            this.jump();
        }
        
    }   

    private jump() {
        this.onGround = false;

        // Method I: Apply Force to rigidbody

        // Method II: Change velocity of rigidbody
        this.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 650);
    }

    public createBullet(direction: string) {
        if(this.gun_type=='normal'){
            let bullet = cc.instantiate(this.bulletPrefab);
            bullet.getComponent('Bullet').init(this.node, direction);
        }else if(this.gun_type=='machinegun'){
            let i=3;
            this.schedule(()=>{
                if(i!=0){
                    let bullet = cc.instantiate(this.machinegunPrefab);
                    bullet.getComponent('MachinegunBullet').init(this.node, direction);
                    i-=1;
                }
            },0.1);
        }else if(this.gun_type=='shotgun'){
            let bullet = cc.instantiate(this.shotgunPrefab);
            bullet.getComponent('Shotgun').init(this.node, direction);
        }else if(this.gun_type=='laser'){
            let bullet = cc.instantiate(this.flameprefab);
            bullet.getComponent('laser').init(this.node, direction);
        }
    }

    public createPlayerGrenade() {
        let player_grenade = cc.instantiate(this.player_grenadePrefab);
        player_grenade.getComponent('player_grenade').init(this.node);
    }
    
    update(dt) {
        if(this.node.getComponent(cc.RigidBody).linearVelocity.y == 0){this.onGround = true ; } 
        if((this.node.x < this.cam.x-280 && this.node.scaleX==-1) || (this.node.x > this.cam.x+280 && this.node.scaleX==1)){
            this.node.x = this.node.x;
        }else{
            this.node.x += this.playerSpeed * dt;
        }
        this.playerAnimation();
        if(this.isWin) {
            this.playerSpeed = 0;
        }
    }

    private winNow() {
        this.isWin = true;
        this.addScore();
        cc.audioEngine.playMusic(this.win_sound, false);
        cc.audioEngine.playEffect(this.win_sound2, false);
        //if(cc.find("Canvas/Main Camera/win/").opacity == 0) {
        //    cc.find("Canvas/Main Camera/win/").opacity = 255;
        cc.find("Canvas/Main Camera/win").opacity = 255;
        //}
        cc.director.pause();
        setTimeout(this.backToMenu_win, 8000);
    }

    private backToMenu_win() {
        //cc.audioEngine.stopAll();
        
        cc.director.resume();
        cc.director.loadScene("after_login_menu");
    }

    private backToMenu_lose() {
        //cc.audioEngine.stopAll();
        cc.director.loadScene("lose");
    }

    private resetScore() {
        firebase.auth().onAuthStateChanged(function(user) {
            var emailModified = user.email.replace(".": "-");
            var usersRef = firebase.database().ref("user_list/" + emailModified + '/');
            usersRef.once('value').then(function(snapshot) {
                //score = snapshot.val().score();
            }).then(function() {
                firebase.database().ref("user_list/").child(emailModified).set({
                    score: 0
                });
            }
            });
    }

    private addScore() {
        firebase.auth().onAuthStateChanged(function(user) {
            var emailModified = user.email.replace(".": "-");
            var usersRef = firebase.database().ref("user_list/" + emailModified + '/');
            usersRef.once('value').then(function(snapshot) {
                temp_score = snapshot.val().score;
            }).then(function() {
                firebase.database().ref("user_list/").child(emailModified).set({
                    score: temp_score + 1
                });
            });
        });
    }

    onBeginContact(contact, self, other) {
        //cc.log('aaaaaaaaaaaaaaaaaaaaa'+other.node.name);
        if(other.node.name == "Ground" || other.node.name == "Roof" || other.node.name == "Rock" || other.node.name == "Brouette" || other.node.name == "Leafy_edge") {
            this.onGround = true;
        } else if(other.node.name == "block") {
            this.onGround = true;
        } else if(other.node.name == "enemy") {
            this.isDead = true;
            this.resetScore();
            setTimeout(this.backToMenu_lose, 2000);
        }else if(other.node.name == "Rebel_Soldier" && this.soldier.getComponent('Enemy_rebel_soldier').knife == true && this.soldier.getComponent('Enemy_rebel_soldier').animateState.time>0.9){
            //cc.log("dd");
            this.node.destroy();
            this.isDead = true;
            this.resetScore();
            setTimeout(this.backToMenu_lose, 2000);
        }else if(other.node.name == "Soldier_grenade" /*&& this.isDead == false*/
        || other.node.name=='BradleyMissile' || other.node.name=='Projectile'
        || other.node.name=='R-Shobu Bomb'){
            this.node.destroy();
            this.isDead = true;
            this.resetScore();
            setTimeout(this.backToMenu_lose, 2000);
            cc.audioEngine.playEffect(this.player_die, false);
        }else if(other.node.name=='Landseek'){
            if(other.node.getComponent(cc.RigidBody).linearVelocity.x!=0){
                this.node.destroy();
                this.isDead = true;
                this.resetScore();
                cc.audioEngine.playEffect(this.player_die, false);
                setTimeout(this.backToMenu_lose, 2000);
            }
        }else if(other.node.name == "gift_laser"){
            this.gun_type = 'laser' ; 
            this.to_laser = true;
            
            this.scheduleOnce(function(){ this.to_laser=false; }, 1);
        }else if(other.node.name == "gift_shotgun"){
            this.gun_type = 'shotgun' ; 
            this.to_shotgun = true;
            
            this.scheduleOnce(function(){ this.to_shotgun=false; }, 1);
        }else if(other.node.name == "gift_mg"){
            this.gun_type = 'machinegun' ; 
            this.to_mg = true;
            
            cc.audioEngine.playEffect(this.heavy_machine_gun, false);
            this.scheduleOnce(function(){ this.to_mg=false; }, 1);
        } else if(other.node.name == "winBound") {
            this.winNow();  
        }
    }
}