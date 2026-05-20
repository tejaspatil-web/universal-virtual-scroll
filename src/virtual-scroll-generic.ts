export interface UniversalVirtualScrollConfig {

    viewport: HTMLElement;

    content: HTMLElement;

    items: any[];

    itemHeight?: number;

    itemWidth?: number;

    buffer?: number;

    onUpdate: (
        visibleItems: any[],
        paddingTop: number,
        paddingBottom: number
    ) => void;
}

export class UniversalVirtualScroll {

    private viewport: HTMLElement;

    private content: HTMLElement;

    private items: any[];

    private itemHeight: number | null;

    private itemWidth: number | null;

    private buffer: number;

    private onUpdate: Function;

    private scrollListener: () => void;

    private resizeListener: () => void;

    constructor(
        config: UniversalVirtualScrollConfig
    ) {

        this.viewport = config.viewport;

        this.content = config.content;

        this.items = config.items || [];

        this.itemHeight =
            config.itemHeight || null;

        this.itemWidth =
            config.itemWidth || null;

        this.buffer =
            config.buffer || 5;

        this.onUpdate =
            config.onUpdate;

        this.scrollListener =
            () => this.calculate();

        this.resizeListener =
            () => this.calculate();

        this.viewport.addEventListener(
            'scroll',
            this.scrollListener,
            { passive: true }
        );

        window.addEventListener(
            'resize',
            this.resizeListener
        );

        requestAnimationFrame(() => {

            this.detectItemSize();

            this.calculate();

        });
    }

    private detectItemSize(): boolean {

        const firstItem =
            this.content.querySelector(
                '[data-virtual-item]'
            ) as HTMLElement;

        if (!firstItem) {
            return false;
        }

        const rect =
            firstItem.getBoundingClientRect();

        this.itemHeight ||= rect.height;

        this.itemWidth ||= rect.width;

        return true;
    }

    calculate(): void {

        if (!this.items.length) {

            this.onUpdate([], 0, 0);

            return;
        }

        if (!this.itemHeight ||
            !this.itemWidth) {

            const detected =
                this.detectItemSize();

            if (!detected) return;
        }

        const viewportHeight =
            this.viewport.clientHeight;

        const viewportWidth =
            this.viewport.clientWidth;

        const cols = Math.max(
            1,
            Math.floor(
                viewportWidth /
                this.itemWidth!
            )
        );

        const visibleRows =
            Math.ceil(
                viewportHeight /
                this.itemHeight!
            );

        const pageSize =
            (visibleRows + this.buffer)
            * cols;

        const scrollTop =
            this.viewport.scrollTop;

        const startRow =
            Math.floor(
                scrollTop /
                this.itemHeight!
            );

        const start = Math.max(
            0,
            startRow * cols -
            this.buffer * cols
        );

        const end = Math.min(
            this.items.length,
            start + pageSize
        );

        const slicedList =
            this.items.slice(start, end);

        const paddingTop =
            Math.floor(start / cols)
            * this.itemHeight!;

        const remainingItems =
            this.items.length - end;

        const paddingBottom =
            Math.ceil(
                remainingItems / cols
            ) * this.itemHeight!;

        this.onUpdate(
            slicedList,
            paddingTop,
            paddingBottom
        );
    }

    updateItems(items: any[]): void {

        this.items = items;

        this.calculate();
    }

    destroy(): void {

        this.viewport.removeEventListener(
            'scroll',
            this.scrollListener
        );

        window.removeEventListener(
            'resize',
            this.resizeListener
        );
    }
}