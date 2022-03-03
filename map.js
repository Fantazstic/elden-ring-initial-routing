var interactive_map = new InteractiveMap('map', {
    max_good_zoom: 5,
    max_map_zoom: 7,
    website_source: 'https://github.com/Fantazstic/elden-ring-initial-routing',
    website_subdir: 'elden-ring-initial-routing'
});

interactive_map.addTileLayer('Elden Ring Map', {
    minNativeZoom: 3,
    maxNativeZoom: 5
});

addFastTravels(interactive_map);
addWaygates(interactive_map);
addSkips(interactive_map);
addCutscenes(interactive_map);
addRequiredBosses(interactive_map);

interactive_map.finalize();
