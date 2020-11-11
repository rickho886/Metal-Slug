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

var list = [];
var sorted;
var start = false;

@ccclass
export default class Leaderboard extends cc.Component {

    @property({type:cc.AudioClip})
    bgm: cc.AudioClip = null;

    

    start(){
        this.reset();
        cc.audioEngine.stopMusic();
        this.loadData();
        cc.find("Canvas/quit").on(cc.Node.EventType.MOUSE_DOWN, function() {
            this.loadMenuScene();
        },this);
        
    }

    reset() {
        list = [];
        sorted = null;
        start = false;
    }

    update(dt) {
        if(start) {
            this.updateUser();
        }
    }

    playBGM(){
        cc.audioEngine.playMusic(this.bgm, true);
    }

    private loadMenuScene() {
        cc.director.loadScene("after_login_menu");
    }

    private loadData() {
        firebase.auth().onAuthStateChanged(function(user) {
            var usersRef = firebase.database().ref("user_list/");
            usersRef.once('value').then(function(snapshot) {
                snapshot.forEach(function(element) {
                    list.push({score: element.val().score, email: element.key});
                });
            }).then(function() {
                sorted = list.sort(function(a, b) {return b.score - a.score})
            }).then(function() {
                start = true;
            })
        });
    }

    private updateUser() {
        if(sorted.length < 6) {
            for(var i = 0; i < sorted.length; i++) {
                cc.find("Canvas/leaderboard_background/" + (i+1) + "/email").getComponent(cc.Label).string = sorted[i].email;
                cc.find("Canvas/leaderboard_background/" + (i+1) + "/score").getComponent(cc.Label).string = sorted[i].score;
            }
        } else if(sorted.length > 5) {
            for(var i = 0; i < 5; i++) {
                cc.find("Canvas/leaderboard_background/" + (i+1) + "/email").getComponent(cc.Label).string = sorted[i].email;
                cc.find("Canvas/leaderboard_background/" + (i+1) + "/score").getComponent(cc.Label).string = sorted[i].score;
            }
        }
    }
}
