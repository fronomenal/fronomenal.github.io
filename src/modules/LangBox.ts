import jQuery from "jquery";

export default class LangBox
{
    imglinks: JQuery<HTMLAnchorElement>;
    genModal: JQuery<HTMLDivElement>;
    closeBtn: JQuery<HTMLElement>;
    detailLinks: JQuery<HTMLAnchorElement>;

    body: JQuery<HTMLElement>;


    constructor(){
        this.detailLinks = jQuery("a.details");
        this.imglinks = jQuery("a.prePhoto");
        this.genModal = jQuery("<div></div>", {"class":"cus-modal"});
        this.closeBtn = jQuery('<i></i>', {"class": "fas fa-times cus-close-btn"});

        this.body = jQuery("body");
    }

    public registerEvents(){
      this.imglinks.click(this.toggleLightbox.bind(this));
      this.detailLinks.click(this.toggleLangDetails.bind(this));

      // event handling for dynamic buttons
      this.body.on('click', '.cus-close-btn', ()=> this.genModal.remove());
    }

    private toggleLightbox(event: any){
      event.preventDefault();
      const imgSrc : string = event.target.getAttribute("href");
      this.createImgModal(imgSrc);
    }

    private toggleLangDetails(event: any){
      event.preventDefault();
    }

    private createImgModal(src : string){
      const newImg : JQuery<HTMLImageElement> = jQuery("<img>", {src: src});
      this.genModal.html("");
      this.genModal.append(newImg, this.closeBtn);
      this.body.append(this.genModal);
    }

}