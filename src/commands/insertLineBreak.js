(function(wysihtml5) {
  var undef,
      LINE_BREAK = "<br>" + (wysihtml5.browser.needsSpaceAfterLineBreak() ? " " : "");

  wysihtml5.commands.insertLineBreak = {
    exec: function(composer, command) {
      console.log(composer.config.breakElement);
      if (composer.config.breakElement === null){
        if (composer.commands.support(command)) {
          composer.doc.execCommand(command, false, null);
          if (!wysihtml5.browser.autoScrollsToCaret()) {
            composer.selection.scrollIntoView();
          }
        } else {
          composer.commands.exec("insertHTML", LINE_BREAK);
        }
      }else{
        console.log('formatting Block in ilb');
        wysihtml5.commands.formatBlock.exec(composer, "formatBlock", composer.config.breakElement);
        composer.commands.exec("insertHTML", LINE_BREAK);
      }
    },

    state: function() {
      return false;
    },

    value: function() {
      return undef;
    }
  };
})(wysihtml5);