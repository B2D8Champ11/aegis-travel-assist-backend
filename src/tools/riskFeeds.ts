export async function getRiskIntel(country:string){
  return {
    sources: [
      "https://wwwnc.cdc.gov/travel",
      "https://www.who.int/travel-advice",
      "https://www.gov.uk/foreign-travel-advice"
    ],
    entry: { visa: "Check official embassy site", vaccines: [] as string[] }
  };
}