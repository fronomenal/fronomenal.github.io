import jQuery from "jquery";

export default class ThemeToggler
{

    button: JQuery<HTMLButtonElement>;
    mainImage: JQuery<HTMLImageElement>;
    brandLogo: JQuery<HTMLImageElement>;
    reclineSloth: JQuery<HTMLImageElement>;
    svgs: JQuery<HTMLOrSVGElement>;


    constructor(){
        this.button = jQuery(".theme-wrapper input");
        this.mainImage = jQuery(".main-image");
        this.reclineSloth = jQuery("img#recline");
        this.brandLogo = jQuery(".header-brand a img");
        this.svgs = jQuery("img[src^='svgs']");
    }

    public registerEvents(){
        this.button.change(this.toggleAction.bind(this));
    }

    private toggleAction(){
        if(this.button.css("color") == "rgb(151, 66, 255)"){
            // dark to light
            document.documentElement.setAttribute('data-theme', 'light');
            console.log("light", this.button.css("color"))
            this.imageMode("light", "dark");
        }else{
            // light to dark
            document.documentElement.setAttribute('data-theme', 'dark');
            console.log("dark", this.button.css("color"))
            this.imageMode("dark", "light");
        }
    }

    private replaceImgSrc(picEl: JQuery, tc: string, fc: string){
        const oldAttr = picEl.attr("src");
        if (oldAttr){
            const newAttr = oldAttr.replace(fc, tc);
            picEl.attr("src", newAttr);
        }
    }

    private imageMode(toColor: string, fromColor: string) {
        const images = [this.mainImage, this.reclineSloth, this.brandLogo, this.svgs];
        for (let pic of images)
            this.replaceImgSrc(pic as JQuery<HTMLElement>, toColor, fromColor);
    }
}