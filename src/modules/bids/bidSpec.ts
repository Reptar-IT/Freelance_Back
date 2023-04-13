export const bidFieldSpec = {
  jobId: {
    required: true,
  },
  description: {
    required: true,
    updatable: true,
  },
  amount: {
    required: true,
    updatable: true,
  },
  creator: {
    default: "Fast Bidder",
    required: true,
  },
  status: {
    default: 'PENDING',
    validValues: ['PENDING', 'ACCEPTED'],
    required: true,
    updatable: true,
  },
};