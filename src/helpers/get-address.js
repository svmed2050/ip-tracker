export async function getAddress(ip = '8.8.8.8') {
  const response = await fetch(`https://geo.ipify.org/api/v2/country,city,vpn?apiKey=at_szrD3szZRIwokhy6TH0eckrnzQnwe&ipAddress=${ip}`)
  
    return await response.json();
}