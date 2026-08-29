/**
 * Editor42 version 42.0.0 (2026-08-29)
 */

(function () {
    'use strict';

    var global$2 = editor42.util.Tools.resolve('editor42.PluginManager');

    const isSimpleType = type => value => typeof value === type;
    const isFunction = isSimpleType('function');

    var global$1 = editor42.util.Tools.resolve('editor42.dom.DOMUtils');

    var global = editor42.util.Tools.resolve('editor42.util.Tools');

    const option = name => editor => editor.options.get(name);
    const register$2 = editor => {
      const registerOption = editor.options.register;
      registerOption('save_enablewhendirty', {
        processor: 'boolean',
        default: true
      });
      registerOption('save_onsavecallback', { processor: 'function' });
      registerOption('save_oncancelcallback', { processor: 'function' });
    };
    const enableWhenDirty = option('save_enablewhendirty');
    const getOnSaveCallback = option('save_onsavecallback');
    const getOnCancelCallback = option('save_oncancelcallback');

    const displayErrorMessage = (editor, message) => {
      editor.notificationManager.open({
        text: message,
        type: 'error'
      });
    };
    const save = editor => {
      const formObj = global$1.DOM.getParent(editor.id, 'form');
      if (enableWhenDirty(editor) && !editor.isDirty()) {
        return;
      }
      editor.save();
      const onSaveCallback = getOnSaveCallback(editor);
      if (isFunction(onSaveCallback)) {
        onSaveCallback.call(editor, editor);
        editor.nodeChanged();
        return;
      }
      if (formObj) {
        editor.setDirty(false);
        if (!formObj.onsubmit || formObj.onsubmit()) {
          if (typeof formObj.submit === 'function') {
            formObj.submit();
          } else {
            displayErrorMessage(editor, 'Error: Form submit field collision.');
          }
        }
        editor.nodeChanged();
      } else {
        displayErrorMessage(editor, 'Error: No form element found.');
      }
    };
    const cancel = editor => {
      const h = global.trim(editor.startContent);
      const onCancelCallback = getOnCancelCallback(editor);
      if (isFunction(onCancelCallback)) {
        onCancelCallback.call(editor, editor);
        return;
      }
      editor.resetContent(h);
    };

    const register$1 = editor => {
      editor.addCommand('editor42Save', () => {
        save(editor);
      });
      editor.addCommand('editor42Cancel', () => {
        cancel(editor);
      });
    };

    const stateToggle = editor => api => {
      const handler = () => {
        api.setEnabled(!enableWhenDirty(editor) || editor.isDirty());
      };
      handler();
      editor.on('NodeChange dirty', handler);
      return () => editor.off('NodeChange dirty', handler);
    };
    const register = editor => {
      editor.ui.registry.addButton('save', {
        icon: 'save',
        tooltip: 'Save',
        enabled: false,
        onAction: () => editor.execCommand('editor42Save'),
        onSetup: stateToggle(editor)
      });
      editor.ui.registry.addButton('cancel', {
        icon: 'cancel',
        tooltip: 'Cancel',
        enabled: false,
        onAction: () => editor.execCommand('editor42Cancel'),
        onSetup: stateToggle(editor)
      });
      editor.addShortcut('Meta+S', '', 'editor42Save');
    };

    var Plugin = () => {
      global$2.add('save', editor => {
        register$2(editor);
        register(editor);
        register$1(editor);
      });
    };

    Plugin();

})();
