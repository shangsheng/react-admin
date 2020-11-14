let marker = null;
export function amapSetMarker(lnglat,map){
    if(marker){
        map.remove(marker);
        marker = null;
    }
    console.log(lnglat)
    marker = new AMap.Marker({
        position:[lnglat.lng,lnglat.lat],
        // map:map
    })
    console.log(marker)
    map.add(marker);
    map.setFitView();
}

export function amapClearMarker(map){
    if(marker){
        map.remove(marker);
        marker = null;
    }
}