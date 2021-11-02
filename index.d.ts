/**
 * Create an NSelector instance
 * @return {NSelector}        NSelector ganged selector.
 */
export class NSelector {
    /**
     * @param  {Array[]} matrix    An array or array of arrays of selectable items.
     * @param  {number} selection Current selection.
     * @param  {string} ns        Sparkles namespace.
     */
    constructor(matrix: any[][], selection: number, ns?: string);
    ns: string;
    emtr: any;
    matrix: any;
    primary: any;
    /**
     * Find the largest (maximal) index in the selector.
     * @return {number} Largest index value.
     */
    findLargestIndex(): number;
    /**
     * Find the primary index.
     * @param  {string} idx The index to find.
     * @return {number}     The position of the index.
     */
    findSelectionIndex(idx: string): number;
    /**
     * Find the position of the ID string.
     * @param  {number|string} id The ID to find.
     * @return {string}    [description]
     */
    findSelectionIndexByID(id: number | string): string;
    /**
     * Get currently selected item.
     * @return {any} Selected value.
     */
    get selected(): any;
    /**
     * Get Sparkles namespace
     * @return {string} Namespace.
     */
    get namespace(): string;
    /**
     * Get Sparkles emitter
     * @return {EventEmitter} Event emitter.
     */
    get emitter(): any;
    /**
     * Select an index in the selector.
     * @param  {number} id Index.
     * @return {any} Returned value.
     */
    select(id: number): any;
    selectedIndex: string;
    selectedPosition: any;
}
/**
 * Create a new n-selector.
 * @param  {Array[]} matrix    Array or array of arrays of selectable options.
 * @param  {number} selection Current selection.
 * @param  {string} ns        Sparkles emitter namespace.
 * @return {NSelector} NSelector ganged selector.
 */
export function createSelector(matrix: any[][], selection?: number, ns?: string): NSelector;
