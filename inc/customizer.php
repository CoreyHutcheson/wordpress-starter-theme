<?php
/**
 * FortyAU Starter Theme Theme Customizer
 *
 * @package FortyAU_Starter_Theme
 */

/**
 * Add postMessage support for site title and description for the Theme Customizer.
 *
 * @param WP_Customize_Manager $wp_customize Theme Customizer object.
 */
function fourtyau_starter_theme_customize_register( $wp_customize ) {
	$wp_customize->get_setting( 'blogname' )->transport         = 'postMessage';
	$wp_customize->get_setting( 'blogdescription' )->transport  = 'postMessage';
	$wp_customize->get_setting( 'header_textcolor' )->transport = 'postMessage';

	if ( isset( $wp_customize->selective_refresh ) ) {
		$wp_customize->selective_refresh->add_partial(
			'blogname',
			array(
				'selector'        => '.site-title a',
				'render_callback' => 'fourtyau_starter_theme_customize_partial_blogname',
			)
		);
		$wp_customize->selective_refresh->add_partial(
			'blogdescription',
			array(
				'selector'        => '.site-description',
				'render_callback' => 'fourtyau_starter_theme_customize_partial_blogdescription',
			)
		);
	}
}
add_action( 'customize_register', 'fourtyau_starter_theme_customize_register' );

/**
 * Render the site title for the selective refresh partial.
 *
 * @return void
 */
function fourtyau_starter_theme_customize_partial_blogname() {
	bloginfo( 'name' );
}

/**
 * Render the site tagline for the selective refresh partial.
 *
 * @return void
 */
function fourtyau_starter_theme_customize_partial_blogdescription() {
	bloginfo( 'description' );
}

/**
 * Binds JS handlers to make Theme Customizer preview reload changes asynchronously.
 */
function fourtyau_starter_theme_customize_preview_js() {
	$paths = [
		'public' => get_template_directory_uri() . '/public/',
		'customizer' => glob(get_template_directory() . '/public/customizer-bundle.*.js')[0],
	];

	wp_enqueue_script( 'fourtyau-starter-theme-customizer', $paths['public'] . basename($paths['customizer']), array( 'customize-preview' ), false, true );
}
add_action( 'customize_preview_init', 'fourtyau_starter_theme_customize_preview_js' );
