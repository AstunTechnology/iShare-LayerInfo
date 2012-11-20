// Add an entry for each Layer: layer name as found in the mapfile and the text to be displayed
astun.layersHoverInfo = {
    'wards' : 'Ward boundaries maintained by the Office of National Statistics',
    'rightsofway' : 'Rights of way routes are approximately plotted, hence indicative only.'
};

(function() {

    var timer = setInterval(function() {
        if (typeof jQuery != 'undefined') {
            if(jQuery('#atMyMaps').length) {
                var panels = jQuery('#panels');
                if (panels.length) {
                    clearInterval(timer);
                    layerinfo();
                }
            } else {
                clearInterval(timer);
            }
        }
    }, 100);

    function layerinfo() {

        jQuery('body').append(
            jQuery('<div/>')
                .hide()
                .addClass('atLayerInfoTooltip ui-state-default ui-corner-all')
                .append('<div><span class="ui-icon ui-icon-triangle-1-n"></span><span class="text"></span></div>')
        );

        jQuery.each(astun.layersHoverInfo, function(key, value) {
            jQuery('li[aria-describedby="'+key+'"]')
                .find('a span')
                .live('mouseover', function(){
                    var t = jQuery(this).offset().top + jQuery(this).parents('li').height() + 10;
                    var l = jQuery(this).parents('li').offset().left;
                    var w = jQuery(this).parents('li').width();
                    jQuery('.atLayerInfoTooltip')
                        .css({'top':t, 'left':l, 'width':w})
                        .show()
                        .find('div span:last').html(value);
                })
                .live('mouseout', function(){
                    jQuery('.atLayerInfoTooltip').hide();
                })
                .append('<span class="atLayerInfoIcon"></span>');
        });

    }

})();
