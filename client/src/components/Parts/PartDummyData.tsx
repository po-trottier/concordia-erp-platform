import { PartInventoryEntry } from '../../interfaces/PartInventoryEntry';
import { PartHistoryEntry } from '../../interfaces/PartHistoryEntry';

export const dummyPartData : PartInventoryEntry[] = [
  {
    id: '6013855b6c24ef1dc4d21125',
    name: 'Padded Saddle',
    description: 'Standard seat with some extra padding.',
    materials: 'Leather, Foam',
    quantity: 768,
    forecast: 950,
  },
  {
    id: '601385659f0d6061b89ac171',
    name: 'Street Frame',
    description: 'Street style aluminum bike frame.',
    materials: 'Aluminium',
    quantity: 830,
    forecast: 1260,
  },
  {
    id: '6013856ba9f14acff30344d8',
    name: 'Mountain Frame',
    description: 'Mountain style aluminum frame.',
    materials: 'Aluminium, Steel',
    quantity: 863,
    forecast: 970,
  },
  {
    id: '601385704569c47eb79ffc28',
    name: 'Pedals',
    description: 'Standard pedals.',
    materials: 'Plastic, Aluminium',
    quantity: 995,
    forecast: 900,
  },
  {
    id: '601385747ef2ed6535fc0539',
    name: 'Shock Absorbers',
    description: 'Absorbs shock.',
    materials: 'Aluminium',
    quantity: 964,
    forecast: 1000,
  },
  {
    id: '60138578d3ca261a2f1c24d8',
    name: 'Handlebars',
    description: 'Handlebar grips.',
    materials: 'Aluminium, Rubber',
    quantity: 561,
    forecast: 650,
  },
];

export const dummyPartHistoryData = () : PartHistoryEntry[] => {
  const data = [
    {
      id: '6013855b6c24ef1dc4d21125',
      name: 'Padded Saddle',
      date: '1/29/2021',
      quantity: 698,
    },
    {
      id: '6013855b6c24ef1dc4d21125',
      name: 'Padded Saddle',
      date: '3/1/2021',
      quantity: 883,
    },
    {
      id: '6013855b6c24ef1dc4d21125',
      name: 'Padded Saddle',
      date: '3/29/2021',
      quantity: 514,
    },
    {
      id: '6013855b6c24ef1dc4d21125',
      name: 'Padded Saddle',
      date: '4/29/2021',
      quantity: 748,
    },
    {
      id: '6013855b6c24ef1dc4d21125',
      name: 'Padded Saddle',
      date: '5/29/2021',
      quantity: 768,
    },
    {
      id: '601385659f0d6061b89ac171',
      name: 'Street Frame',
      date: '1/29/2021',
      quantity: 750,
    },
    {
      id: '601385659f0d6061b89ac171',
      name: 'Street Frame',
      date: '3/1/2021',
      quantity: 837,
    },
    {
      id: '601385659f0d6061b89ac171',
      name: 'Street Frame',
      date: '3/29/2021',
      quantity: 997,
    },
    {
      id: '601385659f0d6061b89ac171',
      name: 'Street Frame',
      date: '4/29/2021',
      quantity: 519,
    },
    {
      id: '601385659f0d6061b89ac171',
      name: 'Street Frame',
      date: '5/29/2021',
      quantity: 830,
    },
    {
      id: '6013856ba9f14acff30344d8',
      name: 'Mountain Frame',
      date: '1/29/2021',
      quantity: 676,
    },
    {
      id: '6013856ba9f14acff30344d8',
      name: 'Mountain Frame',
      date: '3/1/2021',
      quantity: 804,
    },
    {
      id: '6013856ba9f14acff30344d8',
      name: 'Mountain Frame',
      date: '3/29/2021',
      quantity: 915,
    },
    {
      id: '6013856ba9f14acff30344d8',
      name: 'Mountain Frame',
      date: '4/29/2021',
      quantity: 907,
    },
    {
      id: '6013856ba9f14acff30344d8',
      name: 'Mountain Frame',
      date: '5/29/2021',
      quantity: 863,
    },
    {
      id: '601385704569c47eb79ffc28',
      name: 'Pedals',
      date: '1/29/2021',
      quantity: 971,
    },
    {
      id: '601385704569c47eb79ffc28',
      name: 'Pedals',
      date: '3/1/2021',
      quantity: 934,
    },
    {
      id: '601385704569c47eb79ffc28',
      name: 'Pedals',
      date: '3/29/2021',
      quantity: 906,
    },
    {
      id: '601385704569c47eb79ffc28',
      name: 'Pedals',
      date: '4/29/2021',
      quantity: 833,
    },
    {
      id: '601385704569c47eb79ffc28',
      name: 'Pedals',
      date: '5/29/2021',
      quantity: 995,
    },
    {
      id: '601385747ef2ed6535fc0539',
      name: 'Shock Absorbers',
      date: '1/29/2021',
      quantity: 756,
    },
    {
      id: '601385747ef2ed6535fc0539',
      name: 'Shock Absorbers',
      date: '3/1/2021',
      quantity: 757,
    },
    {
      id: '601385747ef2ed6535fc0539',
      name: 'Shock Absorbers',
      date: '3/29/2021',
      quantity: 667,
    },
    {
      id: '601385747ef2ed6535fc0539',
      name: 'Shock Absorbers',
      date: '4/29/2021',
      quantity: 973,
    },
    {
      id: '601385747ef2ed6535fc0539',
      name: 'Shock Absorbers',
      date: '5/29/2021',
      quantity: 964,
    },
    {
      id: '60138578d3ca261a2f1c24d8',
      name: 'Handlebars',
      date: '1/29/2021',
      quantity: 576,
    },
    {
      id: '60138578d3ca261a2f1c24d8',
      name: 'Handlebars',
      date: '3/1/2021',
      quantity: 760,
    },
    {
      id: '60138578d3ca261a2f1c24d8',
      name: 'Handlebars',
      date: '3/29/2021',
      quantity: 908,
    },
    {
      id: '60138578d3ca261a2f1c24d8',
      name: 'Handlebars',
      date: '4/29/2021',
      quantity: 558,
    },
    {
      id: '60138578d3ca261a2f1c24d8',
      name: 'Handlebars',
      date: '5/29/2021',
      quantity: 561,
    },
  ];

  data.forEach((point : PartHistoryEntry, index) => {
    if (index === 0) {
      point.used = 15;
      point.built = Math.max(point.quantity - data[index + 1].quantity, 0);
    } else if (index === data.length - 1) {
      point.used = Math.max(point.quantity - data[index - 1].quantity, 0);
      point.built = 14;
    } else {
      point.used = Math.max(point.quantity - data[index - 1].quantity, 0);
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
};