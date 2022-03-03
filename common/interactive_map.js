class InteractiveMap {
    #cluster_group;
    #common_attribution = `
    <li>Icons and Map background from <a href="https://eldenring.wiki.fextralife.com/Interactive+Map" title="Fextralife Interactive Map">Fextralife</a> under <a href="https://fextralife.com/wiki-license/">CCA4</a>.</li>
    <li><a href="https://github.com/Leaflet/Leaflet" title="Leaflet">Leaflet</a> under <a href="https://github.com/Leaflet/Leaflet/blob/ee71642691c2c71605bacff69456760cfbc80a2a/LICENSE">BSD2</a>.</li>
    <li><a href="https://github.com/Leaflet/Leaflet.markercluster" title="Leaflet.markercluster">Leaflet.markercluster</a> under <a href="https://github.com/Leaflet/Leaflet.markercluster/blob/31360f226e1a40c03c71d68b016891beb5e63370/MIT-LICENCE.txt">MIT</a>.</li>
    <li><a href="https://github.com/ghybs/Leaflet.FeatureGroup.SubGroup" title="Leaflet.FeatureGroup.SubGroup">Leaflet.FeatureGroup.SubGroup</a> under <a href="https://github.com/ghybs/Leaflet.FeatureGroup.SubGroup/blob/c7ec78b0cf13be39b00d46beb50c954b8b4c78bb/LICENSE">BSD2</a>.</li>
    <li><a href="https://github.com/noerw/leaflet-sidebar-v2" title="leaflet-sidebar-v2">leaflet-sidebar-v2</a> under <a href="https://github.com/noerw/leaflet-sidebar-v2/blob/4ceb0006647c33afff9982502fb5e572eb514158/LICENSE">MIT</a>.</li>
    <li><a href="https://github.com/geoman-io/leaflet-geoman" title="Leaflet-Geoman">Leaflet-Geoman</a> under <a href="https://github.com/geoman-io/leaflet-geoman/blob/1fdc918fa39ffa84327fdf639fa75865168f716d/LICENSE">MIT</a>.</li>
    <li>Icons from <a href="https://fontawesome.com/" title="Font Awesome">Font Awesome</a> under <a href="https://fontawesome.com/license">CCA4</a>.</li>
    `
    #common_contribution = `
    <li>Soldat#0638 - Routing, design and implementation.</li>
    <li>omnistegan#7961 - Map background retrieval.</li>
    <li>nacitar sevaht#0475 - Map background retrieval.</li>
    `
    #common_guide = `
    1. Start
    <br>2. Gatefront - Get Torrent
    <br>3. Third Church of Marika - Site of Grace
    <br>4. Summonwater Village - Defeat Tibia Mariner
    <br>5. Fast travel - Third Church of Marika
    <br>6. Fort Haight - Acquire left half of the Dectus Medallion
    <br>7. Fast travel - Gatefront
    <br>8. Defeat Margit, the Fell Omen
    <br>9. Defeat Godrick the Grafted
    <br>10. Liurnia Site of Grace - Rest and teleport to Roundtable Hold
    <br>11. Talk to D at Roundtable Hold, show Deathroot and accept introduction to Gurranq
    <br>12. Fast travel - Third Church of Marika
    <br>13. Third Church of Marika - Go through waygate to Caelid
    <br>14. Minor Erdtree - Use Torrent lift behind the tree
    <br>15. Fort Faroth - Acquire right half of the Dectus Medallion
    <br>16. Fast travel - Forth Faroth
    <br>17. Church of the Plague - Site of Grace
    <br>18. Stake of Marika skip to Radahn
    <br>19. Defeat Starscourge Radahn
    <br>20. Fast travel - Lake-Facing Cliffs
    <br>21. Descend behind Site of Grace, path directly North
    <br>22. Choose the right side pathway, towards Carian Study Hall
    <br>23. Cross the rock beam after Artists Shack
    <br>24. Descend cliff protrusions to Grand Lift of Dectus
    <br>25. Enter Leyndell
    <br>26. Defeat Draconic Tree Sentinel
    <br>27. Defeat the Ghost of Godfrey, First Elden Lord
    <br>28. Defeat Morgott, the Omen King
    <br>29. Touch the thorns of the Erdtree, rest at Site of Grace and get Rold Medallion from Melina
    <br>30. Fast travel - Avenue Balcony
    <br>40. Forbidden Lands
    <br>41. Grand Lift of Rold
    <br>42. Mountaintops of the Giants
    <br>43. Defeat Fire Giant
    <br>44. Forge of the Giants, rest at Site of Grace and trigger The Burning
    <br>45. Crumbling Farum Azula
    <br>46. Defeat Godskin Duo
    <br>47. Defeat Beast Clergyman / Maliketh, the Black Blade
    <br>48. Defeat Sir Gideon Ofnir, The All-Knowing
    <br>49. Defeat Godfrey, First Elden Lord / Hoarah Loux, Warrior
    <br>50. Defeat Radagon of the Golden Order
    <br>51. Defeat Elden Beast
    <br>52. End
    `
    #custom_layers;
    #interactive_layers = new Map();
    #map;
    #overlay_maps = new Object();
    #share_marker;
    #sidebar;
    #tile_layers = new Object();
    #user_layers;
    #website_subdir = '';

    /**
     *
     * @param {string} id ID of the html div this map gets added to
     * @param {object} [args] Optional arguments
     * @param {string} [args.attribution=''] General attribution html list about used stuff. Wrap every attribution in its own `<li></li>`
     * @param {int} [args.max_good_zoom=5] Specify the maximum good looking zoom which will be used for location events
     * @param {int} [args.max_map_zoom=8] Maximum zoom the user can zoom to even if it looks ugly. Use a reasonable value here
     * @param {string} [args.website_source] Where to find the source of this interactive map
     * @param {string} [args.website_subdir] Subdir this interactive map will be hosted in
     */
    constructor(id, args) {
        let defaults = {
            maxClusterRadius: 0,
            attribution: '',
            max_good_zoom: 5,
            website_source: '',
            website_subdir: '',
            max_map_zoom: 8
        }
        let params = { ...defaults, ...args };

        this.#map = L.map(id, {
            attributionControl: false,
            crs: L.CRS.Simple,
            maxZoom: params.max_map_zoom,
        });;
        this.MAX_ZOOM = params.max_good_zoom;
        this.#website_subdir = params.website_subdir;

        this.#cluster_group = L.markerClusterGroup({
            spiderfyOnMaxZoom: true,
            maxClusterRadius: params.maxClusterRadius
        }).addTo(this.#map);

        this.#setUpToolbar();
        this.#setUpSidebar(params.attribution, params.website_source, this.#website_subdir);

        this.#user_layers = JSON.parse(localStorage.getItem(`${this.#website_subdir}:user_layers`));
        this.#share_marker = new ShareMarker(this);
        this.#custom_layers = new CustomLayers(this);

        this.#map.on('overlayadd', event => {
            this.addUserLayer(event.name);
        });
        this.#map.on('overlayremove ', event => {
            this.removeUserLayer(event.name);

            if (this.hasLayer(this.#getLayerByName(event.name))) {
                this.#getLayerByName(event.name).removeAllHighlights();
            }
        });
    }

    /**
     * Add a new background tile layer.
     *
     * Use tiled maps if possible, allows better zooming
     * Make sure tiling scheme is growing downwards!
     * https://github.com/commenthol/gdal2tiles-leaflet
     * https://github.com/Leaflet/Leaflet/issues/4333#issuecomment-199753161
     *
     * `./gdal2tiles.py -l -p raster -w none -z 3-5 full_map.jpg map_tiles`
     * @param {string} name Display name of this layer, also the ID
     * @param {object} [args] Optional arguments. Most likely you want to adapt `minNativeZoom` and `maxNativeZoom` to the generated tiles
     * @param {int} [args.minNativeZoom=3] The minimal zoom that can be found in the path
     * @param {int} [args.maxNativeZoom=5] The maximal zoom that can be found in the path
     * @param {string} [args.attribution=''] Tile layer specific attribution
     * @param {string} [url=map_tiles/{z}/{x}/{y}.png] Path to tile images
     */
    addTileLayer(name, args, url = `map_tiles/{z}/{x}/{y}.png`) {
        let defaults = {
            minNativeZoom: 3,
            maxNativeZoom: 5,
            noWrap: true,
            detectRetina: true
        }
        let params = { ...defaults, ...args };
        params.maxNativeZoom = L.Browser.retina ? params.maxNativeZoom - 1 : params.maxNativeZoom; // 1 level LOWER for high pixel ratio device.

        var tile_layer = new L.tileLayer(url, params);

        // Make first base layer visible by default
        if (Object.keys(this.#tile_layers).length < 1) {
            tile_layer.addTo(this.#map);
        }

        this.#tile_layers[name] = tile_layer;
    }

    /**
     * Add a new interactive layer to the interactive map from a geoJSON. Returns the layer to be able to e.g. add more geoJSONS.
     * @param {string} id Unique layer id
     * @param {string} geojson geoJSON with features to add
     * @param {object} [args] Optional arguments
     * @param {string} [args.name=this.id] Human readable display name of the layer. Default: `this.id`
     * @param {boolean} [args.create_checkbox=false] Create a sidebar with a trackable list. Default: false
     * @param {boolean} [args.create_feature_popup=false] Create a popup for the first batch of geoJSON features. Default: false
     * @param {boolean} [args.is_default=false] Show this layer by default if a user visits the map for the first time. Default: false
     * @param {string | function} [args.sidebar_icon_html=function () { return `<img class="sidebar-image" src="images/icons/${this.id}.png" />`; }] A html string for the sidebar icon. Can be a function which returns a html string. The function has access to values of this layer e.g. the `this.id`.
     * @param {function} [args.onEachFeature=function (feature, layer) { }] A function with stuff to do on each feature. Has access to values of this layer e.g. `this.id`. Default: `function (feature, layer) { }`
     * @param {function} [args.pointToLayer=function (feature, latlng) { return L.marker(latlng, { icon: Utils.getCustomIcon(this.id), riseOnHover: true }); }] A function describing what to do when putting a geoJSON point to a layer.
     * @param {object | function} [args.polygon_style=function (feature) { return {}; }] An object or function returning an object with L.Path options. https://leafletjs.com/reference.html#path
     * @param {object | function} [args.polygon_style_highlight=function () { return { opacity: 1.0, fillOpacity: 0.7 }}] An object or function returning an object with L.Path options. https://leafletjs.com/reference.html#path
     * @param {L.LayerGroup} [args.feature_group=L.featureGroup.subGroup(this.#interactive_map.getClusterGroup())] The group all geoJson features get added to. Defaults to the default marker cluster.
     * @returns InteractiveLayer
     */
    addInteractiveLayer(id, geojson, args) {
        let layer = new InteractiveLayer(id, geojson, this, args);

        this.#interactive_layers.set(layer.id, layer);

        return layer;
    }

    /**
     * Add a layer to the remembered user preferences.
     * @param {string} name Layer ID
     */
    addUserLayer(name) {
        if (!this.#user_layers.includes(name)) {
            this.#user_layers.push(name);
        }
        localStorage.setItem(`${this.#website_subdir}:user_layers`, JSON.stringify(this.#user_layers));
    }


    /**
     * Finalize the interactive map. Call this after adding all layers to the map.
     */
    finalize() {
        // Set the column size for each interactive layer sidebar
        this.getLayers().forEach((layer, id) => {
            layer.setSidebarColumnCount();
        });

        // Defining overlay maps - markers
        this.getLayers().forEach((layer, id) => {
            this.#overlay_maps[layer.name] = layer.getGroup();
        });

        // Add layer selection to map
        L.control.layers(this.#tile_layers, this.#overlay_maps, {
            hideSingleBase: true
        }).addTo(this.#map);

        // Add custom layers controls to map
        this.#custom_layers.updateControls();

        // Show remembered layers
        if (!this.#user_layers) {
            this.#user_layers = new Array();
            this.getLayers().forEach((layer, id) => {
                if (layer.isDefault()) {
                    this.#user_layers.push(layer.name);
                }
            });
        }
        this.getLayers().forEach((layer, id) => {
            if (this.#user_layers.includes(layer.name)) {
                layer.show();
            }
        });
        this.#custom_layers.addLayersToMap(this.#user_layers);

        // Center view over map
        this.zoomToBounds(this.#getBounds());

        // hide all previously checked marker
        this.getLayers().forEach((layer, layer_id) => {
            layer.getAllLayers().forEach((array, feature_id) => {
                // Remove if checked
                if (localStorage.getItem(`${this.#website_subdir}:${layer_id}:${feature_id}`)) {
                    array.forEach(feature => {
                        layer.removeLayer(feature);
                    });
                }
            });
        });

        // Search in url for marker and locate them
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        if (urlParams.has('share')) {
            const share = urlParams.get('share');

            let latlng = share.split(",");
            this.#share_marker.move([latlng[1], latlng[0]]);

            this.#share_marker.highlight();
            this.#share_marker.zoomTo();
        } else if (urlParams.has('list')) {
            const list = urlParams.get('list');

            if (this.hasLayer(list)) {
                var layer = this.getLayer(list);;

                // make group visible
                layer.show();

                if (!urlParams.has('id')) {
                    layer.zoomTo();

                    // if no id open sidebar
                    this.#sidebar._tabitems.every(element => {
                        if (element._id == list) {
                            this.#sidebar.open(list);
                            return false;
                        }
                        return true;
                    });
                } else {
                    const id = urlParams.get('id');

                    if (layer.hasFeature(id)) {
                        layer.highlightFeature(id);
                        layer.zoomToFeature(id);
                        this.#map.on('click', this.removeAllHighlights, this);
                    }

                    // TODO: unhide?
                }
            }
        }
    }

    /**
     * Get the parent marker cluster. Might not be used at all.
     * @returns L.MarkerClusterGroup
     */
    getClusterGroup() {
        return this.#cluster_group;
    }

    /**
     * Get the layer with a specific ID.
     * @param {string} id Layer ID
     * @returns InteractiveLayer
     */
    getLayer(id) {
        if (!this.#interactive_layers.has(id)) {
            return undefined;
        }

        return this.#interactive_layers.get(id);
    }

    /**
     * Get all layers this interactive map is aware of.
     * @returns Map<id, layer>
     */
    getLayers() {
        return this.#interactive_layers;
    }

    /**
     * Get the leaflet map.
     * @returns L.Map
     */
    getMap() {
        return this.#map;
    }

    /**
     * Get the maximum good looking zoom value.
     * @returns integer
     */
    getMaxZoom() {
        return this.MAX_ZOOM;
    }

    /**
     * Get the share marker for this interactive map.
     * @returns ShareMarker
     */
    getShareMarker() {
        return this.#share_marker;
    }

    /**
     * Get the sidebar associated to this interactive map.
     * @returns L.Control.Sidebar
     */
    getSidebar() {
        return this.#sidebar;
    }

    /**
     * Get the subdirectory this interactive map is associated to.
     * @returns string
     */
    getWebsiteSubdir() {
        return this.#website_subdir;
    }

    /**
     * Get a list off all layer IDs currently in the user preferences.
     * @returns string[]
     */
    // getUserLayers() {
    //     return this.#user_layers;
    // }

    /**
     * Check if this interactive map has a specific layer group.
     * @param {string} id Layer group ID
     * @returns boolean
     */
    hasLayer(id) {
        return this.#interactive_layers.has(id);
    }

    /**
     * Remove all currently active highlights.
     */
    removeAllHighlights() {
        this.getLayers().forEach((layer, id) => {
            layer.removeAllHighlights();
        });

        this.#share_marker.removeHighlight();

        this.#map.off('click', this.removeAllHighlights, this);
    }

    /**
     * Remove a layer from the remembered user preferences.
     * @param {string} name ID of the layer
     */
    removeUserLayer(name) {
        this.#user_layers = this.#user_layers.filter((value, index, array) => {
            return value != name;
        });
        localStorage.setItem(`${this.#website_subdir}:user_layers`, JSON.stringify(this.#user_layers));
    }

    /**
     * Zoom to given bounds on this interactive map.
     * @param {L.LatLngBounds | L.LatLng[] | L.Point[] | Array[]} bounds Bounds to zoom to. Can be an array of points.
     */
    zoomToBounds(bounds) {
        this.#map.fitBounds(bounds, {
            maxZoom: this.MAX_ZOOM
        });
    }

    /**
     * Initialize the sidebar.
     * @param {string} attribution General attribution list about used stuff
     * @param {string} website Where to find the source of this interactive map
     * @param {string} website_subdir Subdir this interactive map will be hosted in
     */
    #setUpSidebar(attribution, website, website_subdir) {
        this.#sidebar = L.control.sidebar({
            autopan: true,
            closeButton: true,
            container: 'sidebar',
            position: 'left'
        }).addTo(this.#map);

        this.#sidebar.addPanel({
            id: 'guide',
            tab: '<i class="fas fa-question"></i>',
            title: 'Route Walkthrough',
            position: 'bottom',
            pane: `<ul>${this.#common_guide}</ul>`
        });

        this.#sidebar.addPanel({
            id: 'edit',
            tab: '<i class="fas fa-map-marked"></i>',
            title: 'Add or edit marker',
            position: 'bottom',
            button: () => {
                if (!this.#custom_layers.isInEditMode()) {
                    this.#custom_layers.enableEditing();
                } else {
                    this.#custom_layers.disableEditing();
                }
            }
        });

        // make resetting localStorage possible
        this.#sidebar.addPanel({
            id: 'reset',
            tab: '<i class="fas fa-trash"></i>',
            position: 'bottom',
            button: () => {
                if (!confirm('Really delete all marked locations and all custom marker layers?')) {
                    return;
                }

                window.onbeforeunload = () => { };

                for (var key in localStorage) {
                    if (key.startsWith(`${website_subdir}:`)) {
                        localStorage.removeItem(key);
                    }
                };

                location.reload();
            }
        });

        this.#sidebar.addPanel({
            id: 'attributions',
            tab: '<i class="fas fa-info-circle"></i>',
            title: 'Attributions',
            position: 'bottom',
            pane: `
            <h3>Contributors:</h3><ul>${attribution}${this.#common_contribution}</ul>
            <h3>This project uses:</h3><ul>${attribution}${this.#common_attribution}</ul>
            `
        });

        this.#sidebar.addPanel({
            id: 'github',
            tab: '<i class="fab fa-github"></i>',
            position: 'bottom',
            button: website
        });


        // make group visible on pane opening
        this.#sidebar.on('content', event => {
            if (event.id == 'attributions') return;
            if (event.id == 'guide') return;

            this.#map.addLayer(this.#interactive_layers.get(event.id).getGroup());
            Utils.setHistoryState(event.id);
            this.getShareMarker().removeMarker();
        });

        this.#sidebar.on('closing', () => {
            Utils.setHistoryState(undefined, undefined, this.#website_subdir);
            this.getShareMarker().removeMarker();
        })
    }

    /**
     * Initialize the editing toolbar.
     */
    #setUpToolbar() {
        // Disable general editing
        L.PM.setOptIn(true);

        this.#map.pm.Toolbar.createCustomControl({
            name: 'add_layer',
            block: 'custom',
            title: 'Add custom layer',
            className: 'fas fa-plus',
            toggle: false,
            onClick: () => {
                this.#custom_layers.createLayer();
            }
        });
        this.#map.pm.Toolbar.createCustomControl({
            name: 'remove_layer',
            block: 'custom',
            title: 'Remove custom layer',
            className: 'fas fa-trash',
            toggle: false,
            onClick: () => {
                this.#custom_layers.removeLayer();
            }
        });
        this.#map.pm.Toolbar.createCustomControl({
            name: 'export_layer',
            block: 'custom',
            title: 'Export custom layer',
            className: 'fas fa-file-download',
            toggle: false,
            onClick: () => {
                this.#custom_layers.exportLayer();
            }
        });
        this.#map.pm.addControls({
            position: 'bottomright',
            drawCircleMarker: false,
            oneBlock: false
        });
        this.#map.pm.toggleControls(); // hide by default
    }

    /**
     * Get the outer bounds of all layers on a map, including currently hidden layers.
     * @returns L.LatLngBounds
     */
    #getBounds() {
        var bounds = L.latLngBounds();

        this.getLayers().forEach((layer, k) => {
            bounds.extend(layer.getGroupBounds());
        });

        return bounds;
    }

    /**
     * Get a layer by its name.
     * @param {string} name Layer name
     * @returns L.Layer
     */
    #getLayerByName(name) {
        var interactive_layer = undefined;
        this.#interactive_layers.forEach((layer, id) => {
            if (layer.name == name) {
                interactive_layer = layer;
            }
        });

        return interactive_layer;
    }
}
