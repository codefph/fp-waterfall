declare module 'fp-waterfall' {
    interface WaterfallOption {
        wrapper: string
        columnWidth?: number
        gap?: number
        delay?: number
    }
    class Waterfall {
        constructor(option: WaterfallOption)
    }
    export default Waterfall
}