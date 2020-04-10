<?php
/**
 * Single Product title
 *
 * @author 		WooThemes
 * @package 	WooCommerce/Templates
 * @version     1.6.4
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

global $products;

?>

<div class="product_title">
	
	<?php 
		global $post;
		$collections = get_the_terms($post->ID, 'collection');
		$i = 0;
		foreach ($collections as $collection) {
			if ($i < 1) {
				$collectionName = $collection->name.' Collection';
			}
			$i++;
		}
		
		$product_number = get_post_meta(get_the_ID(), 'productNumber', true);
	?>
	<!--<h2><?php //echo $collectionName; ?></h2>-->
	<div class="top_section">
		<h3 itemprop="name" class="product_title entry-title"><?php the_title(); ?></h3>
		<ul class="meta_links">
			<a href="#" class="meta_add_to_wish_list js_add_to_wish_list <?php check_wish_list_item( get_the_ID() ); ?>" data-product-id="<?php the_ID(); ?>"><span>Add to Wish List</span></a>
		<!--<a href="/send-a-hint?productID=<?php echo the_ID(); ?>" class="send_hint">Send a hint</a>
	        <?php 
		        if(function_exists('pf_show_link')) {
		        	echo pf_show_link();
		        } 
		    ?>-->
		</ul>
	</div>
	<h4><?php echo $product_number; ?></h4>
</div>
