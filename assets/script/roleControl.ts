import { _decorator, animation, AnimationComponent, Component, log, Node } from 'cc';
const { ccclass, property } = _decorator;

/** 角色方向 */
export enum ERoleDirection{
    FRONT = 0,
    LEFT = 1,
    RIGHT = 2,
    BACK = 3,
}

@ccclass('roleControl')
export class roleControl extends Component {

    private __bIsInited:boolean = true;    
    private __link:{
        animationController?:animation.AnimationController;
    } = {}

    public init(){
        if(this.__bIsInited){
            this.__link.animationController = this.node.getComponent(animation.AnimationController);
            this.__bIsInited = false;
        }
    }

    public move(p_eDirection:ERoleDirection){
        switch(p_eDirection){
            case ERoleDirection.FRONT:{
                this.__link.animationController.setValue("nDirection",0);
                break;
            }
            case ERoleDirection.LEFT:{
                this.__link.animationController.setValue("nDirection",1);
                break;
            }
            case ERoleDirection.RIGHT:{
                this.__link.animationController.setValue("nDirection",2);
                break;
            }
            case ERoleDirection.BACK:{
                this.__link.animationController.setValue("nDirection",3);
                break;
            }
        }
        this.__link.animationController.setValue("bMove",true);
    }

    public stopMove(){
        this.__link.animationController.setValue("bMove",false);
    }
}


