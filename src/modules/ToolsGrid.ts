import jQuery from "jquery";

export default class ThemeToggler
{
    grid: any;
    name: JQuery<HTMLElement>;
    close: JQuery<HTMLSpanElement>;
    loader: JQuery<HTMLElement>;

    stapel: any;


    constructor(){
        this.grid = jQuery("#tp-grid");
        this.name = jQuery("#pile-name");
        this.loader = jQuery('<div class="loader">Loading...</div>').insertBefore(this.grid);
        this.close = jQuery("#close");

        this.stapel = this.grid.stapel({
          delay : 30,
          gutter : 60,
          pileAngles : 3,
          onLoad : (function(){ this.loader.remove();  }).bind(this),
          onBeforeOpen : (function( pileName: any ){ this.name.html( pileName ); }).bind(this),
          onAfterOpen : (function (){ this.close.show(); }).bind(this)
      });;
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