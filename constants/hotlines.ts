export interface EmergencyHotlines {
  police: {
    primary: string;
    secondary?: string;
    emergency: string;
  };
  fire: {
    primary: string;
    secondary?: string;
    emergency: string;
  };
  medical: {
    primary: string;
    secondary?: string;
    emergency: string;
  };
  rescue: {
    primary: string;
    secondary?: string;
    emergency: string;
  };
}

export interface LocationHotlines {
  [municipality: string]: {
    [barangay: string]: EmergencyHotlines;
  };
}

// Location-based emergency hotlines data for Zambales municipalities
export const LOCATION_HOTLINES: LocationHotlines = {
  'Botolan': {
    'Poblacion': {
      police: { primary: '0917-100-1001', emergency: '911' },
      fire: { primary: '0917-100-1002', emergency: '911' },
      medical: { primary: '0917-100-1003', emergency: '911' },
      rescue: { primary: '0917-100-1004', emergency: '911' },
    },
    'Bancal': {
      police: { primary: '0917-100-1005', emergency: '911' },
      fire: { primary: '0917-100-1006', emergency: '911' },
      medical: { primary: '0917-100-1007', emergency: '911' },
      rescue: { primary: '0917-100-1008', emergency: '911' },
    },
  },
  'Cabangan': {
    'Poblacion': {
      police: { primary: '0917-200-2001', emergency: '911' },
      fire: { primary: '0917-200-2002', emergency: '911' },
      medical: { primary: '0917-200-2003', emergency: '911' },
      rescue: { primary: '0917-200-2004', emergency: '911' },
    },
  },
  'Candelaria': {
    'Poblacion': {
      police: { primary: '0917-300-3001', emergency: '911' },
      fire: { primary: '0917-300-3002', emergency: '911' },
      medical: { primary: '0917-300-3003', emergency: '911' },
      rescue: { primary: '0917-300-3004', emergency: '911' },
    },
  },
  'Castillejos': {
    'Poblacion': {
      police: { primary: '0917-400-4001', emergency: '911' },
      fire: { primary: '0917-400-4002', emergency: '911' },
      medical: { primary: '0917-400-4003', emergency: '911' },
      rescue: { primary: '0917-400-4004', emergency: '911' },
    },
    'Balaybay': {
      police: { primary: '0917-400-4005', emergency: '911' },
      fire: { primary: '0917-400-4006', emergency: '911' },
      medical: { primary: '0917-400-4007', emergency: '911' },
      rescue: { primary: '0917-400-4008', emergency: '911' },
    },
  },
  'Iba': {
    'Zone 1 Poblacion': {
      police: { primary: '0917-500-5001', emergency: '911' },
      fire: { primary: '0917-500-5002', emergency: '911' },
      medical: { primary: '0917-500-5003', emergency: '911' },
      rescue: { primary: '0917-500-5004', emergency: '911' },
    },
    'Zone 2 Poblacion': {
      police: { primary: '0917-500-5005', emergency: '911' },
      fire: { primary: '0917-500-5006', emergency: '911' },
      medical: { primary: '0917-500-5007', emergency: '911' },
      rescue: { primary: '0917-500-5008', emergency: '911' },
    },
  },
  'Masinloc': {
    'North Poblacion': {
      police: { primary: '0917-600-6001', emergency: '911' },
      fire: { primary: '0917-600-6002', emergency: '911' },
      medical: { primary: '0917-600-6003', emergency: '911' },
      rescue: { primary: '0917-600-6004', emergency: '911' },
    },
    'South Poblacion': {
      police: { primary: '0917-600-6005', emergency: '911' },
      fire: { primary: '0917-600-6006', emergency: '911' },
      medical: { primary: '0917-600-6007', emergency: '911' },
      rescue: { primary: '0917-600-6008', emergency: '911' },
    },
  },
  'Olongapo': {
    'East Bajac-Bajac': {
      police: { primary: '0917-700-7001', emergency: '911' },
      fire: { primary: '0917-700-7002', emergency: '911' },
      medical: { primary: '0917-700-7003', emergency: '911' },
      rescue: { primary: '0917-700-7004', emergency: '911' },
    },
    'West Bajac-Bajac': {
      police: { primary: '0917-700-7005', emergency: '911' },
      fire: { primary: '0917-700-7006', emergency: '911' },
      medical: { primary: '0917-700-7007', emergency: '911' },
      rescue: { primary: '0917-700-7008', emergency: '911' },
    },
  },
  'Palauig': {
    'East Poblacion': {
      police: { primary: '0917-800-8001', emergency: '911' },
      fire: { primary: '0917-800-8002', emergency: '911' },
      medical: { primary: '0917-800-8003', emergency: '911' },
      rescue: { primary: '0917-800-8004', emergency: '911' },
    },
    'West Poblacion': {
      police: { primary: '0917-800-8005', emergency: '911' },
      fire: { primary: '0917-800-8006', emergency: '911' },
      medical: { primary: '0917-800-8007', emergency: '911' },
      rescue: { primary: '0917-800-8008', emergency: '911' },
    },
  },
  'San Antonio': {
    'Poblacion': {
      police: { primary: '0917-900-9001', emergency: '911' },
      fire: { primary: '0917-900-9002', emergency: '911' },
      medical: { primary: '0917-900-9003', emergency: '911' },
      rescue: { primary: '0917-900-9004', emergency: '911' },
    },
    'Angeles': {
      police: { primary: '0917-900-9005', emergency: '911' },
      fire: { primary: '0917-900-9006', emergency: '911' },
      medical: { primary: '0917-900-9007', emergency: '911' },
      rescue: { primary: '0917-900-9008', emergency: '911' },
    },
  },
  'San Felipe': {
    'Poblacion': {
      police: { primary: '0917-000-0001', emergency: '911' },
      fire: { primary: '0917-000-0002', emergency: '911' },
      medical: { primary: '0917-000-0003', emergency: '911' },
      rescue: { primary: '0917-000-0004', emergency: '911' },
    },
  },
  'San Marcelino': {
    'Central': {
      police: { primary: '0917-111-1111', emergency: '911' },
      fire: { primary: '0917-111-1112', emergency: '911' },
      medical: { primary: '0917-111-1113', emergency: '911' },
      rescue: { primary: '0917-111-1114', emergency: '911' },
    },
  },
  'San Narciso': {
    'Poblacion': {
      police: { primary: '0917-222-2221', emergency: '911' },
      fire: { primary: '0917-222-2222', emergency: '911' },
      medical: { primary: '0917-222-2223', emergency: '911' },
      rescue: { primary: '0917-222-2224', emergency: '911' },
    },
  },
  'Santa Cruz': {
    'Poblacion North': {
      police: { primary: '0917-333-3331', emergency: '911' },
      fire: { primary: '0917-333-3332', emergency: '911' },
      medical: { primary: '0917-333-3333', emergency: '911' },
      rescue: { primary: '0917-333-3334', emergency: '911' },
    },
    'Poblacion South': {
      police: { primary: '0917-333-3335', emergency: '911' },
      fire: { primary: '0917-333-3336', emergency: '911' },
      medical: { primary: '0917-333-3337', emergency: '911' },
      rescue: { primary: '0917-333-3338', emergency: '911' },
    },
  },
  'Subic': {
    'Barretto': {
      police: {
        primary: '0917-123-4567',
        secondary: '0918-234-5678',
        emergency: '911',
      },
      fire: {
        primary: '0917-345-6789',
        secondary: '0918-456-7890',
        emergency: '911',
      },
      medical: {
        primary: '0917-567-8901',
        secondary: '0918-678-9012',
        emergency: '911',
      },
      rescue: {
        primary: '0917-789-0123',
        secondary: '0918-890-1234',
        emergency: '911',
      },
    },
    'Calapandayan': {
      police: {
        primary: '0917-111-2222',
        secondary: '0918-333-4444',
        emergency: '911',
      },
      fire: {
        primary: '0917-555-6666',
        secondary: '0918-777-8888',
        emergency: '911',
      },
      medical: {
        primary: '0917-999-0000',
        secondary: '0918-111-2222',
        emergency: '911',
      },
      rescue: {
        primary: '0917-333-4444',
        secondary: '0918-555-6666',
        emergency: '911',
      },
    },
    // Add more barangays for Subic
    'Cawag': {
      police: { primary: '0917-123-4567', emergency: '911' },
      fire: { primary: '0917-234-5678', emergency: '911' },
      medical: { primary: '0917-345-6789', emergency: '911' },
      rescue: { primary: '0917-456-7890', emergency: '911' },
    },
    'Ilangin': {
      police: { primary: '0917-567-8901', emergency: '911' },
      fire: { primary: '0917-678-9012', emergency: '911' },
      medical: { primary: '0917-789-0123', emergency: '911' },
      rescue: { primary: '0917-890-1234', emergency: '911' },
    },
    'Mangan-Vaca': {
      police: { primary: '0917-901-2345', emergency: '911' },
      fire: { primary: '0917-012-3456', emergency: '911' },
      medical: { primary: '0917-123-4567', emergency: '911' },
      rescue: { primary: '0917-234-5678', emergency: '911' },
    },
    'Matain': {
      police: { primary: '0917-345-6789', emergency: '911' },
      fire: { primary: '0917-456-7890', emergency: '911' },
      medical: { primary: '0917-567-8901', emergency: '911' },
      rescue: { primary: '0917-678-9012', emergency: '911' },
    },
    'Pamatawan': {
      police: { primary: '0917-789-0123', emergency: '911' },
      fire: { primary: '0917-890-1234', emergency: '911' },
      medical: { primary: '0917-901-2345', emergency: '911' },
      rescue: { primary: '0917-012-3456', emergency: '911' },
    },
    'San Isidro': {
      police: { primary: '0917-123-4567', emergency: '911' },
      fire: { primary: '0917-234-5678', emergency: '911' },
      medical: { primary: '0917-345-6789', emergency: '911' },
      rescue: { primary: '0917-456-7890', emergency: '911' },
    },
    'Santa Rita': {
      police: { primary: '0917-567-8901', emergency: '911' },
      fire: { primary: '0917-678-9012', emergency: '911' },
      medical: { primary: '0917-789-0123', emergency: '911' },
      rescue: { primary: '0917-890-1234', emergency: '911' },
    },
    'Wawandue': {
      police: { primary: '0917-901-2345', emergency: '911' },
      fire: { primary: '0917-012-3456', emergency: '911' },
      medical: { primary: '0917-123-4567', emergency: '911' },
      rescue: { primary: '0917-234-5678', emergency: '911' },
    },
  },
};

// Default hotlines for municipalities not in the database
export const DEFAULT_HOTLINES: EmergencyHotlines = {
  police: {
    primary: '0917-123-4567',
    emergency: '911',
  },
  fire: {
    primary: '0917-234-5678',
    emergency: '911',
  },
  medical: {
    primary: '0917-345-6789',
    emergency: '911',
  },
  rescue: {
    primary: '0917-456-7890',
    emergency: '911',
  },
};

// Function to get hotlines for a specific location
export function getHotlinesForLocation(municipality: string, barangay: string): EmergencyHotlines {
  const municipalityData = LOCATION_HOTLINES[municipality];
  if (!municipalityData) {
    return DEFAULT_HOTLINES;
  }

  const barangayData = municipalityData[barangay];
  if (!barangayData) {
    return DEFAULT_HOTLINES;
  }

  return barangayData;
}
