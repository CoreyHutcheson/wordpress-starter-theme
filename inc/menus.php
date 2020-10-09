<?php
/**
 * Register nav menus to be used via wp_nav_menu()
 */
add_action( 'after_setup_theme', function() {
  register_nav_menus(
    array(
      'primary-menu' => esc_html__( 'Primary', 'fourtyau-starter-theme' ),
    )
  );
});