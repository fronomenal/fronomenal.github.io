import jQuery from "jquery";

jQuery(window).on("load",function(){
  jQuery('.page').css("opacity", 1);
  setTimeout(() => {
    jQuery(".loader-wrapper").fadeOut("slow");
    jQuery("body").css("overflow-y", "visible");
  }, 500);
});