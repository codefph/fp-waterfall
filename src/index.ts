interface WaterfallOption {
    wrapper: string,
    columnWidth?: number,
    gap?: number,
    delay?: number
}
class Waterfall {
    private columnWidth = 200
    private wrapper: HTMLElement
    private wrapperWidth = 0
    private delay = 100
    private columnCount = 0
    // 最新4列的高度
    private lastColumnCountHeights: number[] = []
    private gap = 0
    constructor(option: WaterfallOption) {
        if (!option.wrapper) {
            throw new Error('wrapper is required')
        }
        this.wrapper = document.querySelector(option.wrapper) as HTMLElement
        if (!this.wrapper) {
            throw new Error('wrapper not found')
        }
        if (option.columnWidth) {
            this.columnWidth = option.columnWidth
        }
        if(option.gap){
            this.gap = option.gap
        }
        if(option.delay){
            this.delay = option.delay
        }
        this.init()
    }
    init() {
        this.wrapper.style.position = 'relative'
        for (let i = 0; i < this.wrapper.children.length; i++) {
            const item = this.wrapper.children[i] as HTMLElement
            item.style.position = 'absolute'
            item.style.width = `${this.columnWidth}px`
        }
        setInterval(() => {
            this.render()
        }, this.delay);
    }

    render() {
        if (!this.wrapper || !this.wrapper.children.length) {
            return
        }
        // 1. 先计算 columnCount
        // 2. 将最近渲染的 columnCount 个的每个高度记录下来到lastColumnCountHeights，默认为每个高度0
        // 3. 渲染时，取lastColumnCountHeights中最小的那个高度作为渲染高度，下标作为渲染列
        // 4. 当前item渲染完之后，将当前最小lastColumnCountHeights的index重新复制为当前item的offsetTop+当前item的高度clientHeight
        // 5. 渲染下一个时，重复第三步
        // 6. 渲染完成后，将所有item的高度设置为lastColumnCountHeights中最大的那个高度

        this.wrapperWidth = this.wrapper.clientWidth
        this.columnCount = Math.floor(this.wrapperWidth / this.columnWidth)
        const gapWidth = (this.columnCount - 1) * this.gap
        this.columnCount = Math.floor((this.wrapperWidth - gapWidth) / this.columnWidth)

        // 偏移量，用于居中对齐
        const offsetLeft = (this.wrapperWidth - gapWidth - this.columnWidth * this.columnCount) / 2

        this.lastColumnCountHeights = new Array(this.columnCount).fill(0)
        for (let i = 0; i < this.wrapper.children.length; i++) {
            const item = this.wrapper.children[i] as HTMLElement
            // 最小高度
            const lastMinHeight = Math.min(...this.lastColumnCountHeights) || 0
            const minIndex = this.lastColumnCountHeights.findIndex( (x:number) => x === lastMinHeight)
            const itemHeight = item.clientHeight
            const itemOffsetTop = item.offsetTop
            item.style.top = (lastMinHeight + ( i < this.columnCount ? 0 : this.gap)) + 'px'
            item.style.left = `${offsetLeft + this.columnWidth * (minIndex % this.columnCount) + this.gap * (minIndex % this.columnCount)}px`
            this.lastColumnCountHeights[minIndex] = itemOffsetTop + itemHeight
        }
        const maxHeight = Math.max(...this.lastColumnCountHeights)
        this.wrapper.style.height = maxHeight + 'px'
    }
}
export default Waterfall