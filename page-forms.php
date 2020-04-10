<?php
/*
 * Template Name: Forms
 */

get_header(); ?>

    <section class="forms">
        <div class="container">
            <article class="content">
			    <?php while ( have_posts() ) : the_post(); ?>
			    	<?php if(have_rows('social_links')) : ?>
			    		<ul class="social_links">
			    		<?php while(have_rows('social_links')) : the_row(); ?>
			    			<?php $social_icon = get_sub_field('social_icon'); ?>
			    			<?php if($social_icon) : ?>
								<li><a href="<?php the_sub_field('social_link'); ?>"><img src="<?php echo $social_icon['url']; ?>" alt="<?php echo $social_icon['alt']; ?>"></a></li>
							<?php endif; ?>
			    		<?php endwhile; ?>
			    		</ul>
			    	<?php endif; ?>	
			        <?php the_content(); ?>
			    <?php endwhile; ?>
			</article>
        </div>
    </section>


<?php get_footer(); ?>