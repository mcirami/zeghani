<?php if(get_field('category_description')) : ?>
	<div class="description">
		<?php the_field('category_description'); ?>
	</div>
<?php endif; ?>

<?php get_template_part('content', 'filters'); ?>

<?php
	$mainCat = get_field('main_category');
	
	if( have_rows('collections') ): ?>

		<?php while ( have_rows('collections') ) : the_row(); ?>
			<div class="row">
				<?php $collection = get_sub_field('collection'); ?>
				
				<?php $link = get_term_link($collection->slug, $collection->taxonomy).$mainCat->slug; ?>
				<a href="<?php echo $link; ?>" class="collection_view_all">View All</a>
				<div class="collection_image">
					<?php $collection_image = get_field('collection_image', $collection); ?>
					<?php if($collection_image) : ?>
						<img src="<?php echo $collection_image['url']; ?>" alt="<?php echo $collection_image['alt']; ?>">
					<?php endif; ?>
					<a href="<?php echo $link; ?>" class="image_link"><?php echo $collection->name; ?>&raquo;</a>
				</div>
				
				<div class="collection_content">
					<h2><a href="<?php echo $link; ?>"><?php echo $collection->name; ?> Collection</a></h2>
					<p><?php echo $collection->description; ?></p>
				</div>
				
				<?php
					$args = array(
						'post_type' => 'product',
						'posts_per_page' => 3,
						'order' => 'ASC',
						'tax_query' => array(
							'relation' => 'AND',
							array(
								'taxonomy' => 'product_cat',
								'field' => 'slug',
								'terms' => $mainCat->slug,
							),
							array (
								'taxonomy' => 'collection',
								'field' => 'slug',
								'terms' => $collection->slug,
							)
						),
					);

					$query = new WP_Query($args); 
				?>
				
				<div class="products">
					<div class="product_grid">
					<?php while( $query->have_posts() ) : $query->the_post(); ?>
						<?php 
							$price = get_post_meta( get_the_ID(), '_regular_price', true);
							$productNumber = get_post_meta(get_the_ID(), 'productNumber', true);
							
							/*<div class="add_to_wish_list">
								<!--<a href="#" class="add_to_wish_list_button js_add_to_wish_list <?php check_wish_list_item( get_the_ID() ); ?>" data-product-id="<?php the_ID(); ?>"><span>add to wishlist</span></a>-->
							</div>*/
						?>
						<div class="product">
							<?php if(has_post_thumbnail()) : ?>
								<a href="<?php the_permalink(); ?>"><?php the_post_thumbnail(); ?></a>
							<?php else : ?>
								<a href="<?php the_permalink(); ?>"><img src="<?php echo bloginfo('template_url'); ?>/images/placeholder.jpg" alt="placeholder image" /></a>
							<?php endif; ?>							
							<p><?php echo $productNumber; ?></p>
						</div>
					<?php endwhile; ?>
					</div>
				</div>

			<?php wp_reset_postdata(); ?>
		</div>
	    <?php endwhile; ?>

	<?php endif; ?>