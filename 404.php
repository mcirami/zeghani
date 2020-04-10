<?php
/**
 * The template for displaying 404 pages (Not Found).
 *
 * @package boiler
 */

get_header(); ?>

	<section class="page_not_found">
		
		<?php get_template_part('content', 'breadcrumbs'); ?>
		
        <div class="container">
            <h2>OOPS!</h2>
            <p>We are sorry, the details of this page must have changed.</p>
        </div>
	</section>

<?php get_footer(); ?>