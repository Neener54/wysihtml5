(function(wysihtml5) {
  var undef;
  
  wysihtml5.commands.insertOrderedList = {
    exec: function(composer, command) {
      var doc = composer.doc,
          selectedNode,
          isEmpty,
          tempElement,
          list;

      if (composer.commands.support(command)) {
        doc.execCommand(command, false, null);
      } else {
        selectedNode = composer.selection.getSelectedNode();
        list = wysihtml5.dom.getParentElement(selectedNode, { nodeName: ["UL", "OL"] }, 4);
        if (!list) {
          tempElement = doc.createElement("span");
          composer.selection.surround(tempElement);
          isEmpty = tempElement.innerHTML === "" || tempElement.innerHTML === wysihtml5.INVISIBLE_SPACE;
          composer.selection.executeAndRestoreSimple(function() {
            list = wysihtml5.dom.convertToList(tempElement, "ol");
          });

          if (isEmpty) {
            composer.selection.selectNode(list.querySelector("li"));
          }
          return;
        }

        composer.selection.executeAndRestoreSimple(function() {
          if (list.nodeName === "OL") {
            // Unwrap list
            // <ol><li>foo</li><li>bar</li></ol>
            // becomes:
            // foo<br>bar<br>
            wysihtml5.dom.resolveList(list);
          } else if (list.nodeName === "UL" || list.nodeName === "MENU") {
            // Turn an unordered list into an ordered list
            // <ul><li>foo</li><li>bar</li></ul>
            // becomes:
            // <ol><li>foo</li><li>bar</li></ol>
            wysihtml5.dom.renameElement(list, "ol");
          }
        });
      }
    },

    state: function(composer, command) {
      try {
        return composer.doc.queryCommandState(command);
      } catch(e) {
        return false;
      }
    },

    value: function() {
      return undef;
    }
  };
})(wysihtml5);