class Ring {
  constructor(traits) {
    this.traits = traits;
    this.rank = this.getRank;
  }

  get getRank() {
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

  // get rank() {
  //   // return current rank, as defined by previous experience spending
  //   return this.rank || this.baseRank;
  // }

  // set rank(newRank) {
  //   this.rank = newRank;
  // }
}

class Skill {
  constructor(rank, trait, type, subType, schoolSkill, emphasis) {
    this.baseRank = rank;
    this.trait = trait;
    this.type = type;
    this.subType = subType;
    this.schoolSkill = schoolSkill; // will be true or false
    this.rank = this.getRank();
    // this.emphasis = emphasis; // skip emphases for now?
  }

  getRank() {
    // return current rank, as defined by previous experience spending
    return this.getRank || this.baseRank;
  }

  // set rank(newRank) {
  //   this.rank = newRank;
  // }
}

// class functions
class Character {
  // ...
  // args = name, clan, family object, school object, skills object
  constructor(...args) {
    this.id = null; // created with uuid?
    // this.insight = new Insight(); // what args should it take?
    this.baseExp = 20;
    this.name = args[0];
    this.clan = args[1];
    // this.family = args.family;
    this.family = args[2];
    // this.school = args.school;
    this.school = args[3];
    // this.skills;
    this.rings = this.getRings();
    this.skills = this.getSkills();
  }

  getRings() {
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

  // getSkills() {
  //   // start with skills as defined by schools (make Skill class)
  //   // this only needs to be done once
  //   // purchased schools can be added later

  //   // loop through this.school.skills.core array, look up skills object for name matches
  //   // assign schoolSkill = true for this set
  //   // for freePickType, find the length (usually 1, up to 2)
  //   let characterSkills = {};
  //   const skillsFile = JSON.parse(fs.readFileSync(skillsPath));
  //   if (!this.skills) {
  //     const schoolSkillNames = this.school.skills.core;
  //     // loop through array
  //     console.log("schoolSkillNames", schoolSkillNames);
  //     for (let skillName of schoolSkillNames) {
  //       // loop through object
  //       for (let skillProp in skillsFile) {
  //         if (skillName === skillProp) {
  //           const baseRank = 1;
  //           if (characterSkills.hasOwnProperty(skillName)) {
  //             characterSkills[skillName].rank++;
  //           } else {
  //             // args = rank, trait, type, subType, schoolSkill
  //             characterSkills[skillName] = new Skill(
  //               baseRank,
  //               skillsFile[skillProp].trait,
  //               skillsFile[skillProp].type,
  //               skillsFile[skillProp].subType,
  //               true
  //             );
  //           }
  //         }
  //       }
  //     }
  //   }
  //   return this.skills || characterSkills;
  // }

  // set skills(skillName) {
  //   for (let skillProp in skillsFile) {
  //     // loop through object
  //     if (skillName === skillProp) {
  //       // characterSkills[skillProp] = skillProp;
  //       // characterSkills[skillProp].schoolSkill = true;
  //       characterSkills[skillName] = new Skill(
  //         skillProp.rank,
  //         skillProp.trait,
  //         skillProp.type,
  //         skillProp.subType,
  //         true
  //       );
  //     }
  //   }

  //   this.skills = { ...this.skills, newSkill };
  // }

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

export { Character };
