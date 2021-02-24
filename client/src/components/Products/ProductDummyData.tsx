interface LinePoint {
  date : string,
  quantity : number,
  name : string,
  sold? : number,
  built? : number,
}


const data = {
  getInventoryColumns: () => ({
    name: 'Name',
    date: 'Date',
    built: 'Built',
    sold: 'Sold',
    quantity: 'Stock',
  }),

  getLineData: () => {
    const data : LinePoint[] = [
      {
        date: (new Date('2021-01-20')).toLocaleDateString(),
        name: 'Mongoose Legion L100 BMX',
        quantity: 178,
      },
      {
        date: (new Date('2021-01-21')).toLocaleDateString(),
        name: 'Mongoose Legion L100 BMX',
        quantity: 194,
      },
      {
        date: (new Date('2021-01-22')).toLocaleDateString(),
        name: 'Mongoose Legion L100 BMX',
        quantity: 133,
      },
      {
        date: (new Date('2021-01-23')).toLocaleDateString(),
        name: 'Mongoose Legion L100 BMX',
        quantity: 128,
      },
      {
        date: (new Date('2021-01-24')).toLocaleDateString(),
        name: 'Mongoose Legion L100 BMX',
        quantity: 104,
      },
      {
        date: (new Date('2021-01-20')).toLocaleDateString(),
        name: 'Women\'s Newport 3SPD',
        quantity: 43,
      },
      {
        date: (new Date('2021-01-21')).toLocaleDateString(),
        name: 'Women\'s Newport 3SPD',
        quantity: 76,
      },
      {
        date: (new Date('2021-01-22')).toLocaleDateString(),
        name: 'Women\'s Newport 3SPD',
        quantity: 98,
      },
      {
        date: (new Date('2021-01-23')).toLocaleDateString(),
        name: 'Women\'s Newport 3SPD',
        quantity: 65,
      },
      {
        date: (new Date('2021-01-24')).toLocaleDateString(),
        name: 'Women\'s Newport 3SPD',
        quantity: 80,
      },
      {
        date: (new Date('2021-01-20')).toLocaleDateString(),
        name: 'Gallium Pro Disc',
        quantity: 142,
      },
      {
        date: (new Date('2021-01-21')).toLocaleDateString(),
        name: 'Gallium Pro Disc',
        quantity: 155,
      },
      {
        date: (new Date('2021-01-22')).toLocaleDateString(),
        name: 'Gallium Pro Disc',
        quantity: 167,
      },
      {
        date: (new Date('2021-01-23')).toLocaleDateString(),
        name: 'Gallium Pro Disc',
        quantity: 120,
      },
      {
        date: (new Date('2021-01-24')).toLocaleDateString(),
        name: 'Gallium Pro Disc',
        quantity: 84,
      },
      {
        date: (new Date('2021-01-20')).toLocaleDateString(),
        name: 'Krypton Pro',
        quantity: 18,
      },
      {
        date: (new Date('2021-01-21')).toLocaleDateString(),
        name: 'Krypton Pro',
        quantity: 26,
      },
      {
        date: (new Date('2021-01-22')).toLocaleDateString(),
        name: 'Krypton Pro',
        quantity: 38,
      },
      {
        date: (new Date('2021-01-23')).toLocaleDateString(),
        name: 'Krypton Pro',
        quantity: 65,
      },
      {
        date: (new Date('2021-01-24')).toLocaleDateString(),
        name: 'Krypton Pro',
        quantity: 94,
      },
      {
        date: (new Date('2021-01-20')).toLocaleDateString(),
        name: 'Xenon 650',
        quantity: 105,
      },
      {
        date: (new Date('2021-01-21')).toLocaleDateString(),
        name: 'Xenon 650',
        quantity: 106,
      },
      {
        date: (new Date('2021-01-22')).toLocaleDateString(),
        name: 'Xenon 650',
        quantity: 93,
      },
      {
        date: (new Date('2021-01-23')).toLocaleDateString(),
        name: 'Xenon 650',
        quantity: 140,
      },
      {
        date: (new Date('2021-01-24')).toLocaleDateString(),
        name: 'Xenon 650',
        quantity: 176,
      },
    ];

    data.forEach((point : LinePoint, index) => {
      if (index === 0) {
        point.sold = 15;
        point.built = Math.max(point.quantity - data[index + 1].quantity, 0);
      } else if (index === data.length - 1) {
        point.sold = Math.max(point.quantity - data[index - 1].quantity, 0);
        point.built = 14;
      } else {
        point.sold = Math.max(point.quantity - data[index - 1].quantity, 0);
        point.built = Math.max(point.quantity - data[index + 1].quantity, 0);
      }
    });

    data.sort((a, b) => {
      const dateA = a.date;
      const dateB = b.date;
      if (dateA < dateB) {
        return -1;
      } else if (dateA > dateB) {
        return 1;
      } else {
        return 0;
      }
    });

    return data;
  },
};

export default data;