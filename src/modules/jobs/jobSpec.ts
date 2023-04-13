import { allSkills } from "../../utils/skills";

export const jobFieldSpec = {
  workType: {
    required: true,
  },
  title: {
    required: true,
  },
  description: {
    required: true,
  },
  budget: {
    required: true,
  },
  skills: {
    type: 'List',
    required: true,
    validValues: allSkills,
  },
  bids: {
    default: [],
  },
  milestones: {
    default: [],
  },
  end: {
    required: true,
    updatable: true,
  },
  review: {
    default: "",
    updatable: true,
  },
  solutionProvider: {
    default: "",
    updatable: true,
  },
  creator: {
    default: "Reco",
    required: true,
  },
  status: {
    validValues: ['OPEN', 'AWARDED'],
    required: true,
    updatable: true,
  },
};
