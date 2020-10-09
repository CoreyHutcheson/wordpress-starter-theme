<?php
/**
 * FortyAU Starter Theme functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package FortyAU_Starter_Theme
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

$theme_includes = array(
	'/setup.php', 									// Theme setup and custom theme supports.
	'/enqueue.php',									// Enqueue scripts and styles.
	'/custom-header.php',						// Implement the Custom Header feature.
	'/template-tags.php',						// Custom template tags for this theme.
	'/template-functions.php',			// Functions which enhance the theme by hooking into WordPress.
	'/customizer.php',							// Customizer additions.
	'/hooks.php',										// Custom hooks.
	'/widget.php',									// Register widgets
	'/menus.php',										// Register nav menus
);

foreach ( $theme_includes as $file ) {
	require_once get_template_directory() . '/inc' . $file;
}