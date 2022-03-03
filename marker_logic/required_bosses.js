function addRequiredBosses(map) {
    map.addInteractiveLayer('required_bosses', required_bosses, {
        name: "Required Bosses",
        create_checkbox: true,
        create_feature_popup: true,
        is_default: true,
        pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {
                icon: Utils.getCustomIcon('required_bosses'),
                riseOnHover: true
            });
        }
    });
}
