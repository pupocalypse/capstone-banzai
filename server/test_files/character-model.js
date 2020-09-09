class Character {
  // ...
  constructor(...args) {
    this.id = null; // created with uuid?
    this.insight = new Insight(); // basically a character's rank, is determined by a calculation of all rings and skills ranks
    this.baseExp = 20; // starting xp, will be added to or subtracted from
    this.name = args.name;
    this.clan = args.clan;
    // this.family = args.family;
    (this.family = { // an example family object
      name: "Hiruma",
      bonus: "agility",
    }),
      // this.school = args.school;
      (this.school = { // an example school object
        clan: "Crab",
        name: "Hiruma Bushi",
        type: "bushi",
        bonus: "willpower",
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
        // outfit: {
        //   armor: {
        //     option1: "light armor",
        //     option2: "heavy armor",
        //   },
        //   clothing: "sturdy clothing",
        //   weapons: {
        //     base: {
        //       base1: "katana",
        //       base2: "wakizashi"
        //     },
        //     options: {
        //       option1: "heavy weapon",
        //       option2: "polearm"
        //     }
        //   },
        //   tools: [
        //     ""
        //   ],
        //   pack: "traveling pack",
        //   koku: 3
        // }
      }),
      this.skills = { // an example skills object, would include those specified in school.skills
        athletics: {
          trait: "strength",
          type: "Bugei",
          subType: [],
        },
        battle: {
          trait: "perception",
          type: "Bugei",
          subType: [],
        },
        commerce: {
          trait: "intelligence",
          type: "Merchant",
          subType: [],
        },
        courtier: {
          trait: "awareness",
          type: "High",
          subType: ["Social"],
        },
      };
    }

  get rings() {
    // traits won't be dynamic once in Ring class, but need to figure out bonuses beforehand
    const familyBonus = this.family.bonus;
    const schoolBonus = this.school.bonus;

    const traits = [
      ["reflexes", "physical", false],
      ["awareness", "mental", false],
      ["stamina", "physical", false],
      ["willpower", "mental", false],
      ["agility", "physical", false],
      ["intelligence", "mental", false],
      ["strength", "physical", false],
      ["perception", "mental", false],
      ["void", "mental", true],
    ];

    const characterTraits = {};
    traits.forEach(([trait, type, isVoid]) => {
      characterTraits[trait] = new Trait(type, isVoid);
      if (trait === familyBonus || trait === schoolBonus) {
        characterTraits[trait].baseRank += 1;
      }
    });

    return {
      air: new Ring({
        reflexes: characterTraits.reflexes,
        awareness: characterTraits.awareness,
      }),
      earth: new Ring({
        stamina: characterTraits.stamina,
        willpower: characterTraits.willpower,
      }),
      fire: new Ring({
        agility: characterTraits.agility,
        intelligence: characterTraits.intelligence,
      }),
      water: new Ring({
        strength: characterTraits.strength,
        perception: characterTraits.perception,
      }),
      void: new Ring({
        void: characterTraits.void,
      }),
    };
  }

  get currExp() {
    return this.currExp || this.baseExp;
  }

  set currExp(expUpdate) {
    // expUpdate can be either negative or positive based on earned or spent
    // if positive, update totalExp
    this.currExp += expUpdate;
    if (expUpdate > 0) {
      this.totalExp = expUpdate;
    }
  }

  get totalExp() {
    return this.totalExp || this.baseExp;
  }

  // this value will only ever increase
  set totalExp(gainedExp) {
    this.totalExp += gainedExp;
  }

  rankUpTrait(trait) {
    // receives a trait name
    for (let element in this.rings) {
      if (this.rings.element.traits.hasOwnProperty(trait)) {
        let nextRank = this.rings.element.traits[trait].rank + 1;
        let requiredExp;
        if (trait === "void") {
          requiredExp = nextRank * 6; // eg. rank (1 + 1) * 6 = 12, cost of next rank
        } else {
          requiredExp = nextRank * 4; // eg. rank (2 + 1) * 4 = 12, cost of next rank
        }

        if (requiredExp > this.xp) {
          return "You do not have enough experience to improve this trait";
        } else {
          // deduct requiredExp from character's xp value
          // improve Trait rank by +1
          this.rings.element.traits[trait].rank = nextRank;
        }
      }
    }
  }
}
