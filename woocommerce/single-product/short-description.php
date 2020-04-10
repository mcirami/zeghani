<?php
/**
 * Single product short description
 *
 * @author 		WooThemes
 * @package 	WooCommerce/Templates
 * @version     1.6.4
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

global $post;
global $product;

//if ( ! $post->post_excerpt ) {
//	return;
//}

?>
<div class="wc_product_desc" itemprop="description">
	<?php the_content(); ?>
	<?php //echo apply_filters( 'woocommerce_short_description', $post->post_excerpt ) ?>
</div>

<div class="product_specs">
	<?php
		$metal_code_width = get_post_meta(get_the_ID(), 'metal_code_width', true);
		$setting_style = get_post_meta(get_the_ID(), 'setting_style', true);
		$size = get_post_meta(get_the_ID(), 'size', true);
		$metal_code = get_post_meta(get_the_ID(), 'metal_code', true);
		$metal_type = get_post_meta(get_the_ID(), 'metal_type', true);
		$head_size = get_post_meta(get_the_ID(), 'head_size', true);
		$head_shape = get_post_meta(get_the_ID(), 'head_shape', true);
		$head_type = get_post_meta(get_the_ID(), 'head_type', true);
		
	?>
	
	<div class="full_width_column">
		<?php if($metal_code_width) : ?>
			<p> <?php echo $metal_code_width; ?></p>
		<?php endif; ?>
		<?php if($setting_style) : ?>
			<p> <?php echo $setting_style; ?></p>
		<?php endif; ?>
		<?php if($size) : ?>
			<p> <?php echo $size; ?></p>
		<?php endif; ?>
	</div>
	
	<?php if($head_size) : ?>
		<div class="column">
			<p><?php echo $head_size ?></p>
			<p>Head Size</p>
		</div>
	<?php endif; ?>
	<?php if($head_shape) : ?>
		<div class="column">
			<p><?php echo $head_shape ?></p>
			<p>Head Shape</p>
		</div>
	<?php endif; ?>
	<?php if($head_type) : ?>
		<div class="column">
			<p><?php echo $head_type ?></p>
			<p>Head Type</p>
		</div>
	<?php endif; ?>
	<?php if($metal_code) : ?>
		<div class="column">
			<p><?php echo $metal_code ?></p>
			<p>Metal Code</p>
		</div>
	<?php endif; ?>
		<?php if($metal_type) : ?>
		<div class="column">
			<p><?php echo $metal_type ?></p>
			<p>Metal Type</p>
		</div>
	<?php endif; ?>
</div>
