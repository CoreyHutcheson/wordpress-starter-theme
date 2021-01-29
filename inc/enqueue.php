<?php
/**
 * Registers & Enqueues main theme stylesheet & js script
 */
function fortyau_starter_theme_scripts() {
	$paths = [
		'public' => get_template_directory_uri() . '/public/',
		'css' => glob(get_template_directory() . '/public/style.*.css')[0],
		'js' => glob(get_template_directory() . '/public/index-bundle.*.js')[0],
	];

	// Enqueues bundled styles (entry point /src/sass/style.scss)
	wp_enqueue_style( 'theme-styles', $paths['public'] . basename($paths['css']));

	// Enqueues bundled scripts (entry point /src/js/index.js)
	wp_enqueue_script( 'theme-scripts', $paths['public'] . basename($paths['js']), array('jquery'), false, true );

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
}
add_action( 'wp_enqueue_scripts', 'fortyau_starter_theme_scripts' );

/**
 * Font Awesome CDN Setup Webfont
 */
if (!function_exists('fa_custom_setup_cdn_webfont')) {
  function fa_custom_setup_cdn_webfont($cdn_url = '', $integrity = null) {
    $matches = [];
    $match_result = preg_match('|/([^/]+?)\.css$|', $cdn_url, $matches);
    $resource_handle_uniqueness = $match_result === 1 ? $matches[1] : md5($cdn_url);
    $resource_handle = "font-awesome-cdn-webfont-$resource_handle_uniqueness";

    foreach (['wp_enqueue_scripts', 'admin_enqueue_scripts', 'login_enqueue_scripts'] as $action) {
      add_action($action, function () use ($cdn_url, $resource_handle) {
        wp_enqueue_style($resource_handle, $cdn_url, [], null);
      });
    }

    if ($integrity) {
      add_filter(
        'style_loader_tag',
        function ($html, $handle) use ($resource_handle, $integrity) {
          if (in_array($handle, [$resource_handle], true)) {
            return preg_replace('/\/>$/', 'integrity="' . $integrity . '" crossorigin="anonymous" />', $html, 1);
          } else {
            return $html;
          }
        },
        10,
        2
      );
    }
  }
}

fa_custom_setup_cdn_webfont(
  'https://use.fontawesome.com/releases/v5.11.2/css/all.css',
  'sha384-KA6wR/X5RY4zFAHpv/CnoG2UW1uogYfdnP67Uv7eULvTveboZJg0qUpmJZb5VqzN'
);
fa_custom_setup_cdn_webfont('https://use.fontawesome.com/releases/v5.11.2/css/v4-shims.css');