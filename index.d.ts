export var __esModule: boolean;
export class NSelector {
    constructor(matrix: any, selection: any, ns?: any);
    ns: any;
    emtr: any;
    matrix: any;
    primary: any;
    findLargestIndex(): any;
    findSelectionIndex(idx: any): any;
    findSelectionIndexByID(id: any): any;
    get selected(): any;
    get namespace(): any;
    get emitter(): any;
    select(id: any): any;
    selectedIndex: any;
    selectedPosition: any;
}
export function createSelector(matrix: any, selection?: number, ns?: any): NSelector;
