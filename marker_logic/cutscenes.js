function addCutscenes(map) {
    map.addInteractiveLayer('cutscenes', cutscenes, {
        name: "Cutscenes",
        create_checkbox: true,
        create_feature_popup: true,
        is_default: true,
        pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {
                icon: Utils.getCustomIcon('cutscenes'),
                riseOnHover: true
            });
        }
    });
}
