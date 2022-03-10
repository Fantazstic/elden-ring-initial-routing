function addUpgrades(map) {
    map.addInteractiveLayer('upgrades', upgrades, {
        name: "Upgrades",
        create_checkbox: true,
        create_feature_popup: true,
        is_default: false,
        pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {
                icon: Utils.getCustomIcon('upgrades'),
                riseOnHover: true
            });
        }
    });
}
