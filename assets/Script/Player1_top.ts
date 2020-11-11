import Player1 from "./Player1"
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
export default class Player1_bottom extends cc.Component {

    private anim: cc.Animation = null;
    private animateState = null;
    private delay: boolean = false;
    private type : string = null; 
    private to_laser: boolean = false;
    private to_mg: boolean = false;
    private to_sg: boolean = false;

    private flag: boolean = false;
    private flag2: boolean = true;
    private flag3: boolean = false;
    private flag4: boolean = false;
    

    @property({ type: cc.AudioClip })
    player_shoot_basic: cc.AudioClip = null;

    @property({ type: cc.AudioClip })
    player_shoot_laser: cc.AudioClip = null;


    @property({ type: cc.AudioClip })
    player_shoot_sg: cc.AudioClip = null;

    @property({ type: cc.AudioClip })
    player_shoot_mg: cc.AudioClip = null;

    @property({ type: cc.AudioClip })
    player_squat_knife: cc.AudioClip = null;

    @property({ type: cc.AudioClip })
    player_top_knife: cc.AudioClip = null;

    

    player1: cc.Node = null;


    onLoad () {
        this.player1 = cc.find("Canvas/Player1");
        cc.director.getPhysicsManager().enabled = true;
    }

    update(dt) {
        this.playerAnimation();
        this.type = this.player1.getComponent('Player1').gun_type;
        this.to_laser = this.player1.getComponent('Player1').to_laser;
        this.to_mg = this.player1.getComponent('Player1').to_mg;
        this.to_sg = this.player1.getComponent('Player1').to_shotgun;


    }

    start () {
        this.anim = this.getComponent(cc.Animation);
    }
    //private reborn(){

        //this.player1.getComponent('Player1').gun_type = 'normal';
        //this.player1.getComponent('Player1').playerSpeed = 0;
        //this.player1.position = cc.v2(this.player1.x -30, 150);
        //this.player1.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 0);
        //this.animateState = this.anim.play('top_2_idle');            
    //}

    

    

    public playerAnimation()
    {
        /*if(this.player1.getComponent('Player1').isDead==true ){
            if(this.animateState == null || this.animateState.name != 'top_die'){
                this.animateState = this.anim.play('top_die');
                
                this.animateState.on('finished',()=>{
                    this.player1.getComponent('Player1').isDead = false;
                    this.player1.getComponent('Player1').gun_type = 'normal';
                    this.player1.getComponent('Player1').playerSpeed = 0;
                    this.player1.position = cc.v2(this.player1.x -30, 150);
                    this.player1.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 0);
                    //this.animateState = this.anim.play('top_2_idle'); 
                    
                });

            }

        } else {*/
        if(this.player1.getComponent(Player1).isWin) {
            if(this.animateState == null || this.animateState.name != 'complete'){
                this.animateState = this.anim.play('complete');
            }
        }
        else if(this.to_laser == true || this.to_sg == true || this.to_mg == true){
            if(this.animateState == null || this.animateState.name != 'top_change'){
                this.animateState = this.anim.play('top_change');
                this.animateState.repeatCount = 2;
            }
        }
        else if(this.player1.getComponent(Player1).sDown)
        {
            if(!this.player1.getComponent(Player1).onGround) {
                if (this.player1.getComponent(Player1).jDown) {
                    if(this.type=='normal' && (this.animateState == null || this.animateState.name != 'top_lookdown_shoot' || this.delay == false)) {// when first call or last animation is shoot or idle
                        this.animateState = this.anim.play('top_lookdown_shoot');
                        cc.audioEngine.playEffect(this.player_shoot_basic, false);
                        this.flag2 = false;
                        this.flag = false;
                        this.animateState.on('finished', ()=> {
                            this.flag2 = true;
                            this.flag = true;
                        })
                        this.player1.getComponent(Player1).createBullet("down");
                        this.delay = true;
                        this.scheduleOnce(function() {
                            this.delay = false;
                        }, 0.2)
                    }else if(this.type=='laser' && (this.animateState == null || this.animateState.name != 'top_fire_down_laser' || this.delay == false)){
                        this.animateState = this.anim.play('top_fire_down_laser');
                        cc.audioEngine.playEffect(this.player_shoot_laser, false);
                        this.flag2 = false;
                        this.flag = false;
                        this.animateState.on('finished', ()=> {
                            this.flag2 = true;
                            this.flag = true;
                        })
                        this.player1.getComponent(Player1).createBullet("down");
                        this.delay = true;
                        this.scheduleOnce(function() {
                            this.delay = false;
                        }, 0.2)
                    }else if(this.type=='shotgun' && (this.animateState == null || this.animateState.name != 'top_fire_down_shotgun' || this.delay == false)){
                        this.animateState = this.anim.play('top_fire_down_shotgun');
                        cc.audioEngine.playEffect(this.player_shoot_sg, false);
                        this.flag2 = false;
                        this.flag = false;
                        this.animateState.on('finished', ()=> {
                            this.flag2 = true;
                            this.flag = true;
                        })
                        this.player1.getComponent(Player1).createBullet("down");
                        this.delay = true;
                        this.scheduleOnce(function() {
                            this.delay = false;
                        }, 0.2)
                    }else if(this.type=='machinegun' && (this.animateState == null || this.animateState.name != 'top_fire_down_mg' || this.delay == false)){
                        this.animateState = this.anim.play('top_fire_down_mg');
                        cc.audioEngine.playEffect(this.player_shoot_mg, false);
                        this.flag2 = false;
                        this.flag = false;
                        this.animateState.on('finished', ()=> {
                            this.flag2 = true;
                            this.flag = true;
                        })
                        this.player1.getComponent(Player1).createBullet("down");
                        this.delay = true;
                        this.scheduleOnce(function() {
                            this.delay = false;
                        }, 0.2)
                    }
                } else if(this.player1.getComponent(Player1).dDown)
                {
                    if(this.animateState == null || this.animateState.name != 'squat_top_walk') {// when first call or last animation is shoot or idle
                        if(this.flag4) {
                        //this.animateState.on('finished', ()=> {
                            this.animateState = this.anim.play('squat_top_walk');
                            this.flag = true;
                            this.flag2 = true;
                            this.flag3 = true;
                            this.flag4 = false;
                        }
                            //})
                    }
                } else if(this.player1.getComponent(Player1).aDown)
                {
                    if(this.animateState == null || this.animateState.name != 'squat_top_walk') {// when first call or last animation is shoot or idle
                        if(this.flag4) {
                        //this.animateState.on('finished', ()=> {
                            this.animateState = this.anim.play('squat_top_walk');
                            this.flag = true;
                            this.flag2 = true;
                            this.flag3 = true;
                            this.flag4 = false;
                        }
                            //})
                    }
                } else {
                    if(this.animateState == null || this.animateState.name != 'top_lookdown')
                    {
                        if(this.flag2) {
                        //this.animateState.on('finished', ()=> {
                            this.flag = true;
                            this.flag2 = false;
                            this.flag3 = true;
                            if(this.type=='normal'){
                                this.animateState = this.anim.play('top_lookdown');
                                
                            }else if(this.type=='laser'){
                                this.animateState = this.anim.play('top_2_jump_lookdown');
                                
                            }else if(this.type=='shotgun'){
                                this.animateState = this.anim.play('top_2_jump_lookdown');
                                
                            }else if(this.type=='machinegun'){
                                this.animateState = this.anim.play('top_2_jump_lookdown');
                                
                            }
                        }
                        //})
                    }
                }
            }
            else if(this.player1.getComponent(Player1).aDown)
            {
                if(this.player1.getComponent(Player1).jDown) {
                    if(this.type=='normal' &&(this.animateState == null || this.animateState.name != 'squat_top_shoot' || this.delay == false)) {// when first call or last animation is shoot or idle
                        this.animateState = this.anim.play('squat_top_shoot');
                        cc.audioEngine.playEffect(this.player_shoot_basic, false);
                        this.flag = false;
                        this.flag2 = false;
                        this.flag3 = false;
                        this.animateState.on('finished', ()=> {
                            this.flag = true;
                            this.flag2 = true;
                            this.flag3 = true;
                        })
                        this.player1.getComponent(Player1).createBullet("front");
                        this.delay = true;
                        this.scheduleOnce(function() {
                            this.delay = false;
                        }, 0.2)
                    } else if(this.type=='laser' &&(this.animateState == null || this.animateState.name != 'squat_top_shoot_laser' || this.delay == false)) {// when first call or last animation is shoot or idle
                        this.animateState = this.anim.play('squat_top_shoot_laser');
                        cc.audioEngine.playEffect(this.player_shoot_laser, false);
                        this.flag = false;
                        this.flag2 = false;
                        this.flag3 = false;
                        this.animateState.on('finished', ()=> {
                            this.flag = true;
                            this.flag2 = true;
                            this.flag3 = true;
                        })
                        this.player1.getComponent(Player1).createBullet("front");
                        this.delay = true;
                        this.scheduleOnce(function() {
                            this.delay = false;
                        }, 0.2)
                    } else if(this.type=='shotgun' &&(this.animateState == null || this.animateState.name != 'squat_top_shoot_sg' || this.delay == false)) {// when first call or last animation is shoot or idle
                        this.animateState = this.anim.play('squat_top_shoot_sg');
                        cc.audioEngine.playEffect(this.player_shoot_sg, false);
                        this.flag = false;
                        this.flag2 = false;
                        this.flag3 = false;
                        this.animateState.on('finished', ()=> {
                            this.flag = true;
                            this.flag2 = true;
                            this.flag3 = true;
                        })
                        this.player1.getComponent(Player1).createBullet("front");
                        this.delay = true;
                        this.scheduleOnce(function() {
                            this.delay = false;
                        }, 0.2)
                    } else if(this.type=='machinegun' &&(this.animateState == null || this.animateState.name != 'squat_top_shoot_mg' || this.delay == false)) {// when first call or last animation is shoot or idle
                        this.animateState = this.anim.play('squat_top_shoot_mg');
                        cc.audioEngine.playEffect(this.player_shoot_mg, false);
                        this.flag = false;
                        this.flag2 = false;
                        this.flag3 = false;
                        this.animateState.on('finished', ()=> {
                            this.flag = true;
                            this.flag2 = true;
                            this.flag3 = true;
                        })
                        this.player1.getComponent(Player1).createBullet("front");
                        this.delay = true;
                        this.scheduleOnce(function() {
                            this.delay = false;
                        }, 0.2)
                    } 
                }
                else if(this.animateState == null || this.animateState.name != 'squat_top_walk' || this.animateState.name != 'squat_top_2_walk') {// when first call or last animation is shoot or idle
                    if(this.flag4) {
                    //this.animateState.on('finished', ()=> {
                        this.flag = true;
                        this.flag2 = true;
                        this.flag3 = true;
                        this.flag4 = false;
                        if(this.type=='normal'){
                            this.animateState = this.anim.play('squat_top_walk');
                            
                        }else if(this.type=='laser'){
                            this.animateState = this.anim.play('squat_top_2_walk');
                            
                        }else if(this.type=='shotgun'){
                            this.animateState = this.anim.play('squat_top_2_walk');
                            
                        }else if(this.type=='machinegun'){
                            this.animateState = this.anim.play('squat_top_2_walk');
                            
                        }
                        
                    }
                        //})
                }
            }
            else if(this.player1.getComponent(Player1).dDown)
            {
                if(this.player1.getComponent(Player1).jDown) {
                    if(this.type=='normal' &&(this.animateState == null || this.animateState.name != 'squat_top_shoot' || this.delay == false)) {// when first call or last animation is shoot or idle
                        this.animateState = this.anim.play('squat_top_shoot');
                        cc.audioEngine.playEffect(this.player_shoot_basic, false);
                        this.flag = false;
                        this.flag2 = false;
                        this.flag3 = false;
                        this.animateState.on('finished', ()=> {
                            this.flag = true;
                            this.flag2 = true;
                            this.flag3 = true;
                        })
                        this.player1.getComponent(Player1).createBullet("front");
                        this.delay = true;
                        this.scheduleOnce(function() {
                            this.delay = false;
                        }, 0.2)
                    } else if(this.type=='laser' &&(this.animateState == null || this.animateState.name != 'squat_top_shoot_laser' || this.delay == false)) {// when first call or last animation is shoot or idle
                        this.animateState = this.anim.play('squat_top_shoot_laser');
                        cc.audioEngine.playEffect(this.player_shoot_laser, false);
                        this.flag = false;
                        this.flag2 = false;
                        this.flag3 = false;
                        this.animateState.on('finished', ()=> {
                            this.flag = true;
                            this.flag2 = true;
                            this.flag3 = true;
                        })
                        this.player1.getComponent(Player1).createBullet("front");
                        this.delay = true;
                        this.scheduleOnce(function() {
                            this.delay = false;
                        }, 0.2)
                    } else if(this.type=='shotgun' &&(this.animateState == null || this.animateState.name != 'squat_top_shoot_sg' || this.delay == false)) {// when first call or last animation is shoot or idle
                        this.animateState = this.anim.play('squat_top_shoot_sg');
                        cc.audioEngine.playEffect(this.player_shoot_sg, false);
                        this.flag = false;
                        this.flag2 = false;
                        this.flag3 = false;
                        this.animateState.on('finished', ()=> {
                            this.flag = true;
                            this.flag2 = true;
                            this.flag3 = true;
                        })
                        this.player1.getComponent(Player1).createBullet("front");
                        this.delay = true;
                        this.scheduleOnce(function() {
                            this.delay = false;
                        }, 0.2)
                    } else if(this.type=='machinegun' &&(this.animateState == null || this.animateState.name != 'squat_top_shoot_mg' || this.delay == false)) {// when first call or last animation is shoot or idle
                        this.animateState = this.anim.play('squat_top_shoot_mg');
                        cc.audioEngine.playEffect(this.player_shoot_mg, false);
                        this.flag = false;
                        this.flag2 = false;
                        this.flag3 = false;
                        this.animateState.on('finished', ()=> {
                            this.flag = true;
                            this.flag2 = true;
                            this.flag3 = true;
                        })
                        this.player1.getComponent(Player1).createBullet("front");
                        this.delay = true;
                        this.scheduleOnce(function() {
                            this.delay = false;
                        }, 0.2)
                    } 
                }
                else if(this.animateState == null || this.animateState.name != 'squat_top_walk' || this.animateState.name != 'squat_top_2_walk') {// when first call or last animation is shoot or idle
                    if(this.flag4) {
                    //this.animateState.on('finished', ()=> {
                        this.flag = true;
                        this.flag2 = true;
                        this.flag3 = true;
                        this.flag4 = false;
                        if(this.type=='normal'){
                            this.animateState = this.anim.play('squat_top_walk');
                            
                        }else if(this.type=='laser'){
                            this.animateState = this.anim.play('squat_top_2_walk');
                            
                        }else if(this.type=='shotgun'){
                            this.animateState = this.anim.play('squat_top_2_walk');
                            
                        }else if(this.type=='machinegun'){
                            this.animateState = this.anim.play('squat_top_2_walk');
                            
                        }
                        
                    }
                        //})
                } 
            }
            else if(this.player1.getComponent(Player1).jDown) {
                if(this.type=='normal' &&(this.animateState == null || this.animateState.name != 'squat_top_shoot' || this.delay == false)) {// when first call or last animation is shoot or idle
                    this.animateState = this.anim.play('squat_top_shoot');
                    cc.audioEngine.playEffect(this.player_shoot_basic, false);
                    this.flag = false;
                    this.flag2 = false;
                    this.flag3 = false;
                    this.animateState.on('finished', ()=> {
                        this.flag = true;
                        this.flag2 = true;
                        this.flag3 = true;
                    })
                    this.player1.getComponent(Player1).createBullet("front");
                    this.delay = true;
                    this.scheduleOnce(function() {
                        this.delay = false;
                    }, 0.2)
                } else if(this.type=='laser' &&(this.animateState == null || this.animateState.name != 'squat_top_shoot_laser' || this.delay == false)) {// when first call or last animation is shoot or idle
                    this.animateState = this.anim.play('squat_top_shoot_laser');
                    cc.audioEngine.playEffect(this.player_shoot_laser, false);
                    this.flag = false;
                    this.flag2 = false;
                    this.flag3 = false;
                    this.animateState.on('finished', ()=> {
                        this.flag = true;
                        this.flag2 = true;
                        this.flag3 = true;
                    })
                    this.player1.getComponent(Player1).createBullet("front");
                    this.delay = true;
                    this.scheduleOnce(function() {
                        this.delay = false;
                    }, 0.2)
                } else if(this.type=='shotgun' &&(this.animateState == null || this.animateState.name != 'squat_top_shoot_sg' || this.delay == false)) {// when first call or last animation is shoot or idle
                    this.animateState = this.anim.play('squat_top_shoot_sg');
                    cc.audioEngine.playEffect(this.player_shoot_sg, false);
                    this.flag = false;
                    this.flag2 = false;
                    this.flag3 = false;
                    this.animateState.on('finished', ()=> {
                        this.flag = true;
                        this.flag2 = true;
                        this.flag3 = true;
                    })
                    this.player1.getComponent(Player1).createBullet("front");
                    this.delay = true;
                    this.scheduleOnce(function() {
                        this.delay = false;
                    }, 0.2)
                } else if(this.type=='machinegun' &&(this.animateState == null || this.animateState.name != 'squat_top_shoot_mg' || this.delay == false)) {// when first call or last animation is shoot or idle
                    this.animateState = this.anim.play('squat_top_shoot_mg');
                    cc.audioEngine.playEffect(this.player_shoot_mg, false);
                    this.flag = false;
                    this.flag2 = false;
                    this.flag3 = false;
                    this.animateState.on('finished', ()=> {
                        this.flag = true;
                        this.flag2 = true;
                        this.flag3 = true;
                    })
                    this.player1.getComponent(Player1).createBullet("front");
                    this.delay = true;
                    this.scheduleOnce(function() {
                        this.delay = false;
                    }, 0.2)
                } 
            }
            else if(this.player1.getComponent(Player1).kDown)
            {
                if(this.animateState == null || this.animateState.name != 'squat_top_knife' || this.animateState.name != 'squat_top_2_knife' ||this.delay == false) {// when first call or last animation is shoot or idle
                    if(this.type=='normal'){
                        this.animateState = this.anim.play('squat_top_knife');
                        cc.audioEngine.playEffect(this.player_squat_knife, false);
                    } else if(this.type=='laser'){
                        this.animateState = this.anim.play('squat_top_2_knife');
                        cc.audioEngine.playEffect(this.player_squat_knife, false);
                    } else if(this.type=='shotgun'){
                        this.animateState = this.anim.play('squat_top_2_knife');
                        cc.audioEngine.playEffect(this.player_squat_knife, false);
                    } else if(this.type=='machinegun'){
                        this.animateState = this.anim.play('squat_top_2_knife');
                        cc.audioEngine.playEffect(this.player_squat_knife, false);
                    }
                    this.flag = true;
                    this.flag2 = true;
                    this.flag3 = false;
                    this.animateState.on('finished', ()=> {
                        this.flag3 = true;
                    })
                    this.delay = true;
                    this.scheduleOnce(function() {
                        this.delay = false;
                    }, 0.5)
                }
            }
            else {
                if(this.animateState == null || this.animateState.name != 'squat_top_idle' || this.animateState.name != 'squat_top_2_idle')
                {
                    if(this.flag3) {
                    //this.animateState.on('finished', ()=> {
                        this.flag = true;
                        this.flag2 = true;
                        this.flag3 = false;
                        this.flag4 = true;
                        if(this.type=='normal'){
                            this.animateState = this.anim.play('squat_top_idle');
                        }else if(this.type=='laser'){
                            this.animateState = this.anim.play('squat_top_2_idle');
                        }else if(this.type=='shotgun'){
                            this.animateState = this.anim.play('squat_top_2_idle');
                        }else if(this.type=='machinegun'){
                            this.animateState = this.anim.play('squat_top_2_idle');
                        }
                    }
                    //})
                }  
            }
            /*else {
                if(this.animateState == null || this.animateState.name != 'squat_top_idle') 
                {
                    this.animateState = this.anim.play('squat_top_idle');
                }
            }*/
        }
        else if(this.player1.getComponent(Player1).wDown)
        {
            if (this.player1.getComponent(Player1).jDown) {
                if(this.type=='normal' &&(this.animateState == null || this.animateState.name != 'top_lookup_shoot' || this.delay == false)) {// when first call or last animation is shoot or idle
                    this.animateState = this.anim.play('top_lookup_shoot');
                    cc.audioEngine.playEffect(this.player_shoot_basic, false);
                    this.flag2 = false;
                    this.flag = false;
                    this.animateState.on('finished', ()=> {
                        this.flag2 = true;
                        this.flag = true;
                    })
                    this.player1.getComponent(Player1).createBullet("top");
                    this.delay = true;
                    this.scheduleOnce(function() {
                        this.delay = false;
                    }, 0.2)
                } else if(this.type=='laser' &&(this.animateState == null || this.animateState.name != 'top_fire_top_laser' || this.delay == false)) {// when first call or last animation is shoot or idle
                    this.animateState = this.anim.play('top_fire_top_laser');
                    cc.audioEngine.playEffect(this.player_shoot_laser, false);
                    this.flag2 = false;
                    this.flag = false;
                    this.animateState.on('finished', ()=> {
                        this.flag2 = true;
                        this.flag = true;
                    })
                    this.player1.getComponent(Player1).createBullet("top");
                    this.delay = true;
                    this.scheduleOnce(function() {
                        this.delay = false;
                    }, 0.2)
                } else if(this.type=='shotgun' &&(this.animateState == null || this.animateState.name != 'top_fire_top_shotgun' || this.delay == false)) {// when first call or last animation is shoot or idle
                    this.animateState = this.anim.play('top_fire_top_shotgun');
                    cc.audioEngine.playEffect(this.player_shoot_sg, false);
                    this.flag2 = false;
                    this.flag = false;
                    this.animateState.on('finished', ()=> {
                        this.flag2 = true;
                        this.flag = true;
                    })
                    this.player1.getComponent(Player1).createBullet("top");
                    this.delay = true;
                    this.scheduleOnce(function() {
                        this.delay = false;
                    }, 0.2)
                } else if(this.type=='machinegun' &&(this.animateState == null || this.animateState.name != 'top_fire_top_mg' || this.delay == false)) {// when first call or last animation is shoot or idle
                    this.animateState = this.anim.play('top_fire_top_mg');
                    cc.audioEngine.playEffect(this.player_shoot_mg, false);
                    this.flag2 = false;
                    this.flag = false;
                    this.animateState.on('finished', ()=> {
                        this.flag2 = true;
                        this.flag = true;
                    })
                    this.player1.getComponent(Player1).createBullet("top");
                    this.delay = true;
                    this.scheduleOnce(function() {
                        this.delay = false;
                    }, 0.2)
                } else {
                    if(this.animateState == null || this.animateState.name != 'look_up')
                    {
                        if(this.flag2) {
                        //this.animateState.on('finished', ()=> {
                            this.animateState = this.anim.play('look_up');
                            this.flag = true;
                            this.flag2 = false;
                        }
                        //})
                    }
                    
                }
            }
        }
        else if(this.player1.getComponent(Player1).aDown)
        {
            //this.node.scaleX = -1;

            if(!this.player1.getComponent(Player1).onGround) {
                if (this.player1.getComponent(Player1).jDown) {
                    if(this.type=='normal' &&(this.animateState == null || this.animateState.name != 'top_shoot' || this.delay == false)) {// when first call or last animation is shoot or idle
                        this.animateState = this.anim.play('top_shoot');
                        cc.audioEngine.playEffect(this.player_shoot_basic, false);
                        this.flag2 = false;
                        this.flag = false;
                        this.animateState.on('finished', ()=> {
                            this.flag2 = true;
                            this.flag = true;
                        })
                        this.player1.getComponent(Player1).createBullet("front");
                        this.delay = true;
                        this.scheduleOnce(function() {
                            this.delay = false;
                        }, 0.2)
                    } else if(this.type=='laser' &&(this.animateState == null || this.animateState.name != 'top_fire_front_laser' || this.delay == false)) {// when first call or last animation is shoot or idle
                        this.animateState = this.anim.play('top_fire_front_laser');
                        cc.audioEngine.playEffect(this.player_shoot_laser, false);
                        this.flag2 = false;
                        this.flag = false;
                        this.animateState.on('finished', ()=> {
                            this.flag2 = true;
                            this.flag = true;
                        })
                        this.player1.getComponent(Player1).createBullet("front");
                        this.delay = true;
                        this.scheduleOnce(function() {
                            this.delay = false;
                        }, 0.2)
                    } else if(this.type=='shotgun' &&(this.animateState == null || this.animateState.name != 'top_fire_front_shotgun' || this.delay == false)) {// when first call or last animation is shoot or idle
                        this.animateState = this.anim.play('top_fire_front_shotgun');
                        cc.audioEngine.playEffect(this.player_shoot_sg, false);
                        this.flag2 = false;
                        this.flag = false;
                        this.animateState.on('finished', ()=> {
                            this.flag2 = true;
                            this.flag = true;
                        })
                        this.player1.getComponent(Player1).createBullet("front");
                        this.delay = true;
                        this.scheduleOnce(function() {
                            this.delay = false;
                        }, 0.2)
                    } else if(this.type=='machinegun' &&(this.animateState == null || this.animateState.name != 'top_fire_front_mg' || this.delay == false)) {// when first call or last animation is shoot or idle
                        this.animateState = this.anim.play('top_fire_front_mg');
                        cc.audioEngine.playEffect(this.player_shoot_mg, false);
                        this.flag2 = false;
                        this.flag = false;
                        this.animateState.on('finished', ()=> {
                            this.flag2 = true;
                            this.flag = true;
                        })
                        this.player1.getComponent(Player1).createBullet("front");
                        this.delay = true;
                        this.scheduleOnce(function() {
                            this.delay = false;
                        }, 0.2)
                    } 
                } else if (this.player1.getComponent(Player1).sDown) {
                    if (this.player1.getComponent(Player1).jDown) { // krg animasi
                        if(this.animateState == null || this.animateState.name != 'top_lookdown_shoot' || this.delay == false) {// when first call or last animation is shoot or idle
                            this.animateState = this.anim.play('top_lookdown_shoot');
                            cc.audioEngine.playEffect(this.player_shoot_basic, false);
                            this.flag2 = false;
                            this.flag = false;
                            this.animateState.on('finished', ()=> {
                                this.flag2 = true;
                                this.flag = true;
                            })
                            this.player1.getComponent(Player1).createBullet("down");
                            this.delay = true;
                            this.scheduleOnce(function() {
                                this.delay = false;
                            }, 0.2)
                        }
                    } else {
                        if(this.flag3) {
                            //this.animateState.on('finished', ()=> {
                                this.animateState = this.anim.play('top_lookdown');
                                this.flag = true;
                                this.flag2 = true;
                                this.flag3 = false;
                        }
                    }
                } else if(this.player1.getComponent(Player1).rDown) {
                    if(this.type=='normal'&&(this.animateState == null || this.animateState.name != 'top_grenade' || this.delay == false)) {// when first call or last animation is shoot or idle
                        this.animateState = this.anim.play('top_grenade');
                        this.flag = false;
                        this.flag2 = false;
                        this.flag3 = false;
                        this.animateState.on('finished', ()=> {
                            this.flag = true;
                            this.flag2 = true;
                            this.flag3 = true;
                        })
                        this.player1.getComponent(Player1).createPlayerGrenade();
                        this.delay = true;
                        this.scheduleOnce(function() {
                            this.delay = false;
                        }, 0.2)
                    } else if(this.type=='laser'&&(this.animateState == null || this.animateState.name != 'top_2_grenade' || this.delay == false)) {// when first call or last animation is shoot or idle
                        this.animateState = this.anim.play('top_2_grenade');
                        this.flag = false;
                        this.flag2 = false;
                        this.flag3 = false;
                        this.animateState.on('finished', ()=> {
                            this.flag = true;
                            this.flag2 = true;
                            this.flag3 = true;
                        })
                        this.player1.getComponent(Player1).createPlayerGrenade();
                        this.delay = true;
                        this.scheduleOnce(function() {
                            this.delay = false;
                        }, 0.2)
                    } else if(this.type=='shotgun' &&(this.animateState == null || this.animateState.name != 'top_2_grenade' || this.delay == false)) {// when first call or last animation is shoot or idle
                        this.animateState = this.anim.play('top_2_grenade');
                        this.flag = false;
                        this.flag2 = false;
                        this.flag3 = false;
                        this.animateState.on('finished', ()=> {
                            this.flag = true;
                            this.flag2 = true;
                            this.flag3 = true;
                        })
                        this.player1.getComponent(Player1).createPlayerGrenade();
                        this.delay = true;
                        this.scheduleOnce(function() {
                            this.delay = false;
                        }, 0.2)
                    } else if(this.type=='machinegun' &&(this.animateState == null || this.animateState.name != 'top_2_grenade' || this.delay == false)) {// when first call or last animation is shoot or idle
                        this.animateState = this.anim.play('top_2_grenade');
                        this.flag = false;
                        this.flag2 = false;
                        this.flag3 = false;
                        this.animateState.on('finished', ()=> {
                            this.flag = true;
                            this.flag2 = true;
                            this.flag3 = true;
                        })
                        this.player1.getComponent(Player1).createPlayerGrenade();
                        this.delay = true;
                        this.scheduleOnce(function() {
                            this.delay = false;
                        }, 0.2)
                    } 
                }/* else {
                    this.animateState = this.anim.play('top_jump');
                }*/
                
            }
            else if (this.player1.getComponent(Player1).jDown) {
                
                    
                    if(this.type=='normal' &&(this.animateState == null || this.animateState.name != 'top_shoot' || this.delay == false)) {// when first call or last animation is shoot or idle
                        this.animateState = this.anim.play('top_shoot');
                        cc.audioEngine.playEffect(this.player_shoot_basic, false);
                        this.flag = false;
                        this.flag2 = false;
                        this.flag3 = false;
                        this.animateState.on('finished', ()=> {
                            this.flag = true;
                            this.flag2 = true;
                            this.flag3 = true;
                        })
                        this.player1.getComponent(Player1).createBullet("front");
                        this.delay = true;
                        this.scheduleOnce(function() {
                            this.delay = false;
                        }, 0.2)
                    } else if(this.type=='laser' &&(this.animateState == null || this.animateState.name != 'top_fire_front_laser' || this.delay == false)) {// when first call or last animation is shoot or idle
                        this.animateState = this.anim.play('top_fire_front_laser');
                        cc.audioEngine.playEffect(this.player_shoot_laser, false);
                        this.flag = false;
                        this.flag2 = false;
                        this.flag3 = false;
                        this.animateState.on('finished', ()=> {
                            this.flag = true;
                            this.flag2 = true;
                            this.flag3 = true;
                        })
                        this.player1.getComponent(Player1).createBullet("front");
                        this.delay = true;
                        this.scheduleOnce(function() {
                            this.delay = false;
                        }, 0.2)
                    } else if(this.type=='shotgun' &&(this.animateState == null || this.animateState.name != 'top_fire_front_shotgun' || this.delay == false)) {// when first call or last animation is shoot or idle
                        this.animateState = this.anim.play('top_fire_front_shotgun');
                        cc.audioEngine.playEffect(this.player_shoot_sg, false);
                        this.flag = false;
                        this.flag2 = false;
                        this.flag3 = false;
                        this.animateState.on('finished', ()=> {
                            this.flag = true;
                            this.flag2 = true;
                            this.flag3 = true;
                        })
                        this.player1.getComponent(Player1).createBullet("front");
                        this.delay = true;
                        this.scheduleOnce(function() {
                            this.delay = false;
                        }, 0.2)
                    } else if(this.type=='machinegun' &&(this.animateState == null || this.animateState.name != 'top_fire_front_mg' || this.delay == false)) {// when first call or last animation is shoot or idle
                        this.animateState = this.anim.play('top_fire_front_mg');
                        cc.audioEngine.playEffect(this.player_shoot_mg, false);
                        this.flag = false;
                        this.flag2 = false;
                        this.flag3 = false;
                        this.animateState.on('finished', ()=> {
                            this.flag = true;
                            this.flag2 = true;
                            this.flag3 = true;
                        })
                        this.player1.getComponent(Player1).createBullet("front");
                        this.delay = true;
                        this.scheduleOnce(function() {
                            this.delay = false;
                        }, 0.2)
                    } 
                    
            } else if(this.player1.getComponent(Player1).kDown) {
                if(this.animateState == null || this.animateState.name != 'top_knife' || this.delay == false) {// when first call or last animation is shoot or idle
                    this.animateState = this.anim.play('top_knife');
                    cc.audioEngine.playEffect(this.player_top_knife, false);
                    this.flag = false;
                    this.flag2 = false;
                    this.flag3 = false;
                    this.animateState.on('finished', ()=> {
                        this.flag = true;
                        this.flag2 = true;
                        this.flag3 = true;
                    })
                    this.delay = true;
                    this.scheduleOnce(function() {
                        this.delay = false;
                    }, 0.5)
                }
            } else if(this.player1.getComponent(Player1).rDown) {
                if(this.type=='normal'&&(this.animateState == null || this.animateState.name != 'top_grenade' || this.delay == false)) {// when first call or last animation is shoot or idle
                    this.animateState = this.anim.play('top_grenade');
                    this.flag = false;
                    this.flag2 = false;
                    this.flag3 = false;
                    this.animateState.on('finished', ()=> {
                        this.flag = true;
                        this.flag2 = true;
                        this.flag3 = true;
                    })
                    this.player1.getComponent(Player1).createPlayerGrenade();
                    this.delay = true;
                    this.scheduleOnce(function() {
                        this.delay = false;
                    }, 0.2)
                } else if(this.type=='laser'&&(this.animateState == null || this.animateState.name != 'top_2_grenade')) {// when first call or last animation is shoot or idle
                    this.animateState = this.anim.play('top_2_grenade');
                    this.flag = false;
                    this.flag2 = false;
                    this.flag3 = false;
                    this.animateState.on('finished', ()=> {
                        this.flag = true;
                        this.flag2 = true;
                        this.flag3 = true;
                    })
                    this.player1.getComponent(Player1).createPlayerGrenade();
                    this.delay = true;
                    this.scheduleOnce(function() {
                        this.delay = false;
                    }, 0.2)
                } else if(this.type=='shotgun' &&(this.animateState == null || this.animateState.name != 'top_2_grenade')) {// when first call or last animation is shoot or idle
                    this.animateState = this.anim.play('top_2_grenade');
                    this.flag = false;
                    this.flag2 = false;
                    this.flag3 = false;
                    this.animateState.on('finished', ()=> {
                        this.flag = true;
                        this.flag2 = true;
                        this.flag3 = true;
                    })
                    this.player1.getComponent(Player1).createPlayerGrenade();
                    this.delay = true;
                    this.scheduleOnce(function() {
                        this.delay = false;
                    }, 0.2)
                } else if(this.type=='machinegun' &&(this.animateState == null || this.animateState.name != 'top_2_grenade')) {// when first call or last animation is shoot or idle
                    this.animateState = this.anim.play('top_2_grenade');
                    this.flag = false;
                    this.flag2 = false;
                    this.flag3 = false;
                    this.animateState.on('finished', ()=> {
                        this.flag = true;
                        this.flag2 = true;
                        this.flag3 = true;
                    })
                    this.player1.getComponent(Player1).createPlayerGrenade();
                    this.delay = true;
                    this.scheduleOnce(function() {
                        this.delay = false;
                    }, 0.2)
                } 
            } else {
                if(this.animateState == null || this.animateState.name != 'top_walk' || this.animateState.name != 'top_2_run')
                {
                    if(this.flag2) {
                    //this.animateState.on('finished', ()=> {
                        this.flag = true;
                        this.flag2 = false;
                        this.flag3 = true;
                        this.flag4 = true;
                        if(this.type=='normal'){
                            this.animateState = this.anim.play('top_walk');
                        }else if(this.type=='laser'){
                            this.animateState = this.anim.play('top_2_run');
                        }else if(this.type=='shotgun'){
                            this.animateState = this.anim.play('top_2_run');
                        }else if(this.type=='machinegun'){
                            this.animateState = this.anim.play('top_2_run');
                        }
                    }
                    //})
                }
            }
            /*else if(this.animateState != null && (this.animateState.name != 'top_shoot')) {// when first call or last animation is shoot or idle
                this.animateState = this.anim.play('top_walk');
            } */
        }
        else if(this.player1.getComponent(Player1).dDown)
        {
            if(!this.player1.getComponent(Player1).onGround) {
                if (this.player1.getComponent(Player1).jDown) {
                    if(this.type=='normal' &&(this.animateState == null || this.animateState.name != 'top_shoot' || this.delay == false)) {// when first call or last animation is shoot or idle
                        this.animateState = this.anim.play('top_shoot');
                        cc.audioEngine.playEffect(this.player_shoot_basic, false);
                        this.flag2 = false;
                        this.flag = false;
                        this.animateState.on('finished', ()=> {
                            this.flag2 = true;
                            this.flag = true;
                        })
                        this.player1.getComponent(Player1).createBullet("front");
                        this.delay = true;
                        this.scheduleOnce(function() {
                            this.delay = false;
                        }, 0.2)
                    } else if(this.type=='laser' &&(this.animateState == null || this.animateState.name != 'top_fire_front_laser' || this.delay == false)) {// when first call or last animation is shoot or idle
                        this.animateState = this.anim.play('top_fire_front_laser');
                        cc.audioEngine.playEffect(this.player_shoot_laser, false);
                        this.flag2 = false;
                        this.flag = false;
                        this.animateState.on('finished', ()=> {
                            this.flag2 = true;
                            this.flag = true;
                        })
                        this.player1.getComponent(Player1).createBullet("front");
                        this.delay = true;
                        this.scheduleOnce(function() {
                            this.delay = false;
                        }, 0.2)
                    } else if(this.type=='shotgun' &&(this.animateState == null || this.animateState.name != 'top_fire_front_shotgun' || this.delay == false)) {// when first call or last animation is shoot or idle
                        this.animateState = this.anim.play('top_fire_front_shotgun');
                        cc.audioEngine.playEffect(this.player_shoot_sg, false);
                        this.flag2 = false;
                        this.flag = false;
                        this.animateState.on('finished', ()=> {
                            this.flag2 = true;
                            this.flag = true;
                        })
                        this.player1.getComponent(Player1).createBullet("front");
                        this.delay = true;
                        this.scheduleOnce(function() {
                            this.delay = false;
                        }, 0.2)
                    } else if(this.type=='machinegun' &&(this.animateState == null || this.animateState.name != 'top_fire_front_mg' || this.delay == false)) {// when first call or last animation is shoot or idle
                        this.animateState = this.anim.play('top_fire_front_mg');
                        cc.audioEngine.playEffect(this.player_shoot_mg, false);
                        this.flag2 = false;
                        this.flag = false;
                        this.animateState.on('finished', ()=> {
                            this.flag2 = true;
                            this.flag = true;
                        })
                        this.player1.getComponent(Player1).createBullet("front");
                        this.delay = true;
                        this.scheduleOnce(function() {
                            this.delay = false;
                        }, 0.2)
                    } 
                } else if (this.player1.getComponent(Player1).sDown) {
                    if (this.player1.getComponent(Player1).jDown) { // krg animasi
                        if(this.animateState == null || this.animateState.name != 'top_lookdown_shoot' || this.delay == false) {// when first call or last animation is shoot or idle
                            this.animateState = this.anim.play('top_lookdown_shoot');
                            cc.audioEngine.playEffect(this.player_shoot_basic, false);
                            this.flag2 = false;
                            this.flag = false;
                            this.animateState.on('finished', ()=> {
                                this.flag2 = true;
                                this.flag = true;
                            })
                            this.player1.getComponent(Player1).createBullet("down");
                            this.delay = true;
                            this.scheduleOnce(function() {
                                this.delay = false;
                            }, 0.2)
                        }
                    } else {
                        if(this.flag3) {
                            //this.animateState.on('finished', ()=> {
                                this.animateState = this.anim.play('top_lookdown');
                                this.flag = true;
                                this.flag2 = true;
                                this.flag3 = false;
                        }
                    }
                } else if(this.player1.getComponent(Player1).rDown) {
                    if(this.type=='normal'&&(this.animateState == null || this.animateState.name != 'top_grenade' || this.delay == false)) {// when first call or last animation is shoot or idle
                        this.animateState = this.anim.play('top_grenade');
                        this.flag = false;
                        this.flag2 = false;
                        this.flag3 = false;
                        this.animateState.on('finished', ()=> {
                            this.flag = true;
                            this.flag2 = true;
                            this.flag3 = true;
                        })
                        this.player1.getComponent(Player1).createPlayerGrenade();
                        this.delay = true;
                        this.scheduleOnce(function() {
                            this.delay = false;
                        }, 0.2)
                    } else if(this.type=='laser'&&(this.animateState == null || this.animateState.name != 'top_2_grenade' || this.delay == false)) {// when first call or last animation is shoot or idle
                        this.animateState = this.anim.play('top_2_grenade');
                        this.flag = false;
                        this.flag2 = false;
                        this.flag3 = false;
                        this.animateState.on('finished', ()=> {
                            this.flag = true;
                            this.flag2 = true;
                            this.flag3 = true;
                        })
                        this.player1.getComponent(Player1).createPlayerGrenade();
                        this.delay = true;
                        this.scheduleOnce(function() {
                            this.delay = false;
                        }, 0.2)
                    } else if(this.type=='shotgun' &&(this.animateState == null || this.animateState.name != 'top_2_grenade' || this.delay == false)) {// when first call or last animation is shoot or idle
                        this.animateState = this.anim.play('top_2_grenade');
                        this.flag = false;
                        this.flag2 = false;
                        this.flag3 = false;
                        this.animateState.on('finished', ()=> {
                            this.flag = true;
                            this.flag2 = true;
                            this.flag3 = true;
                        })
                        this.player1.getComponent(Player1).createPlayerGrenade();
                        this.delay = true;
                        this.scheduleOnce(function() {
                            this.delay = false;
                        }, 0.2)
                    } else if(this.type=='machinegun' &&(this.animateState == null || this.animateState.name != 'top_2_grenade' || this.delay == false)) {// when first call or last animation is shoot or idle
                        this.animateState = this.anim.play('top_2_grenade');
                        this.flag = false;
                        this.flag2 = false;
                        this.flag3 = false;
                        this.animateState.on('finished', ()=> {
                            this.flag = true;
                            this.flag2 = true;
                            this.flag3 = true;
                        })
                        this.player1.getComponent(Player1).createPlayerGrenade();
                        this.delay = true;
                        this.scheduleOnce(function() {
                            this.delay = false;
                        }, 0.2)
                    } 
                
                }/* else {
                    this.animateState = this.anim.play('top_jump');
                }*/
                
            }
            else if (this.player1.getComponent(Player1).jDown) {
                
                    
                    if(this.type=='normal' &&(this.animateState == null || this.animateState.name != 'top_shoot' || this.delay == false)) {// when first call or last animation is shoot or idle
                        this.animateState = this.anim.play('top_shoot');
                        cc.audioEngine.playEffect(this.player_shoot_basic, false);
                        this.flag = false;
                        this.flag2 = false;
                        this.flag3 = false;
                        this.animateState.on('finished', ()=> {
                            this.flag = true;
                            this.flag2 = true;
                            this.flag3 = true;
                        })
                        this.player1.getComponent(Player1).createBullet("front");
                        this.delay = true;
                        this.scheduleOnce(function() {
                            this.delay = false;
                        }, 0.2)
                    } else if(this.type=='laser' &&(this.animateState == null || this.animateState.name != 'top_fire_front_laser' || this.delay == false)) {// when first call or last animation is shoot or idle
                        this.animateState = this.anim.play('top_fire_front_laser');
                        cc.audioEngine.playEffect(this.player_shoot_laser, false);
                        this.flag = false;
                        this.flag2 = false;
                        this.flag3 = false;
                        this.animateState.on('finished', ()=> {
                            this.flag = true;
                            this.flag2 = true;
                            this.flag3 = true;
                        })
                        this.player1.getComponent(Player1).createBullet("front");
                        this.delay = true;
                        this.scheduleOnce(function() {
                            this.delay = false;
                        }, 0.2)
                    } else if(this.type=='shotgun' &&(this.animateState == null || this.animateState.name != 'top_fire_front_shotgun' || this.delay == false)) {// when first call or last animation is shoot or idle
                        this.animateState = this.anim.play('top_fire_front_shotgun');
                        cc.audioEngine.playEffect(this.player_shoot_sg, false);
                        this.flag = false;
                        this.flag2 = false;
                        this.flag3 = false;
                        this.animateState.on('finished', ()=> {
                            this.flag = true;
                            this.flag2 = true;
                            this.flag3 = true;
                        })
                        this.player1.getComponent(Player1).createBullet("front");
                        this.delay = true;
                        this.scheduleOnce(function() {
                            this.delay = false;
                        }, 0.2)
                    } else if(this.type=='machinegun' &&(this.animateState == null || this.animateState.name != 'top_fire_front_mg' || this.delay == false)) {// when first call or last animation is shoot or idle
                        this.animateState = this.anim.play('top_fire_front_mg');
                        cc.audioEngine.playEffect(this.player_shoot_mg, false);
                        this.flag = false;
                        this.flag2 = false;
                        this.flag3 = false;
                        this.animateState.on('finished', ()=> {
                            this.flag = true;
                            this.flag2 = true;
                            this.flag3 = true;
                        })
                        this.player1.getComponent(Player1).createBullet("front");
                        this.delay = true;
                        this.scheduleOnce(function() {
                            this.delay = false;
                        }, 0.2)
                    } 
                    
            } else if(this.player1.getComponent(Player1).kDown) {
                if(this.animateState == null || this.animateState.name != 'top_knife' || this.delay == false) {// when first call or last animation is shoot or idle
                    this.animateState = this.anim.play('top_knife');
                    cc.audioEngine.playEffect(this.player_top_knife, false);
                    this.flag = false;
                    this.flag2 = false;
                    this.flag3 = false;
                    this.animateState.on('finished', ()=> {
                        this.flag = true;
                        this.flag2 = true;
                        this.flag3 = true;
                    })
                    this.delay = true;
                    this.scheduleOnce(function() {
                        this.delay = false;
                    }, 0.5)
                }
            } else if(this.player1.getComponent(Player1).rDown) {
                if(this.type=='normal'&&(this.animateState == null || this.animateState.name != 'top_grenade' || this.delay == false)) {// when first call or last animation is shoot or idle
                    this.animateState = this.anim.play('top_grenade');
                    this.flag = false;
                    this.flag2 = false;
                    this.flag3 = false;
                    this.animateState.on('finished', ()=> {
                        this.flag = true;
                        this.flag2 = true;
                        this.flag3 = true;
                    })
                    this.player1.getComponent(Player1).createPlayerGrenade();
                    this.delay = true;
                    this.scheduleOnce(function() {
                        this.delay = false;
                    }, 0.2)
                } else if(this.type=='laser'&&(this.animateState == null || this.animateState.name != 'top_2_grenade')) {// when first call or last animation is shoot or idle
                    this.animateState = this.anim.play('top_2_grenade');
                    this.flag = false;
                    this.flag2 = false;
                    this.flag3 = false;
                    this.animateState.on('finished', ()=> {
                        this.flag = true;
                        this.flag2 = true;
                        this.flag3 = true;
                    })
                    this.player1.getComponent(Player1).createPlayerGrenade();
                    this.delay = true;
                    this.scheduleOnce(function() {
                        this.delay = false;
                    }, 0.2)
                } else if(this.type=='shotgun' &&(this.animateState == null || this.animateState.name != 'top_2_grenade')) {// when first call or last animation is shoot or idle
                    this.animateState = this.anim.play('top_2_grenade');
                    this.flag = false;
                    this.flag2 = false;
                    this.flag3 = false;
                    this.animateState.on('finished', ()=> {
                        this.flag = true;
                        this.flag2 = true;
                        this.flag3 = true;
                    })
                    this.player1.getComponent(Player1).createPlayerGrenade();
                    this.delay = true;
                    this.scheduleOnce(function() {
                        this.delay = false;
                    }, 0.2)
                } else if(this.type=='machinegun' &&(this.animateState == null || this.animateState.name != 'top_2_grenade')) {// when first call or last animation is shoot or idle
                    this.animateState = this.anim.play('top_2_grenade');
                    this.flag = false;
                    this.flag2 = false;
                    this.flag3 = false;
                    this.animateState.on('finished', ()=> {
                        this.flag = true;
                        this.flag2 = true;
                        this.flag3 = true;
                    })
                    this.player1.getComponent(Player1).createPlayerGrenade();
                    this.delay = true;
                    this.scheduleOnce(function() {
                        this.delay = false;
                    }, 0.2)
                } 
            } else {
                if(this.animateState == null || this.animateState.name != 'top_walk' || this.animateState.name != 'top_2_run')
                {
                    if(this.flag2) {
                    //this.animateState.on('finished', ()=> {
                        this.flag = true;
                        this.flag2 = false;
                        this.flag3 = true;
                        this.flag4 = true;
                        if(this.type=='normal'){
                            this.animateState = this.anim.play('top_walk');
                        }else if(this.type=='laser'){
                            this.animateState = this.anim.play('top_2_run');
                        }else if(this.type=='shotgun'){
                            this.animateState = this.anim.play('top_2_run');
                        }else if(this.type=='machinegun'){
                            this.animateState = this.anim.play('top_2_run');
                        }
                    }
                    //})
                }
            }
            /*else if(this.animateState != null && (this.animateState.name != 'top_shoot')) {// when first call or last animation is shoot or idle
                this.animateState = this.anim.play('top_walk');
            } */
        
            //this.node.scaleX = 1;
            /*if (this.player1.getComponent(Player1).jDown) {
                if(this.type=='normal'&&(this.animateState == null || this.animateState.name != 'top_shoot')) {// when first call or last animation is shoot or idle
                    this.animateState = this.anim.play('top_shoot');
                    this.delay = true;
                    this.scheduleOnce(function() {
                        this.delay = false;
                        this.animateState = null;
                    }, 0.2)
                }else if(this.type=='laser'&&(this.animateState == null || this.animateState.name != 'top_fire_front_laser')) {// when first call or last animation is shoot or idle
                    this.animateState = this.anim.play('top_fire_front_laser');
                    this.delay = true;
                    this.scheduleOnce(function() {
                        this.delay = false;
                        this.animateState = null;
                    }, 0.2)
                }else if(this.type=='shotgun' &&(this.animateState == null || this.animateState.name != 'top_fire_front_shotgun')) {// when first call or last animation is shoot or idle
                    this.animateState = this.anim.play('top_fire_front_shotgun');
                    this.delay = true;
                    this.scheduleOnce(function() {
                        this.delay = false;
                        this.animateState = null;
                    }, 0.2)
                }else if(this.type=='machinegun' &&(this.animateState == null || this.animateState.name != 'top_fire_front_mg')) {// when first call or last animation is shoot or idle
                    this.animateState = this.anim.play('top_fire_front_mg');
                    this.delay = true;
                    this.scheduleOnce(function() {
                        this.delay = false;
                        this.animateState = null;
                    }, 0.2)
                }
            } else {
                this.animateState = this.anim.play('top_jump');
            }
            else if (this.player1.getComponent(Player1).jDown) {
                if(this.type=='normal'&&(this.animateState == null || this.animateState.name != 'top_shoot')) {// when first call or last animation is shoot or idle
                    this.animateState = this.anim.play('top_shoot');
                    this.delay = true;
                    this.scheduleOnce(function() {
                        this.delay = false;
                        this.animateState = null;
                    }, 0.2)
                }else if(this.type=='laser'&&(this.animateState == null || this.animateState.name != 'top_fire_front_laser')) {// when first call or last animation is shoot or idle
                    this.animateState = this.anim.play('top_fire_front_laser');
                    this.delay = true;
                    this.scheduleOnce(function() {
                        this.delay = false;
                        this.animateState = null;
                    }, 0.2)
                }else if(this.type=='shotgun' &&(this.animateState == null || this.animateState.name != 'top_fire_front_shotgun')) {// when first call or last animation is shoot or idle
                    this.animateState = this.anim.play('top_fire_front_shotgun');
                    this.delay = true;
                    this.scheduleOnce(function() {
                        this.delay = false;
                        this.animateState = null;
                    }, 0.2)
                }else if(this.type=='machinegun' &&(this.animateState == null || this.animateState.name != 'top_fire_front_mg')) {// when first call or last animation is shoot or idle
                    this.animateState = this.anim.play('top_fire_front_mg');
                    this.delay = true;
                    this.scheduleOnce(function() {
                        this.delay = false;
                        this.animateState = null;
                    }, 0.2)
                }
            } else if(this.player1.getComponent(Player1).kDown) {
                if(this.animateState == null || this.animateState.name != 'top_knife') {// when first call or last animation is shoot or idle
                    this.animateState = this.anim.play('top_knife');
                    this.delay = true;
                    this.scheduleOnce(function() {
                        this.delay = false;
                        this.animateState = null;
                    }, 0.4)
                }
            } else if(this.player1.getComponent(Player1).rDown) {
                if(this.type=='normal'&&(this.animateState == null || this.animateState.name != 'top_grenade')) {// when first call or last animation is shoot or idle
                    this.animateState = this.anim.play('top_grenade');
                    this.delay = true;
                    this.scheduleOnce(function() {
                        this.delay = false;
                        this.animateState = null;
                    }, 0.2)
                }else if(this.type=='laser'&&(this.animateState == null || this.animateState.name != 'top_2_grenade')) {// when first call or last animation is shoot or idle
                    this.animateState = this.anim.play('top_2_grenade');
                    this.delay = true;
                    this.scheduleOnce(function() {
                        this.delay = false;
                        this.animateState = null;
                    }, 0.2)
                }else if(this.type=='shotgun' &&(this.animateState == null || this.animateState.name != 'top_2_grenade')) {// when first call or last animation is shoot or idle
                    this.animateState = this.anim.play('top_2_grenade');
                    this.delay = true;
                    this.scheduleOnce(function() {
                        this.delay = false;
                        this.animateState = null;
                    }, 0.2)
                }else if(this.type=='machinegun' &&(this.animateState == null || this.animateState.name != 'top_2_grenade')) {// when first call or last animation is shoot or idle
                    this.animateState = this.anim.play('top_2_grenade');
                    this.delay = true;
                    this.scheduleOnce(function() {
                        this.delay = false;
                        this.animateState = null;
                    }, 0.2)
                }
            }else{
                if(this.type == 'normal'){
                    this.animateState = this.anim.play('top_idle');
                }else if(this.type == 'laser' || this.type == 'machinegun' || this.type == 'shotgun'){
                    this.animateState = this.anim.play('top_2_idle');
                }
            }
            else if(this.delay == false) {
                if(this.animateState == null && this.anim.currentClip.name != 'top_shoot') {
                    this.animateState = this.anim.play('top_walk');
                }
            }*/
        }
        
        else if (this.player1.getComponent(Player1).jDown) {        
            if(this.type=='normal' &&(this.animateState == null || this.animateState.name != 'top_shoot' || this.delay == false)) {// when first call or last animation is shoot or idle
                this.animateState = this.anim.play('top_shoot');
                cc.audioEngine.playEffect(this.player_shoot_basic, false);
                this.flag = false;
                this.flag2 = false;
                this.flag3 = false;
                this.animateState.on('finished', ()=> {
                    this.flag = true;
                    this.flag2 = true;
                    this.flag3 = true;
                })
                this.player1.getComponent(Player1).createBullet("front");
                this.delay = true;
                this.scheduleOnce(function() {
                    this.delay = false;
                }, 0.2)
            } else if(this.type=='laser' &&(this.animateState == null || this.animateState.name != 'top_fire_front_laser')) {// when first call or last animation is shoot or idle
                this.animateState = this.anim.play('top_fire_front_laser');
                cc.audioEngine.playEffect(this.player_shoot_laser, false);
                this.flag = false;
                this.flag2 = false;
                this.flag3 = false;
                this.animateState.on('finished', ()=> {
                    this.flag = true;
                    this.flag2 = true;
                    this.flag3 = true;
                })
                this.player1.getComponent(Player1).createBullet("front");
                this.delay = true;
                this.scheduleOnce(function() {
                    this.delay = false;
                }, 0.2)
            } else if(this.type=='shotgun' &&(this.animateState == null || this.animateState.name != 'top_fire_front_shotgun')) {// when first call or last animation is shoot or idle
                this.animateState = this.anim.play('top_fire_front_shotgun');
                cc.audioEngine.playEffect(this.player_shoot_sg, false);
                this.flag = false;
                this.flag2 = false;
                this.flag3 = false;
                this.animateState.on('finished', ()=> {
                    this.flag = true;
                    this.flag2 = true;
                    this.flag3 = true;
                })
                this.player1.getComponent(Player1).createBullet("front");
                this.delay = true;
                this.scheduleOnce(function() {
                    this.delay = false;
                }, 0.2)
            } else if(this.type=='machinegun' &&(this.animateState == null || this.animateState.name != 'top_fire_front_mg')) {// when first call or last animation is shoot or idle
                this.animateState = this.anim.play('top_fire_front_mg');
                cc.audioEngine.playEffect(this.player_shoot_mg, false);
                this.flag = false;
                this.flag2 = false;
                this.flag3 = false;
                this.animateState.on('finished', ()=> {
                    this.flag = true;
                    this.flag2 = true;
                    this.flag3 = true;
                })
                this.player1.getComponent(Player1).createBullet("front");
                this.delay = true;
                this.scheduleOnce(function() {
                    this.delay = false;
                }, 0.2)
            } 
        }
        else if(this.player1.getComponent(Player1).kDown)
        {
            if(this.animateState == null || this.animateState.name != 'top_knife' || this.delay == false) {// when first call or last animation is shoot or idle
                this.animateState = this.anim.play('top_knife');
                cc.audioEngine.playEffect(this.player_top_knife, false);
                this.flag = false;
                this.flag2 = false;
                this.flag3 = false;
                this.animateState.on('finished', ()=> {
                    this.flag = true;
                    this.flag2 = true;
                    this.flag3 = true;
                })
                this.delay = true;
                this.scheduleOnce(function() {
                    this.delay = false;
                }, 0.5)
            }
        }
        else if(this.player1.getComponent(Player1).rDown)
        {
            if(this.type=='normal'&&(this.animateState == null || this.animateState.name != 'top_grenade' || this.delay == false)) {// when first call or last animation is shoot or idle
                this.animateState = this.anim.play('top_grenade');
                this.flag = false;
                this.flag2 = false;
                this.flag3 = false;
                this.animateState.on('finished', ()=> {
                    this.flag = true;
                    this.flag2 = true;
                    this.flag3 = true;
                })
                this.player1.getComponent(Player1).createPlayerGrenade();
                this.delay = true;
                this.scheduleOnce(function() {
                    this.delay = false;
                }, 0.2)
            } else if(this.type=='laser'&&(this.animateState == null || this.animateState.name != 'top_2_grenade' || this.delay == false)) {// when first call or last animation is shoot or idle
                this.animateState = this.anim.play('top_2_grenade');
                this.flag = false;
                this.flag2 = false;
                this.flag3 = false;
                this.animateState.on('finished', ()=> {
                    this.flag = true;
                    this.flag2 = true;
                    this.flag3 = true;
                })
                this.player1.getComponent(Player1).createPlayerGrenade();
                this.delay = true;
                this.scheduleOnce(function() {
                    this.delay = false;
                }, 0.2)
            } else if(this.type=='shotgun' &&(this.animateState == null || this.animateState.name != 'top_2_grenade' || this.delay == false)) {// when first call or last animation is shoot or idle
                this.animateState = this.anim.play('top_2_grenade');
                this.flag = false;
                this.flag2 = false;
                this.flag3 = false;
                this.animateState.on('finished', ()=> {
                    this.flag = true;
                    this.flag2 = true;
                    this.flag3 = true;
                })
                this.player1.getComponent(Player1).createPlayerGrenade();
                this.delay = true;
                this.scheduleOnce(function() {
                    this.delay = false;
                }, 0.2)
            } else if(this.type=='machinegun' &&(this.animateState == null || this.animateState.name != 'top_2_grenade' || this.delay == false)) {// when first call or last animation is shoot or idle
                this.animateState = this.anim.play('top_2_grenade');
                this.flag = false;
                this.flag2 = false;
                this.flag3 = false;
                this.animateState.on('finished', ()=> {
                    this.flag = true;
                    this.flag2 = true;
                    this.flag3 = true;
                })
                this.player1.getComponent(Player1).createPlayerGrenade();
                this.delay = true;
                this.scheduleOnce(function() {
                    this.delay = false;
                }, 0.2)
            }
        }
        else
        {
            if(this.type=='normal'&&!this.player1.getComponent(Player1).onGround) {
                if(this.flag2) {
                    this.animateState = this.anim.play('top_jump');
                    this.flag = true;
                    this.flag2 = false;
                    this.flag3 = true;
                }
            }
            else if(this.animateState == null || this.animateState.name != 'top_idle' || this.animateState.name != 'top_2_idle')
            {
                if(this.flag) {
                    this.flag = false;
                    this.flag2 = true;
                    this.flag3 = true;
                    if(this.type=='normal'){
                        this.animateState = this.anim.play('top_idle');
                    }else if(this.type=='laser'){
                        this.animateState = this.anim.play('top_2_idle');
                    }else if(this.type=='shotgun'){
                        this.animateState = this.anim.play('top_2_idle');
                    }else if(this.type=='machinegun'){
                        this.animateState = this.anim.play('top_2_idle');
                    }
                }
            }

        }
    //}
    }

    onBeginContact(contact, self, other) {
        if(other.node.name == "winBound") {
            this.winNow();
        }
    }
}
