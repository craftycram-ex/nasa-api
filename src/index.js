import axios from 'axios';
import open from 'open';

const query = process.argv.slice(2).join(' ');

const baseUrl = 'https://images-api.nasa.gov/search?q=';

axios.get(baseUrl + query)
  .then(response => {
    const items = response.data.collection.items;
    if (items.length === 0) {
      console.log('No images found');
      return;
    
    }
    const item = items[items.length * Math.random() | 0];
    axios.get(item.href)
      .then(response => {
        const images = response.data.filter(data => data.includes('jpg') || data.includes('png') || data.includes('jpeg') || data.includes('mp4'));
        if (images.length === 0) {
          console.log('No images found');
          return;
        }
        const image = images[images.length * Math.random() | 0];
        open(image, { browser: 'firefox' });
      })
      .catch(error => {
        console.log(error);
      });
  })
  .catch(error => {
    console.log(error);
  });