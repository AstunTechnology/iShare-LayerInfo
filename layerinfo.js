Astun.layersHoverInfo = {

    // Add an entry for each layer. The layer name should be as found
    // in the mapfile.
    // Ensure that all lines except the last end with a comma
    "Wards_OGC" : "Ward boundaries maintained by the Office of National Statistics",
    "Primary_Schools_OGC" : "Primary Schools maintained by the Local Authority"

};

// The event that will cause the info to show, commonly 'mouseover' or 'mouseup'
Astun.layersHoverInfoShowEvent = 'mouseover';

// -- Do not edit past this point -- //

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

        // Determine the event that will trigger the info being shown
        var showEventName = Astun.layersHoverInfoShowEvent || 'mouseover';

        // Add listeners to each layer in the list and decorate the
        // layer name with an info icon
        jQuery.each(Astun.layersHoverInfo, function(key, value) {
            // we have switched from using the aria- attributes to using data-
            // custom attributes but we still need to retain backwards compatibility,
            // so we search for both
            jQuery('li[data-layer-name="' + key + '"] a > span,li[aria-describedby="' + key + '"] a > span')
                .live(showEventName, function(){
                    var $layerInfoIcon = jQuery(this).find('.atLayerInfoIcon');
                    var t = $layerInfoIcon.offset().top + $layerInfoIcon.height() + 5;
                    var l = jQuery(this).parents('li').offset().left;
                    var w = jQuery(this).parents('li').width();
                    jQuery('.atLayerInfoTooltip')
                        .css({'top':t, 'left':l, 'width':w})
                        .show()
                        .find('.text').html(value);
                })
                .live('mouseout', hideInfoTooltip)
                .append('<span class="atLayerInfoIcon"></span>');
        });

        // Global handler to hide the info tooltip when the user
        // touches anywhere
        jQuery('body').live('touchstart', hideInfoTooltip);

        function hideInfoTooltip(e) {
            if (jQuery(e.srcElement).hasClass('atLayerInfoIcon') || jQuery(e.relatedTarget).hasClass('atLayerInfoIcon')) {
                // Ignore the event as the mouse has just moved to the icon
            } else {
                jQuery('.atLayerInfoTooltip').hide();
            }
        }

    }

})();
