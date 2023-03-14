import jQuery from "jquery";
import {ScrollToSmooth, easeOutCubic} from 'scrolltosmooth';

export default class ThemeToggler
{
    grid: any;
    name: JQuery<HTMLElement>;
    close: JQuery<HTMLSpanElement>;
    loader: JQuery<HTMLElement>;

    stapel: any;
    smoothScroll: ScrollToSmooth | undefined;


    constructor(){
      this.grid = jQuery("#tp-grid");
      this.name = jQuery("#pile-name");
      this.loader = jQuery('<div class="loader">Loading...</div>').insertBefore(this.grid);
      this.close = jQuery("#close");

      this.stapel = this.grid.stapel({
        delay : 30,
        gutter : 60,
        pileAngles : 5,
        onLoad : () => this.loader.remove(),
        onBeforeOpen : ( pileName: any ) => this.name.html( pileName ),
        onAfterOpen :  () => this.close.show()
      });

        // @ts-ignore
      this.smoothScroll = new ScrollToSmooth("#recline", {
        targetAttribute: 'data-scrollto',
        duration: 400,
        durationRelative: false,
        durationMin: false,
        durationMax: false,
        easing: easeOutCubic,
        offset: null
      });
      this.smoothScroll.init();
    }

    public registerEvents(){
      this.close.click(this.toggleAction.bind(this));
    }

    private toggleAction(){
      this.close.hide();
      this.name.empty();
      this.stapel.closePile();
    }
}