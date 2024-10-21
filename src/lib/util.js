import data from '$lib/data/data.json';

// where point, center = [x, y]
export const withinRadius = (point, center, radius) => {
  return Math.pow(point[0] - center[0], 2) + Math.pow(point[1] - center[1], 2) < Math.pow(radius, 2);
};


// distance of coords to meters
export function haversine(coord1, coord2){
  let [lat1, lon1] = coord1;
  let [lat2, lon2] = coord2;
  var R = 6378.137; // Radius of earth in KM
  var dLat = lat2 * Math.PI / 180 - lat1 * Math.PI / 180;
  var dLon = lon2 * Math.PI / 180 - lon1 * Math.PI / 180;
  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon/2) * Math.sin(dLon/2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c;
  return d * 1000; // meters
}


export function iconPath(typ) {
  if (typ === "audio") {
    return "/icons/audio-marker.svg";
  } else if (typ === "sound") {
    return "/icons/ear-marker.svg";
  } else if (typ === "ar") {
    return "/icons/3d-marker.svg";
  } else {
    return "/icons/audio-marker.svg";
  }
}

export function doesActivateFloatyPlayer(actualDistance, minDistance, point) {
  return (actualDistance < minDistance
    && !point.clickable);
}

export function checkForFloaty(currentPos, points, callback) {
  return points.some((val, index) => {
    let h = haversine(currentPos, val.coords);
//    console.log( data.config.radiusPOI)
    let isFloaty = doesActivateFloatyPlayer(h, data.config.radiusPOI, val);
//    console.log(val, isFloaty)
    if (isFloaty) {
      callback(val);
    }
    return isFloaty;
  });
}
