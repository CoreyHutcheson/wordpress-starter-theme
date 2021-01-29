## TODO

---

## Theme Setup
  - Change Browsersync proxy within 'webpack.config.js' to match site's local address (ie. http://localhost:8080)

### Theme Includes
- Bootstrap v4.5.2
- FontAwesome v5.11.2
- jQuery v3.5.1

### Node Version
  - node 12.13.0
  - npm v6.14.2

### Theme Scripts
- `npm start` - Alias for `npm run watch`. Starts browsersync and builds for development.
- `npm run build` - Builds for production.
- `npm run dev` - Builds for development. No browsersync.
- `npm run watch` - Starts browsersync and builds for development. Watching changes to files.

## Working within Theme
  - Header Nav
    - Bootstrap Nav Walker (https://github.com/wp-bootstrap/wp-bootstrap-navwalker)
      - Icon: Add FontAwesome or glyphicon classes via WP menu CSS Classes
      - Icon-Only: Additionally add bootstraps screen-reader class (.sr-only) to hide text
  - CTA Button
    - template part found in `/template-parts/components/cta-button.php`
    - ACF CTA Button component in `Components - CTA Button`
    - If using seamless, then no need to pass variable to template part
    - If using as group, then pass group to template part using `set_query_var('cta_button', get_sub_field('group_name'))`