/**
 * Calculates the Haversine distance between two points on the surface of a sphere
 * with a given radius (default is the Earth's radius of 6371 kilometers).
 *
 * @param {number} lat1 - latitude of the first point
 * @param {number} lon1 - longitude of the first point
 * @param {number} lat2 - latitude of the second point
 * @param {number} lon2 - longitude of the second point
 * @param {number} [radius=6371] - radius of the sphere (default is the Earth's radius in kilometers)
 * @returns {number} The distance between the two points in kilometers
 */
function calculateHaversineDistance(lat1, lon1, lat2, lon2) {
  const Radius = 6371; // Radius of Earth in kilometers
  const dLatitude = (lat2 - lat1) * Math.PI / 180;
  const dLongitude = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLatitude / 2) * Math.sin(dLatitude / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLongitude / 2) * Math.sin(dLongitude / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); // angular distance in radians
  const distance = Radius * c; // Distance in km
  return distance;
}

module.exports = calculateHaversineDistance;

