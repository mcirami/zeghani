<?php

/*
 * Template Name: Locations
 */

get_header(); ?>

	<div class="where_to_buy">
		<div class="container">
			<div class="store_page_title">
				<p>Zeghani is available only through authorized retailers. Please enter your ZIP/postal code below to find an authorized retailer near you. </p>
			</div>
		</div>
	
	    <section class="locations banner-locator">
	    	<div class="container">
		    	<div class="stores_container">
					<form action="#">
						<input class="wtb_search" type="text" maxlength="100" placeholder="enter zip code" />
						<input class="wtb_go" type="submit" value="Go" />
					</form>
					<div id="store-info">
						
					</div>
		    	</div>
				<div id="map"></div>
	    	</div>
	    </section>
	</div>

<?php get_footer(); ?>
