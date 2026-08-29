/**
 * Editor42 version 42.0.0 (2026-08-29)
 */

(function () {
    'use strict';

    const Cell = initial => {
      let value = initial;
      const get = () => {
        return value;
      };
      const set = v => {
        value = v;
      };
      return {
        get,
        set
      };
    };

    var global = editor42.util.Tools.resolve('editor42.PluginManager');

    const fireVisualBlocks = (editor, state) => {
      editor.dispatch('VisualBlocks', { state });
    };

    const toggleVisualBlocks = (editor, pluginUrl, enabledState) => {
      const dom = editor.dom;
      dom.toggleClass(editor.getBody(), 'editor42-m-visualblocks');
      enabledState.set(!enabledState.get());
      fireVisualBlocks(editor, enabledState.get());
    };

    const register$2 = (editor, pluginUrl, enabledState) => {
      editor.addCommand('editor42VisualBlocks', () => {
        toggleVisualBlocks(editor, pluginUrl, enabledState);
      });
    };

    const option = name => editor => editor.options.get(name);
    const register$1 = editor => {
      const registerOption = editor.options.register;
      registerOption('visualblocks_default_state', {
        processor: 'boolean',
        default: false
      });
    };
    const isEnabledByDefault = option('visualblocks_default_state');

    const setup = (editor, pluginUrl, enabledState) => {
      editor.on('PreviewFormats AfterPreviewFormats', e => {
        if (enabledState.get()) {
          editor.dom.toggleClass(editor.getBody(), 'editor42-m-visualblocks', e.type === 'afterpreviewformats');
        }
      });
      editor.on('init', () => {
        if (isEnabledByDefault(editor)) {
          toggleVisualBlocks(editor, pluginUrl, enabledState);
        }
      });
    };

    const toggleActiveState = (editor, enabledState) => api => {
      api.setActive(enabledState.get());
      const editorEventCallback = e => api.setActive(e.state);
      editor.on('VisualBlocks', editorEventCallback);
      return () => editor.off('VisualBlocks', editorEventCallback);
    };
    const register = (editor, enabledState) => {
      const onAction = () => editor.execCommand('editor42VisualBlocks');
      editor.ui.registry.addToggleButton('visualblocks', {
        icon: 'visualblocks',
        tooltip: 'Show blocks',
        onAction,
        onSetup: toggleActiveState(editor, enabledState)
      });
      editor.ui.registry.addToggleMenuItem('visualblocks', {
        text: 'Show blocks',
        icon: 'visualblocks',
        onAction,
        onSetup: toggleActiveState(editor, enabledState)
      });
    };

    var Plugin = () => {
      global.add('visualblocks', (editor, pluginUrl) => {
        register$1(editor);
        const enabledState = Cell(false);
        register$2(editor, pluginUrl, enabledState);
        register(editor, enabledState);
        setup(editor, pluginUrl, enabledState);
      });
    };

    Plugin();

})();
