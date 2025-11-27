export async function findNearestFacilities(lat:number, lon:number, type:"hospital"|"clinic"|"pharmacy") {
  return [
    { name: "General Hospital", type: "hospital", distance_km: 2.1, map_url: "https://maps.example/hosp", phone:"+34 000 000 000" }
  ];
}