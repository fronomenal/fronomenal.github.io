import jQuery from "jquery";
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
        this.langProf = jQuery('.lang-proficiency');
        this.genModal = jQuery("<div></div>", {"class":"cus-modal"});
        this.closeBtn = jQuery('<i></i>', {"class": "fas fa-times cus-close-btn"});

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
      this.detailLinks.each((i, ele) => {
        if(ele.dataset.lang && i <= 2){
          languageProficiency.set(ele.dataset.lang, 50)
        }else if(ele.dataset.lang && i <= 7){
          if(i > 5) languageProficiency.set(ele.dataset.lang, 75)
          else languageProficiency.set(ele.dataset.lang, 65)
        }else if(ele.dataset.lang && i >= 8){
          languageProficiency.set(ele.dataset.lang, 90)
        }
      });
    }

    private assignProDivValues(tg: HTMLAnchorElement){
      const lang = tg.dataset.lang as string;
      this.langProf.find('h4').text(lang);
      const proficiency = languageProficiency.get(lang);
      if (proficiency) {
        this.langProf.find('.pf-progress').data("progress", proficiency);

        if (proficiency >= 90) this.langProf.find('.pf-level').html("Proficiency: <span>Senior</span>")
        else if (proficiency >= 65) this.langProf.find('.pf-level').html("Proficiency: <span>Intermediate</span>")
        else this.langProf.find('.pf-level').html("Proficiency: <span>Junior</span>");

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