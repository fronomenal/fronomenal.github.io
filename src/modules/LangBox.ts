import jQuery from "jquery";
// @ts-ignore
import CircleProgress from "js-circle-progress";

const languageProficiency = new Map<string, number>();

export default class LangBox
{
    imglinks: JQuery<HTMLAnchorElement>;
    detailLinks: JQuery<HTMLAnchorElement>;
    langProf: JQuery<HTMLDivElement>;
    genModal: JQuery<HTMLDivElement>;
    closeBtn: JQuery<HTMLElement>;

    body: JQuery<HTMLElement>;
    circProg: CircleProgress;


    constructor(){
        this.detailLinks = jQuery("a.details");
        this.imglinks = jQuery("a.prePhoto");
        this.langProf = jQuery(".lang-proficiency");
        this.genModal = jQuery("<div></div>", {"class":"cus-modal"});
        this.closeBtn = jQuery("<i></i>", {"class": "fas fa-times cus-close-btn"});

        this.body = jQuery("body");
        this.circProg = new CircleProgress(".pf-progress", {value: 0, max: 100, textFormat: "percent"});
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
      this.setProfMap();
      this.assignProDivValues(event.target);
      this.langProf.fadeIn();
    }

    private setProfMap(){
      this.detailLinks.each((_i, ele) => {
        if(ele.dataset.lang && ele.dataset.profLvl)
          languageProficiency.set(ele.dataset.lang, parseFloat(ele.dataset.profLvl))
      });
    }

    private assignProDivValues(tg: HTMLAnchorElement){
      const lang = tg.dataset.lang as string;
      this.langProf.find('h4').text(lang);
      const proficiency = languageProficiency.get(lang);
      if (proficiency) {
        this.langProf.find('.pf-progress').data("progress", proficiency);
        jQuery(".circle-progress-circle", ).css({"fill": "", "stroke-width": ""});

        if (proficiency >= 90) { this.langProf.find('.pf-level').html("Proficiency: <span>Expert</span>");}
        else if (proficiency >= 75) { this.langProf.find('.pf-level').html("Proficiency: <span>Advanced</span>");}
        else if (proficiency >= 65) { this.langProf.find('.pf-level').html("Proficiency: <span>Intermediate</span>");}
        else if (proficiency >= 60) { this.langProf.find('.pf-level').html("Proficiency: <span>Experienced</span>");}
        else {
          const deprecatedColor = "#D21404";
          this.langProf.find('.pf-level').html(`<span style='color: ${deprecatedColor}; text-transform: uppercase'>Deprecated</span>`); 
          jQuery(".circle-progress-circle", ).css({"fill": deprecatedColor, "stroke-width": "0px"})
        }

        this.circProg.value = proficiency;
      }
    }

    private createImgModal(src : string){
      const newImg : JQuery<HTMLImageElement> = jQuery("<img>", {src: src});
      this.genModal.html("");
      this.genModal.append(newImg, this.closeBtn);
      this.body.append(this.genModal);
    }

}