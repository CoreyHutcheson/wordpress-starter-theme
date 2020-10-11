<?php
/**
 * Enqueue scripts and styles.
 */
function fortyau_starter_theme_scripts() {
	$paths = [
		'public' => get_template_directory_uri() . '/public/',
		'js' => glob(get_template_directory() . '/public/index-bundle.*.js')[0],
		'css' => glob(get_template_directory() . '/public/style.*.css')[0],
	];

	// Enqueues bundled styles (entry point /src/sass/style.scss)
	wp_enqueue_style( 'theme-styles', $paths['public'] . basename($paths['css']));
	// Enqueues bundled scripts (entry point /src/js/index.js)
	wp_enqueue_script( 'theme-scripts', $paths['public'] . basename($paths['js']), array(), false, true );

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
}
add_action( 'wp_enqueue_scripts', 'fortyau_starter_theme_scripts' );