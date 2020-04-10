<?php
/**
 * The template used for displaying page content in page.php
 *
 * @package boiler
 */
?>
	<div class="image_left">
		<?php the_post_thumbnail('large'); ?>
	</div>

	<div class="content_right">
		<?php the_content(); ?>
	</div>