(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['main'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "Pause";
  }

function program3(depth0,data) {
  
  
  return "Play";
  }

function program5(depth0,data) {
  
  
  return "pause";
  }

function program7(depth0,data) {
  
  
  return "play";
  }

function program9(depth0,data) {
  
  
  return "selected";
  }

  buffer += "<div class='player'>\n  <img src=\"";
  if (stack1 = helpers.art) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.art); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\"/>\n  <div class='info'>\n    <h3>";
  if (stack1 = helpers.track) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.track); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</h3>\n    <h4>";
  if (stack1 = helpers.author) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.author); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</h4>\n  </div>\n  <div class='controls'>\n    <a class='back' href=\"#\" title=\"Previous song\"><i class='fa fa-fast-backward fa-2x'/></a>\n    <a class='play' href=\"#\" title=\"";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isPlaying), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\"><i class='fa fa-";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isPlaying), {hash:{},inverse:self.program(7, program7, data),fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " fa-2x'/></a>\n    <a class='next' href=\"#\" title=\"Next song\"><i class='fa fa-fast-forward fa-2x'/></a>\n    <div class='thumbs'>\n      <a class='up' href=\"#\" title=\"Thumbs up\"><i class='fa fa-thumbs-up ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.thumbUp), {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "'/></a>\n      <a class='down' href=\"#\" title=\"Thumbs down\"><i class='fa fa-thumbs-down ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.thumbDown), {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "'/></a>\n    </div>\n  </div>\n  <a class='popout' title='Open a separate window'><i class='fa fa-external-link'/></a>\n  <a class='open' href=\"#\" title=\"Switch to Google Music tab\"><i class='fa fa-headphones'/></a>\n</div>\n";
  return buffer;
  });
})();
