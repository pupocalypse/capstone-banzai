// data
const insightRank = 1;

const rings = [
  {
    element: "air",
    rank: 2,
    traits: [
      {
        trait: "reflexes",
        rank: 2,
        type: "physical",
      },
      {
        trait: "awareness",
        rank: 2,
        type: "mental",
      },
    ],
  },
  {
    element: "earth",
    rank: 2,
    traits: [
      {
        trait: "stamina",
        rank: 2,
        type: "physical",
      },
      {
        trait: "willpower",
        rank: 2,
        type: "mental",
      },
    ],
  },
  {
    element: "fire",
    rank: 2,
    traits: [
      {
        trait: "agility",
        rank: 2,
        type: "physical",
      },
      {
        trait: "intelligence",
        rank: 2,
        type: "mental",
      },
    ],
  },
  {
    element: "water",
    rank: 2,
    traits: [
      {
        trait: "strength",
        rank: 2,
        type: "physical",
      },
      {
        trait: "perception",
        rank: 2,
        type: "mental",
      },
    ],
  },
  {
    element: "void",
    rank: 2,
  },
];

// common functions
const initiativeCalculator = (insight, reflexes) => {
  // insight rank + reflexes, keep reflexes
  return `${insight + reflexes}k${reflexes}`;
};

const skillDiceCalculator = (skillName, trait) => {
  // skill rank + trait, keep trait
};

const ringRankCalculator = (ring) => {
  // element ring (except void) is equal to the lesser ranks of both its traits
  // console.log("ring:", ring);
  // console.log("rings[0]:", rings[0]);
  if (ring === "void") {
    return "Void has no traits";
  } else {
    const ringDetails = rings.filter((ringObj) => ringObj.element === ring);
    // console.log("ringDetails:", ringDetails);
    // get only the ranks of the ring's traits, find the minimum value
    const traitRanks = ringDetails[0].traits.map((trait) => trait.rank);
    // console.log("traitRanks:", traitRanks);
    return Math.min(...traitRanks);
  }
};

const nextRankCostCalculator = () => {};
