// Examples of helper
hexo.extend.helper.register('relatedHtmlGenerator', function(args){
  if(!args || !args.json || args.json.length == 0)return "";
  
  var returnHTML = "";
  
  function generateHTML(list){
    
    var ret = "";
    ret += "<li class=\"" + args.class + "-item\">";
    
    if(list.date && list.date != ""){
        ret += '<div class="'+args.class+'-date">' + list.date + "</div>";
    }
    
    if(list.img && list.img != ""){
        ret += '<div class="'+args.class+'-img">' + '<img src="'+list.img+'" />' + "</div>";
    }
    ret += '<div class="'+args.class+'-title"><h3><a href="' + list.path + '" title="'+ list.title +'" rel="bookmark">'+ list.title + "</a></h3></div>";
    if(list.excerpt &&  list.excerpt != ""){
        ret += '<div class="'+args.class+'-excerpt"><p>' + list.excerpt + "</p></div>";
    }
    
    ret +=  "</li>";
    return ret;
  }
  
  for(var i=0; i<args.json.length; i++){
      returnHTML += generateHTML(args.json[i]);
  }
  
  if (returnHTML != "") {
    returnHTML = "<h3 class=\"article-related-link-title\">Related Posts</h3>\n" 
      + "<ul class=\"" + args.class + "\">" + returnHTML + "</ul>";
  }
  return returnHTML;
});
