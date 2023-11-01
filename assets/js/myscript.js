async function fetchElprisData() {
  const apiUrl = 'https://www.elprisenligenu.dk/api/v1/prices/2023/10-31_DK2.json';
  const currentPriceElement = document.getElementById('currentPrice');

  try {
    const response = await fetch(apiUrl);
    if (response.ok) {
      const data = await response.json();
      console.log('Data hentet fra API:', data);

      const currentDateTime = new Date();

      const currentData = findCurrentData(data, currentDateTime);

      if (currentData) {
        const currentPrice = currentData.DKK_per_kWh;
        currentPriceElement.textContent = `${currentPrice} KR`;
      } else {
        console.error('Ingen data fundet for det aktuelle tidspunkt');
      }
    } else {
      console.error('Fejl ved hentning af data:', response.status, response.statusText);
    }
  } catch (error) {
    console.error('Der opstod en fejl:', error);
  }
}

function findCurrentData(data, currentDateTime) {
  for (const dataPoint of data) {
    const dataPointTime = new Date(dataPoint.time_start);
    if (currentDateTime >= dataPointTime) {
      return dataPoint;
    }
  }
  return null;

  
}
async function fetchCurrentHourRange() {
  const currentHourElement = document.getElementById('currentTime');

  try {
    const currentDateTime = new Date();
    const currentHour = currentDateTime.getHours();
    const nextHour = (currentHour + 1) % 24; // Calculate the next hour
    currentHourElement.textContent = `${currentHour}:00 - ${nextHour}:00`;
  } catch (error) {
    console.error('Der opstod en fejl:', error);
  }
}

fetchCurrentHourRange();


fetchElprisData();
