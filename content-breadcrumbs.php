<div class="container">

	<div class="breadcrumbs">
		<a href="/">Home</a>
		<?php if(is_404()) : ?>
			<p>Page Not Found</p>
		<?php else : ?>
			<?php 
				if(is_page()) :
					global $post;
				
					$parents = get_post_ancestors($post->ID);
					foreach($parents as $parent_id) :
			?>
						<a href="<?php echo get_the_permalink($parent_id); ?>"><?php echo get_the_title($parent_id); ?></a>
			<?php 
					endforeach;
				endif;
			?>
			<p><?php the_title(); ?></p>
		<?php endif; ?>
	</div>

</div>