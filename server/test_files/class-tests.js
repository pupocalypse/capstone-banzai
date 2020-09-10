class Insight {
  get totalPoints() {
    // calculated by rings x 10, + skill rank totals
    // (eg. ((2 + 2 + 2 + 2 + 2) * 10) + (3 + 2 + 1 + 1 + 2 + 3 + 3)) = 115 insight
    const ringsTotal = testCharacter.rings.map((ring) => ring.rank);
    const skillsTotal = testCharacter.skills.map((skill) => skill.rank);
    return ringsTotal * 10 + skillsTotal;
  }

  get rank() {
    const points = this.totalPoints;
    let rank;
    switch (points) {
      case points < 149:
        rank = 1;
        break;
      case points < 174:
        rank = 2;
        break;
      case points < 199:
        rank = 3;
        break;
      case points < 224:
        rank = 4;
        break;
      case points < 249:
        rank = 5;
        break;
      case points < 274:
        rank = 6;
        break;
      case points < 299:
        rank = 7;
        break;
      case (points = 324):
        rank = 8;
        break;
      default:
        return "Please provide a correct insight total";
    }
    return rank;
  }
}

class Ring {
  constructor(traits) {
    this.traits = traits;
  }

  get rank() {
    let traitRanks = [];
    Object.values(this.traits).forEach((trait) =>
      traitRanks.push(trait.baseRank)
    );
    return Math.min(...traitRanks);
  }
}

class Trait {
  constructor(type, isVoid) {
    this.baseRank = 2;
    this.type = type;
    this.isVoid = isVoid;
  }

  get rank() {
    // return current rank, as defined by previous experience spending
    return this.rank || this.baseRank;
  }

  set rank(newRank) {
    this.rank = newRank;
  }
}

class Skill {
  constructor(skillName, rank, trait, type, subType, schoolSkill, emphasis) {
    // this.skillName = skillName;
    this.baseRank = rank;
    this.trait = trait;
    this.type = type;
    this.subType = subType;
    this.schoolSkill = schoolSkill; // will be true or false
    // this.emphasis = emphasis; // skip emphases for now?
  }

  get rank() {
    // return current rank, as defined by previous experience spending
    return this.rank || this.baseRank;
  }

  set rank(newRank) {
    this.rank = newRank;
  }
}

// const airRing = new Ring("air", [
//   { trait: "reflexes", rank: 2, type: "physical" },
//   { trait: "awareness", rank: 2, type: "mental" },
// ]);

// const earthRing = new Ring("earth", [
//   { trait: "stamina", rank: 2, type: "physical" },
//   { trait: "willpower", rank: 2, type: "mental" },
// ]);

// const fireRing = new Ring("fire", [
//   { trait: "agility", rank: 2, type: "physical" },
//   { trait: "intelligence", rank: 2, type: "mental" },
// ]);

// const waterRing = new Ring("water", [
//   { trait: "strength", rank: 2, type: "physical" },
//   { trait: "perception", rank: 2, type: "mental" },
// ]);

// const voidRing = new Ring("void", [{ trait: "void", rank: 2, type: "mental" }]);

// fireRing.traits[0].rank = 3;
// fireRing.traits[1].rank = 3;

// voidRing.traits[0].rank = 3;

// console.log("fireRing:", fireRing);
// console.log("voidRing:", voidRing.rank);

class Character {
  // ...
  constructor(...args) {
    this.id = null; // created with uuid?
    this.insight = new Insight(); // what args should it take?
    this.baseExp = 20;
    this.name = args.name;
    this.clan = args.clan;
    // this.family = args.family;
    (this.family = {
      name: "Hiruma",
      bonus: "agility",
    }),
      // this.school = args.school;
      (this.school = {
        clan: "Crab",
        name: "Hiruma Bushi",
        type: "bushi",
        bonus: "willpower",
      }),
      // this.skills;
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

  get skills() {
    // start with skills as defined by schools (make Skill class)
    // later include purchased skills

    // loop through this.school.skills.core array, look up skills object for name matches
    // assign schoolSkill = true for this set
    // for freePickType, find the length (usually 1, up to 2)

    const schoolSkillNames = this.school.skills.core;
    let characterSkills = {};
    for (let skillName of schoolSkillNames) {
      // loop through array
      for (let skillProp in skillsFile) {
        // loop through object
        if (skillName === skillProp) {
          // characterSkills[skillProp] = skillProp;
          // characterSkills[skillProp].schoolSkill = true;
          characterSkills[skillName] = new Skill(
            skillProp.rank,
            skillProp.trait,
            skillProp.type,
            skillProp.subType,
            true
          );
        }
      }
    }
    return this.skills || characterSkills;
  }

  set skills(skillName) {
    for (let skillProp in skillsFile) {
      // loop through object
      if (skillName === skillProp) {
        // characterSkills[skillProp] = skillProp;
        // characterSkills[skillProp].schoolSkill = true;
        characterSkills[skillName] = new Skill(
          skillProp.rank,
          skillProp.trait,
          skillProp.type,
          skillProp.subType,
          true
        );
      }
    }

    this.skills = {...this.skills, newSkill};
  }

  get currExp() {
    return this.currExp || this.baseExp;
  }

  set currExp(expUpdate) {
    // expUpdate can be either negative or positive based on earned or spent
    // if positive, update totalExp
    this.currExp += expUpdate;
    if (expUpdate > 0) {
      this.totalExp += expUpdate;
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
      if (element.traits.hasOwnProperty(trait)) {
        let nextRank = element.traits[trait].rank + 1;
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
          this.currExp(-Math.abs(requiredExp)); // need to make sure it subtracts, not adds
          this.rings[element].traits[trait].rank = nextRank;
        }
      }
    }
  }
}

let testCharacter = new Character();
console.log("testCharacter.rings:", testCharacter.rings);
// console.log(
//   "testCharacter.rings.earth.traits.stamina:",
//   testCharacter.rings.earth.traits.stamina
// );
