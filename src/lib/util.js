import data from '$lib/data/data.json';

// where point, center = [x, y]
export const withinRadius = (point, center, radius) => {
  return Math.pow(point[0] - center[0], 2) + Math.pow(point[1] - center[1], 2) < Math.pow(radius, 2);
};


// distance of coords to meters
export function haversine(coord1, coord2) {
  if (coord1.length !== 2 || coord2.length !== 2) {
    return false;
  }
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
          && point.audioSrc);
}

export function checkForFloaty(currentPos, points, callback) {
  return points.some((val, index) => {
    let h = haversine(currentPos, val.coords);
    let isFloaty = doesActivateFloatyPlayer(h, data.config.radiusPOI, val);
    if (isFloaty) {
      callback(val);
    }
    return isFloaty;
  });
}


function toRadians(deg) {
  return deg * Math.PI / 180;
}

function toDeg(rad) {
  return rad * 180 / Math.PI;
}

export function calcBearing(old, mew) {
  if (old && mew) {
    let lat1 = toRadians(old[0]);
    let lon1 = toRadians(old[1]);
    let lat2 = toRadians(mew[0]);
    let lon2 = toRadians(mew[1]);

    let bearing = Math.atan2(
      Math.sin(lon2 - lon1) * Math.cos(lat2),
      Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1)
    );

    bearing = toDeg(bearing);
    bearing =(bearing + 360) % 360;
    return bearing;
  } else {
    return false;
  }

}
