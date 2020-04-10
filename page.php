<?php
/**
 * The template for displaying all pages.
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site will use a
 * different template.
 *
 * @package boiler
 */

get_header(); ?>

	<section class="large_container">
		
		<?php while ( have_posts() ) : the_post(); ?>
		
			<div class="container">
		
				<?php get_template_part( 'content', 'breadcrumbs' ); ?>
			
			</div>
	
			<?php get_template_part( 'content', 'page' ); ?>
	
		<?php endwhile; // end of the loop. ?>
		
	</section>

<?php get_footer(); ?>