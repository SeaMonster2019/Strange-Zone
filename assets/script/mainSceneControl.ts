import { _decorator, Component, error, log, Node } from 'cc';
import { ERoleDirection, roleControl } from './roleControl';
import { mapContrl } from './mapContrl';
const { ccclass, property } = _decorator;

@ccclass('mainSceneControl')
export class mainSceneControl extends Component {

    public static instance:mainSceneControl = undefined;
    private __bIsInited:boolean = true;
    private __link:{
        chris?:roleControl;
        mapControl?:mapContrl;
    } = {}

    protected onDestroy():void {
        mainSceneControl.instance = undefined;
    }

    protected onLoad():void {
        if(this.__bIsInited && mainSceneControl.instance === undefined ){
            mainSceneControl.instance = this;
            this.linkNode();
            this.__link.chris.init();
            this.__bIsInited = false;
        }
    }

    private linkNode():void{
        this.__link.mapControl = this.node.getChildByName("Map").getComponent(mapContrl);
        this.__link.chris = this.node.getChildByName("Map").getChildByName("roles").getChildByName("chris").getComponent(roleControl);
    }

    public rotateController(x:number,y:number){
        if(Math.abs(x) >=  Math.abs(y)){
            if(x>0){
                this.__link.chris.move(ERoleDirection.RIGHT);
            }else{
                this.__link.chris.move(ERoleDirection.LEFT);
            }
        }{
            if(y>0){
                this.__link.chris.move(ERoleDirection.BACK);
            }else{
                this.__link.chris.move(ERoleDirection.FRONT);
            }
        }
    }

    public releaseController(){
        this.__link.chris.stopMove();
    }
}


