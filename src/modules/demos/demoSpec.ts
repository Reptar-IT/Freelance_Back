export const demoFieldSpec = {
  description: {
    required: true,
    updatable: true,
  },
  amount: {
    required: true,
    updatable: true,
  },
  creator: {
    required: true,
  },
  status: {
    default: 'PENDING',
    validValues: ['PENDING', 'ACCEPTED'],
    required: true,
    updatable: true,
  },
};