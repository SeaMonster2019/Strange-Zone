import { _decorator, Component, EventTouch, log, Node, UITransform, Vec2, Vec3, Widget } from 'cc';
import { mathTool } from './mathTool';
import { mainSceneControl } from './mainSceneControl';
const { ccclass, property } = _decorator;

@ccclass('controllerContrl')
export class controllerContrl extends Component {

    private __link:{
        handleBase?:Node;
        handleCenter?:Node;
    } = {}

    private __vec2StarPosition:Vec2 = new Vec2(0,0);
    private __bIsPress:boolean = false;

    protected onLoad():void{
        this.__linkNode();
        this.node.on(Node.EventType.TOUCH_START,this.__onTouchStart,this);
        this.node.on(Node.EventType.TOUCH_MOVE,this.__onTouchMove,this);
        this.node.on(Node.EventType.TOUCH_END,this.__onTouchEnd,this);
    }

    private __linkNode():void{
        this.__link.handleBase = this.node.getChildByName("base");
        this.__link.handleCenter = this.__link.handleBase.getChildByName("center");
    }

    private __onTouchStart(event:EventTouch):void{
        this.__bIsPress = true;
        const newVec2:Vec2 = event.getUILocation();
        const setVec3 = this.node.getComponent(UITransform).convertToNodeSpaceAR(new Vec3(newVec2.x,newVec2.y))
        this.__link.handleBase.setPosition(setVec3.x,setVec3.y);
    }

    private __onTouchEnd(event:EventTouch):void{
        this.__bIsPress = false;
        this.__link.handleBase.getComponent(Widget).left = 0;
        this.__link.handleBase.getComponent(Widget).right = 0;
        this.__link.handleCenter.getComponent(Widget).left = 0;
        this.__link.handleCenter.getComponent(Widget).right = 0;
    }

    private __onTouchMove(event:EventTouch):void{
        if(this.__bIsPress){

            const newVec2:Vec2 = event.getUILocation();
            let setVec3 = this.__link.handleBase.getComponent(UITransform).convertToNodeSpaceAR(new Vec3(newVec2.x,newVec2.y))
    
            if(Math.abs(setVec3.x)<15 && Math.abs(setVec3.y)<15){
                return;
            }

            const l_length:number = mathTool.calculateDistance(new Vec2(setVec3.x,setVec3.y),new Vec2(0,0))
            
            if(l_length > 75){
                const unitX = setVec3.x / l_length;  
                const unitY = setVec3.y / l_length;  
                setVec3.x  = 75 * unitX; 
                setVec3.y = 75 * unitY;
            }

            this.__link.handleCenter.setPosition(setVec3.x,setVec3.y);
            mainSceneControl.instance.rotateController(setVec3.x,setVec3.y)
        }
    }

}


