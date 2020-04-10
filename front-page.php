<?php get_header(); ?>

<section class="homepage">
	<div class="slider">
		<div class="swiper-container">
		    <div class="swiper-wrapper">
			    <?php if(have_rows('homepage_slides')) : ?>
					<?php while(have_rows('homepage_slides')) : the_row(); ?>
						<div class="swiper-slide" style="background-image: url('<?php the_sub_field("slide_image"); ?>');">
					        <div class="slide_content <?php the_sub_field('content_color'); ?>">
						        <div class="container">
							        <?php the_sub_field('slide_content'); ?>
						        </div>
					        </div>
					    </div>
					<?php endwhile; ?>
				<?php endif; ?>
		    </div>
		    
		    <div class="swiper-pagination"></div>
		    
		    <div class="swiper-button-prev"></div>
		    <div class="swiper-button-next"></div>
		</div>
	</div>
	<div class="bottom_navigation">
		<div class="container">
			<?php if(have_rows('middle_navigation')) : ?>
				<?php while(have_rows('middle_navigation')) : the_row(); ?>
					<?php if(get_sub_field('link_content')) : ?>
						<a href="<?php the_sub_field('link_location'); ?>">
							<div class="column">
								<h3><?php the_sub_field('link_content'); ?></h3>
								<?php if(get_sub_field('extra_content')) : ?>
									<div class="extra">
										<p><?php the_sub_field('extra_content'); ?></p>
									</div>
								<?php endif; ?>
							</div>
						</a>
					<?php endif; ?>
				<?php endwhile; ?>
			<?php endif; ?>
		</div>
	</div>
</section>

<?php get_footer(); ?>