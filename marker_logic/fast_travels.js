function addFastTravels(map) {
    map.addInteractiveLayer('fast_travels', fast_travels, {
        name: "Fast Travels",
        create_checkbox: true,
        create_feature_popup: true,
        is_default: true,
        pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {
                icon: Utils.getCustomIcon('fast_travels'),
                riseOnHover: true
            });
        }
    });
}
