function addItems(map) {
    map.addInteractiveLayer('items', items, {
        name: "Items",
        create_checkbox: true,
        create_feature_popup: true,
        is_default: false,
        pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {
                icon: Utils.getCustomIcon('items'),
                riseOnHover: true
            });
        }
    });
}
