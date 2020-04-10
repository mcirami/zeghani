<?php
/* *
 * Template Name: Collections Overview
 */
get_header(); ?>

	<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
	
	<?php get_template_part('content', 'breadcrumbs'); ?>
	
	<section class="category">
		<div class="large_container">
			<div class="collections_overview">
				
				<div class="collections_grid">
					<ul class="collections">
						<?php $collections = get_field('collections'); ?>
						<?php if($collections) : ?>
							<?php foreach($collections as $collection) : ?>
							<li class="collection_box">
								<?php $collectionImage = get_field('collection_image', 'collection_'.$collection->term_id); ?>
								<a href="<?php echo get_term_link($collection->term_id, 'collection'); ?>">
									<img src="<?php echo $collectionImage['url']; ?>" alt="<?php $collectionImage['alt']; ?>" />
									<div class="collection_title">
										<h3><?php echo $collection->name; ?></h3>
									</div>
								</a>
							</li>
							<?php endforeach; ?>
						<?php endif; ?>
						
					</ul>
				</div><!-- end collectionss_container -->
				<div class="collections_description">
					<div class="collections_copy">
						<?php if(get_field('content_title')) : ?>
							<h1><?php the_field('content_title'); ?></h1>
						<?php else : ?>
							<h1><?php the_title(); ?></h1>
						<?php endif; ?>
						<div class="content_wysiwyg">
							<?php the_content(); ?>
						</div>
						<?php if(get_field('show_quiz_link')) : ?>
							<div class="quiz_button_cta align-right">
								<p><span>Which Zeghani girl are you?</span> <a class="green_button chevron_button" href="">Take The Quiz</a></p>
							</div>
						<?php endif; ?>
					</div>
				</div><!-- end collections_description -->
				
			</div><!-- end collections_overview -->
		</div>
	</section>
	
	<?php endwhile; else: ?>
	
	<?php endif; ?>

<?php get_footer(); ?>