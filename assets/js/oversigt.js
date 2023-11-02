async function fetchAndDisplayPriceData() {
    const apiUrl = 'https://www.elprisenligenu.dk/api/v1/prices/2023/10-31_DK2.json';
    const timelineElement = document.getElementById('timeline');
    const lowestPriceElement = document.getElementById('low-price');
    const highestPriceElement = document.getElementById('high-price');
  
    try {
      const response = await fetch(apiUrl);
      if (response.ok) {
        const data = await response.json();
        console.log('Data hentet fra API:', data);
  
        const currentDateTime = new Date();
        const currentHour = currentDateTime.getHours();
  
        // Create a timeline with the hour and price for each hour
        for (let i = 0; i < 8; i++) {
          const hour = (currentHour + i) % 24;
          const priceData = data.find(item => new Date(item.time_start).getHours() === hour);
  
          if (priceData) {
            const price = priceData.DKK_per_kWh;
  
            // Create <p> elements for the hour and price in the timeline
            const hourElement = document.getElementById('time');
            hourElement.textContent = `kl. ${currentHour}:00`;
  
            const priceElement = document.getElementById('price');
            priceElement.textContent = `${price.toFixed(3)} kr`;
          }
        }
  
        const priceData = data.slice(currentHour);
        if (priceData.length > 0) {
          const lowestPrice = Math.min(...priceData.map(item => item.DKK_per_kWh));
          const highestPrice = Math.max(...priceData.map(item => item.DKK_per_kWh));
  
          // Use toFixed(3) to display the price with three decimal places
          lowestPriceElement.textContent = `${lowestPrice.toFixed(3)} KR`;
          highestPriceElement.textContent = `${highestPrice.toFixed(3)} KR`;
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
  
  fetchAndDisplayPriceData();
  