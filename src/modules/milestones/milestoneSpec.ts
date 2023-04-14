export const milestoneFieldSpec = {
  jobId: {
    required: true,
  },
  description: {
    required: true,
    updatable: true,
  },
  awardAmount: {
    required: true,
    updatable: true,
  },
  stableCoin: {
    required: true,
    updatable: true,
  },
  status: {
    default: 'PENDING',
    validValues: ['PENDING', 'RELEASED'],
    required: true,
    updatable: true,
  },
  creator: {
    default: 'Fast Bidder',
    required: true,
  },
  solutionProvider: {
    default: 'Fast Bidder',
    required: true,
  },
  employer: {
    default: 'Reco',
    required: true,
  },
};
