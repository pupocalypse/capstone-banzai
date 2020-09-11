// what should a final character object look like?
character = {
  id: random (uuid),
  insight: {
    rank: integer (1), // calculated in tiers - 0-149 = rank 1, 150-174 = rank 2, 175-200 = rank 3, etc.
    total: integer // calculated by (ring ranks * 10) + all skill ranks
  },
  name: string ("Utaku Yuki"),
  // point to clans table to see families and their trait bonuses
  clan: string (Unicorn),
  family: string (Utaku),
  // point to clans > schools table to see school loadout, skills, and trait bonuses
  school: {
    school: string ("Bushi - Utaku Battle Maiden"), // use only Bushi/Shugenja/Courtier for now,
    rank: integer (1), // will almost always be the same as insight rank (no multi-schooling for demo purposes ;P)
  },
  // maybe leave this out for now? not important for major calculations & features
  // repute: {
  //   honor: integer with one decimal point (4.5),
  //   glory: integer with one decimal point (0.5),
  //   status: integer with one decimal point (1.0),
  //   infamy: integer with one decimal point (0.0) - also hidden unless activated?,
  // },
  rings: [
    // point to clans table
    // all rings and traits start at 2, see family/clan bonuses for upgrading at start
    {
      air: {
        rank: integer (2), // calculated by the lower value of the children traits
        traits: {
          reflexes: {
            rank: integer (2),
            type: physical
          },
          awareness: {
            rank: integer (2),
            type: mental
          }
        }
      }
    },
    {
      earth: {
        rank: integer (2), // calculated by the lower value of the children traits
        traits: {
          stamina: {
            rank: integer (2),
            type: physical
          },
          willpower: {
            rank: integer (2),
            type: mental
          }
        }
      }
    },
    {
      fire: {
        rank: integer (2), // calculated by the lower value of the children traits
        traits: {
          agility: {
            rank: integer (2),
            type: physical
          },
          intelligence: {
            rank: integer (2),
            type: mental
          }
        }
      }
    },
    {
      water: {
        rank: integer (2), // calculated by the lower value of the children traits
        traits: {
          strength: {
            rank: integer (2),
            type: physical
          },
          perception: {
            rank: integer (2),
            type: mental
          }
        }
      }
    },
    {
      void: {
        rank: integer (2)
      }
    }
  ],
  skills: [
    // point to skills table
    // make calculations for dice rolls based on skill rank + relevant trait rank
    {
      skill: "",
      trait: "",
      rank: 1,
      subTypes: [""],
      emphases: [""],
    }
  ],
  advantages: [
    // point to advantages table

  ],
  disadvantages: [
    // point to disadvantages table

  ],
}

// clan table
clans = [
  {
    clan: "Crab",
    families: [
      {
        name: "Hida",
        bonus: "strength"
      },
      {
        name: "Hiruma",
        bonus: "agility"
      },
      {
        name: "Kaiu",
        bonus: "intelligence"
      },
      {
        name: "Kuni",
        bonus: "intelligence"
      },
      {
        name: "Toritaka",
        bonus: "perception"
      },
      {
        name: "Yasuki",
        bonus: "awareness"
      },
    ],
    // should schools be a separate table?
    schools: [
      {
        name: "Hida Bushi",
        type: "bushi",
      },
      {
        name: "Kuni Shugenja",
        type: "shugenja",
      },
      {
        name: "Yasuki Courtier",
        type: "courtier",
      }
    ]
  },
  {
    clan: "Crane",
    families: [],
    schools: []
  },
  {
    clan: "Dragon",
    families: [],
    schools: []
  },
  {
    clan: "Lion",
    families: [],
    schools: []
  },
  {
    clan: "Mantis",
    families: [],
    schools: []
  },
  {
    clan: "Phoenix",
    families: [],
    schools: []
  },
  {
    clan: "Scorpion",
    families: [],
    schools: []
  },
  {
    clan: "Unicorn",
    families: [],
    schools: []
  },
]

// three school tables based on type? bushi, shugenja, courtier
schools = [
  {
    clan: "Crab",
    name: "Hida Bushi",
    type: "bushi",
    bonus: "stamina",
    // should there be a school skills table?
    skills: {
      core = [
        "athletics",
        "defense",
        "heavy weapons",
        "intimidation",
        "kenjutsu",
        "lore: shadowlands",
      ],
      emphases: [
        {
          skillName: "heavy weapons",
          emphasis: "tetsubo"
        }
      ],
      freePickType: "bugei"
    },
    honor: 3.5,
    // should there be a school outfit table?
    outfit: {
      armor: {
        option1: "light armor",
        option2: "heavy armor",
      },
      clothing: "sturdy clothing",
      weapons: {
        base: {
          base1: "katana",
          base2: "wakizashi"
        },
        options: {
          option1: "heavy weapon",
          option2: "polearm"
        }
      },
      tools: [
        ""
      ],
      pack: "traveling pack",
      koku: 3
    }
  },
  {
    clan: "Crab",
    name: "Kuni Shugenja",
    type: "shugenja",
    bonus: "willpower",
    skills: {
      core = [
        "calligraphy",
        "defense",
        "lore: shadowlands",
        "lore: shadowlands",
        "lore: theology",
        "spellcraft",
      ],
      emphases: [
        {
          skillName: "calligraphy",
          emphasis: "cipher"
        }
      ],
      freePickType: "weapon"
    },
    honor: 2.5,
    outfit: {
      armor: {
        option1: "",
        option2: "",
      },
      clothing: "sturdy clothing",
      weapons: {
        base: {
          base1: "wakizashi",
          base2: "knife"
        },
        options: null,
      },
      tools: [
        "scroll satchel"
      ],
      pack: "traveling pack",
      koku: 3
    },
    affinity: "earth",
    deficiency: "air",
    spellSlots: [
      {
        element: "earth",
        slots: 3
      },
      {
        element: "fire",
        slots: 2
      },
      {
        element: "water",
        slots: 1
      },
    ]
  },
  {
    clan: "Crab",
    name: "Yasuki Courtier",
    type: "courtier",
    bonus: "perception",
    skills: {
      core = [
        "commerce",
        "courtier",
        "defense",
        "etiquette",
        "intimidation",
        "sincerity",
      ],
      emphases: [
        {
          skillName: "commerce",
          emphasis: "appraisal"
        },
        {
          skillName: "sincerity",
          emphasis: "deceit"
        }
      ],
      freePickType: "merchant"
    },
    honor: 2.5,
    outfit: {
      armor: {
        option1: "",
        option2: "",
      },
      clothing: "traditional clothing",
      weapons: {
        base: {
          base1: "wakizashi",
          base2: "knife"
        },
        options: null,
      },
      tools: [
        "calligraphy set"
      ],
      pack: "traveling pack",
      koku: 5
    }
  },
]