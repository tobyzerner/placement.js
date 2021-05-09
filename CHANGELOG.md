# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0-beta.4] - 2021-05-09
### Changed
- Reverted to `default` export.
- Refactored code to be more reliable and concise.

## [1.0.0-beta.3] - 2021-03-02
### Added
- Placement.js now accounts for nesting within positioned elements. The overlay should be positioned correctly no matter where it is.
- If the overlay is a descendant of a scroll container, its position will be bounded automatically so it doesn't overflow the container.

### Changed
- New API:
    - The module now exports the `place` function instead of a `default` export.
    - The order of the `anchor` and `overlay` arguments is swapped.
    - The `side` and `align` parameters have been combined into a single `placement` option.
- Smaller filesize. Now ~800 bytes!
- Updated demo – use the mouse to directly manipulate the anchor and overlay elements.

### Removed
- Margins are no longer subtracted when positioning the overlay. Instead, add margins selectively depending on the `[data-placement]` attribute selector.
- Removed the `fixed` option.
- Removed the `bound` option.
- Removed the ability to specify `Coordinates` or `Range` as the anchor.

[Unreleased]: https://github.com/tobyzerner/placement.js/compare/v1.0.0-beta.3...HEAD
[1.0.0-beta.3]: https://github.com/tobyzerner/placement.js/compare/v1.0.0-beta.2...v1.0.0-beta.3
