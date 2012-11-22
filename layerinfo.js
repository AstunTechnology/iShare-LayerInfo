astun.layersHoverInfo = {

    // Add an entry for each layer. The layer name should be as found
    // in the mapfile.
    // Ensure that all lines except the last end with a comma
    "Wards" : "Ward boundaries maintained by the Office of National Statistics",
    "SchoolsPrim" : "Primary Schools maintained by the Local Authority"

};

(function() {

    // Wait until all of our dependencies are
    // met such as jQuery being loaded, we're on
    // a map page and the layer control has loaded
    var timer = setInterval(function() {
        if (typeof jQuery != 'undefined') {
            if(jQuery('#atMyMaps').length) {
                if (jQuery('div#showmapcategories .atLayerSet').length) {
                    clearInterval(timer);
                    layerinfo();
                }
            } else {
                clearInterval(timer);
            }
        }
    }, 100);

    // Adds a tooltip to each of the layers in the
    // astun.layersHoverInfo list
    function layerinfo() {

        // Append the tooltip to the page and hide it
        jQuery('body').append(
            jQuery('<div/>')
                .hide()
                .addClass('atLayerInfoTooltip ui-state-default ui-corner-all')
                .append('<div><span class="ui-icon ui-icon-triangle-1-n"></span><div class="text"></div></div>')
        );

        // Add listeners to each layer in the list and decorate the
        // layer name with an info icon
        jQuery.each(astun.layersHoverInfo, function(key, value) {
            jQuery('li[aria-describedby="'+key+'"]')
                .find('a > span')
                .live('mouseover', function(){
                    var t = jQuery(this).offset().top + jQuery(this).parents('li').height() + 10;
                    var l = jQuery(this).parents('li').offset().left;
                    var w = jQuery(this).parents('li').width();
                    jQuery('.atLayerInfoTooltip')
                        .css({'top':t, 'left':l, 'width':w})
                        .show()
                        .find('.text').html(value);
                })
                .live('mouseout', function(){
                    jQuery('.atLayerInfoTooltip').hide();
                })
                .append('<span class="atLayerInfoIcon"></span>');
        });

    }

})();
