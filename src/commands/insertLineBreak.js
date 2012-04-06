(function(wysihtml5) {
  var undef,
      LINE_BREAK = "<p>" + (wysihtml5.browser.needsSpaceAfterLineBreak() ? " " : "");

  wysihtml5.commands.insertLineBreak = {
    exec: function(composer, command) {
      wysihtml5.commands.formatBlock.exec(composer, "formatBlock", "P", null, null);
    },

    state: function() {
      return false;
    },

    value: function() {
      return undef;
    }
  };
})(wysihtml5);