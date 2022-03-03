function addSkips(map) {
    map.addInteractiveLayer('skips', skips, {
        name: "Skips",
        create_checkbox: true,
        create_feature_popup: true,
        is_default: true,
        pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {
                icon: Utils.getCustomIcon('skips'),
                riseOnHover: true
            });
        }
    });
}
