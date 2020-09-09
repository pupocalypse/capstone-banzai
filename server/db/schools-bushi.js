schools = [
  {
    clan: "Crab",
    name: "Hida Bushi",
    type: "bushi",
    bonus: "stamina",
    skills: {
      core = [
        // or could be array? [skillName, rank, trait, subType, emphasis]
        // only first three are required, last two optional
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
    name: "Hiruma Bushi",
    type: "bushi",
    bonus: "willpower",
    skills: {
      core = [
        "athletics",
        "hunting",
        "kenjutsu",
        "kyujutsu",
        "lore: shadowlands",
        "stealth",
      ],
      emphases: [
        {
          skillName: "kenjutsu",
          emphasis: "katana"
        }
      ],
      freePickType: "any"
    },
    honor: 4.5,
    outfit: {
      armor: {
        option1: "ashigaru armor",
        option2: "light armor",
      },
      clothing: "sturdy clothing",
      weapons: {
        base: {
          base1: "katana",
          base2: "wakizashi"
        },
        options: {
          option1: ["bow", "20 arrows"],
          option2: "knife"
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
    clan: "Crane",
    name: "Kakita Bushi",
    type: "bushi",
    bonus: "reflexes",
    skills: {
      core = [
        "etiquette",
        "iaijutsu",
        "kenjutsu",
        "kyujutsu",
        "sincerity",
        "tea ceremony",
      ],
      emphases: [
        {
          skillName: "iaijutsu",
          emphasis: "focus"
        }
      ],
      freePickType: ["bugei", "high"]
    },
    honor: 6.5,
    outfit: {
      armor: {
        option1: "light armor",
        option2: "",
      },
      clothing: "sturdy clothing",
      weapons: {
        base: {
          base1: "katana",
          base2: "wakizashi"
        },
        options: {
          option1: "any",
          option2: ""
        }
      },
      tools: [
        ""
      ],
      pack: "traveling pack",
      koku: 10
    }
  },
  {
    clan: "Crane",
    name: "Daidoji Iron Warriors",
    type: "bushi",
    bonus: "agility",
    skills: {
      core = [
        "battle",
        "defense",
        "defense",
        "iaijutsu",
        "kenjutsu",
        "kyujutsu",
      ],
      emphases: [
        {
          skillName: "kenjutsu",
          emphasis: "katana"
        }
      ],
      freePickType: "any"
    },
    honor: 6.5,
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
      koku: 10
    }
  },
  {
    clan: "Dragon",
    name: "Mirumoto Bushi",
    type: "bushi",
    bonus: "stamina",
    skills: {
      core = [
        "defense",
        "iaijutsu",
        "kenjutsu",
        "lore: shugenja",
        "lore: theology",
        "meditation",
      ],
      emphases: [
        {
          skillName: "kenjutsu",
          emphasis: "katana"
        }
      ],
      freePickType: ["bugei", "high"]
    },
    honor: 4.5,
    outfit: {
      armor: {
        option1: "light armor",
        option2: "",
      },
      clothing: "sturdy clothing",
      weapons: {
        base: {
          base1: "katana",
          base2: "wakizashi"
        },
        options: {
          option1: "any",
          option2: ""
        }
      },
      tools: [
        ""
      ],
      pack: "traveling pack",
      koku: 5
    }
  },
  {
    clan: "Lion",
    name: "Akodo Bushi",
    type: "bushi",
    bonus: "perception",
    skills: {
      core = [
        "battle",
        "defense",
        "kenjutsu",
        "kyujutsu",
        "lore: history",
        "sincerity",
      ],
      emphases: [
        {
          skillName: "battle",
          emphasis: "mass combat"
        }
      ],
      freePickType: ["bugei", "high"]
    },
    honor: 6.5,
    outfit: {
      armor: {
        option1: "light armor",
        option2: "",
      },
      clothing: "sturdy clothing",
      weapons: {
        base: {
          base1: "katana",
          base2: "wakizashi"
        },
        options: {
          option1: "any",
          option2: ""
        }
      },
      tools: [
        ""
      ],
      pack: "traveling pack",
      koku: 5
    }
  },
  {
    clan: "Lion",
    name: "Matsu Berserker",
    type: "bushi",
    bonus: "strength",
    skills: {
      core = [
        "battle",
        "jiujutsu",
        "kenjutsu",
        "kyujutsu",
        "lore: history",
      ],
      emphases: [
        {
          skillName: "kenjutsu",
          emphasis: "katana"
        }
      ],
      freePickType: [["bugei"], ["bugei"]]
    },
    honor: 6.5,
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
      koku: 5
    }
  },
  {
    clan: "Mantis",
    name: "Yoritomo Bushi",
    type: "bushi",
    bonus: "strength",
    skills: {
      core = [
        "commerce",
        "defense",
        "jiujutsu",
        "kenjutsu",
        "knives",
        "sailing",
      ],
      emphases: [
        {
          skillName: "jiujutsu",
          emphasis: "improvised weapons"
        },
        {
          skillName: "knives",
          emphasis: "kama"
        }
      ],
      freePickType: "any"
    },
    honor: 3.5,
    outfit: {
      armor: {
        option1: "light armor",
        option2: "",
      },
      clothing: "sturdy clothing",
      weapons: {
        base: {
          base1: "katana",
          base2: "wakizashi"
        },
        options: {
          option1: "any",
          option2: "pair of knives"
        }
      },
      tools: [
        ""
      ],
      pack: "traveling pack",
      koku: 10
    }
  },
  {
    clan: "Mantis",
    name: "Tsuruchi Archer",
    type: "bushi",
    bonus: "reflexes",
    skills: {
      core = [
        "athletics",
        "defense",
        "hunting",
        "investigation",
        "kyujutsu",
        "kyujutsu",
      ],
      emphases: [
        {
          skillName: "kyujutsu",
          emphasis: "yumi"
        }
      ],
      freePickType: ["bugei", "high"]
    },
    honor: 3.5,
    outfit: {
      armor: {
        option1: "ashigaru armor",
        option2: "light armor",
      },
      clothing: "sturdy clothing",
      weapons: {
        base: {
          base1: ["bow", "20 arrows"],
          base2: "wakizashi"
        },
        options: {
          option1: "",
          option2: ""
        }
      },
      tools: [
        ""
      ],
      pack: "traveling pack",
      koku: 10
    }
  },
  {
    clan: "Phoenix",
    name: "Shiba Bushi",
    type: "bushi",
    bonus: "agility",
    skills: {
      core = [
        "defense",
        "kenjutsu",
        "kyujutsu",
        "lore: theology",
        "meditation",
        "spears",
      ],
      emphases: [
        {
          skillName: "meditation",
          emphasis: "void recovery"
        }
      ],
      freePickType: ["bugei", "high"]
    },
    honor: 5.5,
    outfit: {
      armor: {
        option1: "light armor",
        option2: "",
      },
      clothing: "sturdy clothing",
      weapons: {
        base: {
          base1: "katana",
          base2: "wakizashi"
        },
        options: {
          option1: "any",
          option2: ""
        }
      },
      tools: [
        ""
      ],
      pack: "traveling pack",
      koku: 5
    }
  },
  {
    clan: "Scorpion",
    name: "Bayushi Bushi",
    type: "bushi",
    bonus: "intelligence",
    skills: {
      core = [
        "courtier",
        "defense",
        "etiquette",
        "iaijutsu",
        "kenjutsu",
        "sincerity",
      ],
      emphases: [
        {
          skillName: "courtier",
          emphasis: "manipulation"
        }
      ],
      freePickType: "any"
    },
    honor: 2.5,
    outfit: {
      armor: {
        option1: "light armor",
        option2: "",
      },
      clothing: "sturdy clothing",
      weapons: {
        base: {
          base1: "katana",
          base2: "wakizashi"
        },
        options: {
          option1: "any",
          option2: ""
        }
      },
      tools: [
        ""
      ],
      pack: "traveling pack",
      koku: 5
    }
  },
  {
    clan: "Scorpion",
    name: "Shosuro Infiltrator",
    type: "bushi",
    bonus: "reflexes",
    skills: {
      core = [
        "acting",
        "athletics",
        "ninjutsu",
        "sincerity",
        "stealth",
        "stealth",
      ],
      emphases: [
        {
          skillName: "stealth",
          emphasis: "sneaking"
        }
      ],
      freePickType: "any"
    },
    honor: 1.5,
    outfit: {
      armor: {
        option1: "ashigaru armor",
        option2: "light armor",
      },
      clothing: "sturdy black clothing",
      weapons: {
        base: {
          base1: "katana",
          base2: "wakizashi"
        },
        options: {
          option1: ["bow", "20 arrows"],
          option2: "knife"
        }
      },
      tools: [
        ""
      ],
      pack: "traveling pack",
      koku: 5
    }
  },
  {
    clan: "Unicorn",
    name: "Moto Bushi",
    type: "bushi",
    bonus: "strength",
    skills: {
      core = [
        "athletics",
        "defense",
        "horsemanship",
        "hunting",
        "kenjutsu",
      ],
      emphases: [
        {
          skillName: "kenjutsu",
          emphasis: "scimitar"
        }
      ],
      freePickType: ["bugei", "any"]
    },
    honor: 3.5,
    outfit: {
      armor: {
        option1: "riding armor",
        option2: "heavy armor",
      },
      clothing: "sturdy black clothing",
      weapons: {
        base: {
          base1: "katana",
          base2: "wakizashi"
        },
        options: {
          option1: "heavy weapon",
          option2: "polearm",
          option3: "any"
        }
      },
      tools: [
        "Unicorn riding horse"
      ],
      pack: "traveling pack",
      koku: 10
    }
  },
  {
    clan: "Unicorn",
    name: "Utaku Battle Maiden",
    type: "bushi",
    bonus: "reflexes",
    skills: {
      core = [
        "battle",
        "defense",
        "horsemanship",
        "horsemanship",
        "kenjutsu",
        "sincerity",
      ],
      emphases: [
        {
          skillName: "kenjutsu",
          emphasis: "scimitar"
        }
      ],
      freePickType: ["high", "bugei"]
    },
    honor: 6.5,
    outfit: {
      armor: {
        option1: "riding armor",
        option2: "heavy armor",
      },
      clothing: "sturdy black clothing",
      weapons: {
        base: {
          base1: "katana",
          base2: "wakizashi"
        },
        options: {
          option1: "any",
          option2: "",
        }
      },
      tools: [
        "Utaku warhorse"
      ],
      pack: "traveling pack",
      koku: 10
    }
  },
]