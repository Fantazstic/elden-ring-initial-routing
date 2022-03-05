function addSteps(map) {
    map.addInteractiveLayer('steps', steps, {
        name: "Steps",
        create_checkbox: true,
        create_feature_popup: true,
        is_default: true,
        pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {
                icon: Utils.getCustomIcon('steps'),
                riseOnHover: true
            });
        }
    });
}
