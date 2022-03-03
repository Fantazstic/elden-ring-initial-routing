function addWaygates(map) {
    map.addInteractiveLayer('waygates', waygates, {
        name: "Waygates",
        create_checkbox: true,
        create_feature_popup: true,
        is_default: true,
        pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {
                icon: Utils.getCustomIcon('waygates'),
                riseOnHover: true
            });
        }
    });
}
