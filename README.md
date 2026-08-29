<p>
  <a href="https://editor42.com">
    <img src="https://editor42.com/img/logo/32px/editor42.png" alt="Editor42" height="80">
  </a>
</p>

<p>
  <a href="license.txt"><img src="https://editor42.com/img/badges/license-mit.svg" alt="License: MIT"></a>
  <a href="https://editor42.com/docs/changelog"><img src="https://editor42.com/img/badges/version.svg" alt="Version"></a>
</p>

# Editor42 distribution

This repository hosts the pre-built distribution of [Editor42](https://editor42.com), a free, open-source, MIT-licensed WYSIWYG HTML editor and an auditable fork of TinyMCE.

Only compiled, ready-to-use artifacts live here. The editor is developed in the [editor42com/editor42](https://github.com/editor42com/editor42) source repository - that is the place for the code itself, issues, and security reports.

## What is in here

- `editor42.min.js` / `editor42.js` - the editor bundle, minified and readable
- `editor42.d.ts` - TypeScript definitions
- `plugins/`, `themes/`, `models/`, `skins/`, `icons/`, `langs/` - the standard plugins, theme, skins, icons, and language packs
- `license.txt`, `notices.txt` - the MIT license and third-party notices

Two branches are published:

- **`editor42`** - the default distribution: fully debranded build (`window.editor42`)
- **`main`** - the build of the source `main` branch: the same editor, keeping TinyMCE-compatible identifiers (`window.tinymce`, `mce-`/`tox-` class names) for drop-in migrations

## Getting started

[**Install**](https://editor42.com/docs/install/) with your preferred deployment method:

- [**Self-hosted**](https://editor42.com/docs/install/self-hosted): take the files from this repository and host them on your own infrastructure
- [**CDN**](https://editor42.com/docs/install/cdn): load Editor42 straight from a content delivery network

## Links

- Website and documentation: [editor42.com](https://editor42.com)
- Source code, issues, security policy: [github.com/editor42com/editor42](https://github.com/editor42com/editor42)
- Changelog: [editor42.com/docs/changelog](https://editor42.com/docs/changelog)

## License

Editor42 is released under the [MIT license](license.txt). Use it in commercial, proprietary, or open-source projects without copyleft obligations.
