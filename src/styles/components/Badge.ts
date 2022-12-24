const Badge = {
  baseStyle: {
    fontWeight: '700',
    borderRadius: '50px',
    textTransform: 'uppercase',
    px: 4,
    py: 0, // <--
  },

  variants: {
    concluded: {
      bg: 'green.500',
      color: 'green.100',
    },
    canceled: {
      bg: 'red.500',
      color: 'red.100',
    },
    analysis: {
      bg: 'yellow.500',
      color: 'yellow.100',
    },
    production: {
      bg: 'blue.100',
      color: 'blue.500',
    },
    pending: {
      bg: 'orange.100',
      color: 'orange.500',
    },
    undefined: {
      bg: 'gray.100',
      color: 'gray.500',
    },
  },
};

export default Badge;
