function addBosses(map) {
    map.addInteractiveLayer('bosses', bosses, {
        name: "Bosses",
        create_checkbox: true,
        create_feature_popup: true,
        is_default: true,
        pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {
                icon: Utils.getCustomIcon('bosses'),
                riseOnHover: true
            });
        }
    });
}
