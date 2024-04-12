import { Vec2 } from "cc";

export namespace mathTool{

    /** 计算距离
     * @param point1 
     * @param point2 
     * @returns 
     */
    export function calculateDistance(point1:Vec2, point2:Vec2):number{  
        const dx = point1.x - point2.x;  
        const dy = point1.y - point2.y;  
        return Math.sqrt(dx * dx + dy * dy);  
    }

}

