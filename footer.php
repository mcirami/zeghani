<?php
/**
 * The template for displaying the footer.
 *
 * @package boiler
 */
?>

	<footer id="global_footer" class="site_footer">
		<div class="container">
			<div class="footer_nav_wrap">
				<?php wp_nav_menu( array( 'theme_location' => 'footer', 'container' => false, 'menu_class' => 'footer_nav' ) ); // remember to assign a menu in the admin to remove the container div ?>
			</div>
			<div class="column social_media">
				<h4>Social</h4>
				<?php if (have_rows('social_media_footer' , 'option')) : ?>
					<?php while (have_rows('social_media_footer', 'option')) : the_row(); ?>
						<?php $image = get_sub_field('icon', 'option'); ?>
							<div class="image_wrap">
								<a href="<?php the_sub_field('link', 'option'); ?>">
									<img src="<?php echo $image['url']; ?>"/>
								</a>
							</div>
					<?php endwhile; ?>
				<?php endif; ?>
			</div>
			<div class="column footer_form">
				<h4>Newsletters</h4>
				<?php gravity_form( 1, false, false, false, '', false ); ?>
			</div>
			<div class="footer_bottom">
				<div class="copy_wrap">
					<p>Authorized Retailer Login</p>
					<p class="copy">&copy; <?php echo date('Y '); ?> BY <?php bloginfo(' site_title'); ?>
						<a href="#">Privacy Policy | </a>
						<a href="#">Terms And Conditions</a>
					</p>
				</div>
			</div>
			
		</div>
	</footer>

<?php wp_footer(); ?>

</body>
</html>