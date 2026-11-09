import type { Character, Gender } from '../types/character';
import type { ProvinceData } from '../data/provinces';
import { PROVINCES } from '../data/provinces';
import { ETHNICITIES } from '../data/ethnicities';
import { 
  SURNAMES, MALE_MIDDLE_NAMES, FEMALE_MIDDLE_NAMES, 
  MALE_GIVEN_NAMES, FEMALE_GIVEN_NAMES, 
  PARENT_JOBS, HOUSE_TYPES, TALENTS, 
  ZODIAC_SIGNS, CAN_CHI_HOURS 
} from '../data/names';

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function pickWeighted<T extends { weight: number }>(items: T[]): T {
  const total = items.reduce((sum, item) => sum + item.weight, 0);
  let random = Math.random() * total;
  for (const item of items) {
    if (random < item.weight) return item;
    random -= item.weight;
  }
  return items[0];
}

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export interface CharacterCreationOptions {
  customName?: string;
  customGender?: Gender;
  customProvince?: string;
  customEthnicity?: string;
}

export function generateCharacter(options?: CharacterCreationOptions): Character {
  const gender: Gender = options?.customGender ?? (Math.random() < 0.5 ? 'male' : 'female');
  
  // Họ và tên
  const surname = pickRandom(SURNAMES);
  const middleName = gender === 'male' ? pickRandom(MALE_MIDDLE_NAMES) : pickRandom(FEMALE_MIDDLE_NAMES);
  const givenName = gender === 'male' ? pickRandom(MALE_GIVEN_NAMES) : pickRandom(FEMALE_GIVEN_NAMES);
  const fullName = options?.customName?.trim() || `${surname} ${middleName} ${givenName}`;

  // Tỉnh thành & Vùng miền
  let provinceObj: ProvinceData;
  if (options?.customProvince) {
    provinceObj = PROVINCES.find(p => p.name === options.customProvince) || PROVINCES[0];
  } else {
    provinceObj = pickWeighted(PROVINCES);
  }

  // Dân tộc
  const ethnicityObj = options?.customEthnicity 
    ? ETHNICITIES.find(e => e.name === options.customEthnicity) || ETHNICITIES[0]
    : pickWeighted(ETHNICITIES);

  // Cha mẹ
  const fatherSurname = surname;
  const fatherGiven = pickRandom(MALE_GIVEN_NAMES);
  const fatherMiddle = pickRandom(MALE_MIDDLE_NAMES);
  const fatherJob = pickRandom(PARENT_JOBS);
  const fatherAge = randInt(22, 36);

  const motherSurname = pickRandom(SURNAMES.filter(s => s !== fatherSurname));
  const motherGiven = pickRandom(FEMALE_GIVEN_NAMES);
  const motherMiddle = pickRandom(FEMALE_MIDDLE_NAMES);
  const motherJob = pickRandom(PARENT_JOBS);
  const motherAge = fatherAge - randInt(0, 4);

  // Biến thiên thu nhập theo chỉ số chi phí vùng
  const fIncome = Math.round(fatherJob.avgIncome * (0.8 + Math.random() * 0.4) * provinceObj.livingCostIndex);
  const mIncome = Math.round(motherJob.avgIncome * (0.8 + Math.random() * 0.4) * provinceObj.livingCostIndex);
  const totalIncome = fIncome + mIncome;

  // Kiểu nhà phù hợp thu nhập
  const suitableHouses = HOUSE_TYPES.filter(h => totalIncome >= h.minIncome);
  const house = suitableHouses.length > 0 ? suitableHouses[suitableHouses.length - 1].name : HOUSE_TYPES[0].name;

  // Chỉ số ban đầu (0 - 100)
  const stats = {
    health: randInt(65, 95),
    smarts: randInt(40, 85),
    happiness: randInt(60, 95),
    looks: randInt(40, 90),
    karma: 0,
  };

  // Tính cách bẩm sinh
  const traits = {
    ambition: randInt(30, 80),
    riskTolerance: randInt(20, 80),
    sociability: randInt(30, 90),
    diligence: randInt(40, 85),
  };

  const currentYear = new Date().getFullYear();
  const zodiac = pickRandom(ZODIAC_SIGNS);
  const birthHour = pickRandom(CAN_CHI_HOURS);
  const talent = pickRandom(TALENTS);

  const introText = `Bạn chào đời là một bé ${gender === 'male' ? 'trai' : 'gái'} tại ${provinceObj.name} (${provinceObj.features}). Bạn là người dân tộc ${ethnicityObj.name}. Bố bạn là ${fatherSurname} ${fatherMiddle} ${fatherGiven} (${fatherJob.title}), mẹ bạn là ${motherSurname} ${motherMiddle} ${motherGiven} (${motherJob.title}). Gia đình sống trong một ${house}.`;

  const newChar: Character = {
    id: 'char_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
    name: fullName,
    gender,
    birthYear: currentYear,
    age: 0,
    alive: true,
    province: provinceObj.name,
    region: provinceObj.region,
    ethnicity: ethnicityObj.name,
    religion: ethnicityObj.traditionalReligion,
    zodiac,
    birthHourCanChi: birthHour,
    houseType: house,
    parents: [
      {
        name: `${fatherSurname} ${fatherMiddle} ${fatherGiven}`,
        role: 'Bố',
        age: fatherAge,
        job: fatherJob.title,
        monthlyIncome: fIncome,
        alive: true,
        relationship: randInt(75, 98),
      },
      {
        name: `${motherSurname} ${motherMiddle} ${motherGiven}`,
        role: 'Mẹ',
        age: motherAge,
        job: motherJob.title,
        monthlyIncome: mIncome,
        alive: true,
        relationship: randInt(80, 100),
      }
    ],
    siblings: [],
    children: [],
    pets: [],
    stats,
    traits,
    talent,
    education: {
      level: 'Chưa đi học',
      gpa: 0,
    },
    finances: {
      cash: 0,
      savings: 0,
      gold: 0,
      stocks: 0,
      realEstate: [],
      vehicles: [],
    },
    logs: [
      {
        id: 'log_0',
        age: 0,
        year: currentYear,
        text: introText,
        category: 'birth',
      }
    ],
    memories: [
      `Tiếng khóc đầu tiên chào đời tại mảnh đất ${provinceObj.name}.`
    ]
  };

  return newChar;
}
