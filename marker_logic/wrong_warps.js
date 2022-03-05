function addWrongWarps(map) {
    map.addInteractiveLayer('wrong_warps', wrong_warps, {
        name: "Wrong Warps",
        create_checkbox: true,
        create_feature_popup: true,
        is_default: true,
        pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {
                icon: Utils.getCustomIcon('wrong_warps'),
                riseOnHover: true
            });
        }
    });
}
