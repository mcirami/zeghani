<?php
/**
 * The Header for our theme.
 *
 * @package boiler
 */

?><!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7" <?php language_attributes(); ?>> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8" <?php language_attributes(); ?>> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9" <?php language_attributes(); ?>> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" <?php language_attributes(); ?>> <!--<![endif]-->
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<title><?php wp_title( '|', true, 'right' ); ?></title>

<link rel="profile" href="http://gmpg.org/xfn/11" />
<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>" />
<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBcj7KjtWqqcZB1t3nGoSwN6rHwCJ4qOMk"></script>

<link href='http://fonts.googleapis.com/css?family=Montserrat:400,700' rel='stylesheet' type='text/css'>
<script type="text/javascript" src="http://fast.fonts.net/jsapi/a39aa814-7d46-4ad5-9a19-052e289aade6.js"></script>

<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
	<!--[if lt IE 7]>
            <p class="chromeframe">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">activate Google Chrome Frame</a> to improve your experience.</p>
    <![endif]-->

	<header id="global_header">
        <div class="search">
            <div class="container">
                <div class="mobile_search">
                    <h3>Find a retailer:</h3>
                    <form action="#">
                        <input type="text" placeholder="Search by City, State, Zip or Postal Code"/>
                        <input type="submit" value="GO"/>
                    </form>
                    <div class="mobile_wish_list">
                        <h3 id="wish-list-header-menu"><a href="<?php echo get_permalink( get_page_by_path( 'wish-list' ) ); ?>">Wish List</a></h3>
                    </div>
                </div><!-- end of mobile search -->
                <div class="retailer">
                    <form action="#">
                        <input type="text" placeholder="Search by City, State, Zip or Postal Code"/>
                        <input type="submit" value="GO"/>
                    </form>
                    <h3>Find a retailer:</h3>
                </div>
                <div class="wish_list">
                    <h3 id="wish-list-header-menu"><a href="<?php echo get_permalink( get_page_by_path( 'wish-list' ) ); ?>">Wish List</a></h3>
                </div>
            </div>
        </div><!-- end of search container -->
		<div class="container">
            <div class="header_info">
                <h1 id="logo"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" title="<?php echo esc_attr( get_bloginfo( 'name', 'display' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></h1>
                <div class="mobile_logo">
                    <img class="mobile_logo" src="<?php bloginfo('template_url'); ?>/images/zeghan_logo.png" alt=""/>
                </div>
                <nav role="navigation">
                    <?php wp_nav_menu( array( 'theme_location' => 'primary', 'container' => false, 'menu_class' => 'header_menu' ) ); // remember to assign a menu in the admin to remove the container div ?>
                    <a class="search_icon" href="#" title="Search">
                        <img src="<?php bloginfo('template_url'); ?>/images/search_icon.png" alt="search"/>
                    </a>
                </nav>
                <div class="mobile_nav">
                    <a href="#" class="mobile_menu">Menu</a>
                </div><!-- end of mobile nav -->
            </div>
            <div class="search_box">
                <?php get_search_form(); ?>
            </div>
		</div>
	</header>