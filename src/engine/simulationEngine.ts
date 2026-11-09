import type { Character } from '../types/character';
import type { InteractiveDecision } from '../types/event';
import { CHILDHOOD_DECISIONS, CHILDHOOD_RANDOM_EVENTS } from '../data/childhoodEvents';
import { SCHOOL_DECISIONS, SCHOOL_RANDOM_EVENTS } from '../data/schoolEvents';
import { ADULTHOOD_DECISIONS, ADULTHOOD_RANDOM_EVENTS } from '../data/adulthoodEvents';
import { SENIOR_RANDOM_EVENTS } from '../data/seniorEvents';

const ALL_DECISIONS: InteractiveDecision[] = [
  ...CHILDHOOD_DECISIONS,
  ...SCHOOL_DECISIONS,
  ...ADULTHOOD_DECISIONS
];

const ALL_RANDOM_EVENTS = [
  ...CHILDHOOD_RANDOM_EVENTS,
  ...SCHOOL_RANDOM_EVENTS,
  ...ADULTHOOD_RANDOM_EVENTS,
  ...SENIOR_RANDOM_EVENTS
];

export interface AdvanceYearResult {
  character: Character;
  pendingDecision?: InteractiveDecision;
  isDead: boolean;
}

export function advanceYear(char: Character): AdvanceYearResult {
  if (!char.alive) {
    return { character: char, isDead: true };
  }

  char.age += 1;
  const currentYear = char.birthYear + char.age;

  // 1. Cập nhật tài chính hàng năm
  if (char.job) {
    char.job.experienceYears += 1;
    const annualSalary = char.job.monthlySalary * 12;
    const livingExpenseRatio = char.age < 25 ? 0.45 : 0.6;
    const livingCost = Math.round(annualSalary * livingExpenseRatio);
    const netSavings = annualSalary - livingCost;

    char.finances.cash += netSavings;

    if (char.finances.savings > 0) {
      char.finances.savings = Math.round(char.finances.savings * 1.06);
    }
  }

  // 2. Tuổi thọ cha mẹ
  char.parents.forEach((parent) => {
    if (parent.alive) {
      parent.age += 1;
      if (parent.age >= 72) {
        const deathChance = 0.04 + (parent.age - 72) * 0.02;
        if (Math.random() < deathChance) {
          parent.alive = false;
          char.stats.happiness = Math.max(0, char.stats.happiness - 25);
          char.logs.push({
            id: `parent_loss_${parent.role}_${char.age}`,
            age: char.age,
            year: currentYear,
            text: `${parent.role} của bạn (${parent.name}) đã tạ thế hưởng thọ ${parent.age} tuổi. Bạn đội nén khăn tang, thắp nén hương tiễn đưa người về cõi vĩnh hằng với lòng biết ơn sâu sắc.`,
            category: 'family'
          });
        }
      }
    }
  });

  // 3. Con cái lớn lên
  char.children.forEach(child => {
    child.age += 1;
  });

  // 4. Kiểm tra sức khỏe & tử vong của nhân vật (Mô hình Gompertz)
  let mortalityRate = 0.001;
  if (char.age > 50) {
    mortalityRate = 0.01 * Math.exp(0.075 * (char.age - 50));
  }
  if (char.stats.health < 30) {
    mortalityRate *= 2.5;
  }
  if (char.age >= 80) {
    mortalityRate = Math.min(0.4, mortalityRate);
  }
  if (char.age >= 100) {
    mortalityRate = 0.8;
  }

  if (Math.random() < mortalityRate) {
    char.alive = false;
    char.deathReason = char.age >= 75 
      ? 'Hưởng đại thọ tự nhiên lúc tuổi già, ra đi thanh thản trong giấc ngủ' 
      : 'Qua đời do bạo bệnh đột ngột';
    
    char.logs.push({
      id: `death_${char.age}`,
      age: char.age,
      year: currentYear,
      text: `Ở tuổi ${char.age}, bạn trút hơi thở cuối cùng. ${char.deathReason}. Khép lại một kiếp nhân sinh với biết bao kỷ niệm và dấu ấn.`,
      category: 'death'
    });

    return { character: char, isDead: true };
  }

  // 5. Kiểm tra Quyết định tương tác (Interactive Decision) ưu tiên
  const availableDecisions = ALL_DECISIONS.filter(d => {
    if (char.age < d.minAge || char.age > d.maxAge) return false;
    if (d.condition && !d.condition(char)) return false;
    const alreadyDecided = char.logs.some(l => l.id.startsWith(`dec_${d.id}`));
    return !alreadyDecided;
  });

  if (availableDecisions.length > 0) {
    const pickedDecision = availableDecisions[0];
    return {
      character: char,
      pendingDecision: pickedDecision,
      isDead: false
    };
  }

  // 6. Sự kiện ngẫu nhiên theo độ tuổi
  const eligibleRandomEvents = ALL_RANDOM_EVENTS.filter(e => {
    if (char.age < e.minAge || char.age > e.maxAge) return false;
    if (e.condition && !e.condition(char)) return false;
    return true;
  });

  if (eligibleRandomEvents.length > 0) {
    const randomEvent = eligibleRandomEvents[Math.floor(Math.random() * eligibleRandomEvents.length)];
    const result = randomEvent.execute(char);

    if (result.statChanges) {
      if (result.statChanges.health) char.stats.health = Math.min(100, Math.max(0, char.stats.health + result.statChanges.health));
      if (result.statChanges.smarts) char.stats.smarts = Math.min(100, Math.max(0, char.stats.smarts + result.statChanges.smarts));
      if (result.statChanges.happiness) char.stats.happiness = Math.min(100, Math.max(0, char.stats.happiness + result.statChanges.happiness));
      if (result.statChanges.looks) char.stats.looks = Math.min(100, Math.max(0, char.stats.looks + result.statChanges.looks));
      if (result.statChanges.karma) char.stats.karma = Math.min(100, Math.max(-100, char.stats.karma + result.statChanges.karma));
    }

    if (result.moneyChange) {
      char.finances.cash = Math.max(0, char.finances.cash + result.moneyChange);
    }

    char.logs.push({
      id: `ev_${randomEvent.id}_${char.age}`,
      age: char.age,
      year: currentYear,
      text: result.text,
      category: result.category,
      statChanges: result.statChanges
    });
  }

  if (char.age > 60) {
    char.stats.health = Math.max(5, char.stats.health - Math.floor(Math.random() * 3));
  }

  return {
    character: char,
    isDead: false
  };
}

export function generateObituary(char: Character): string {
  const parts: string[] = [];
  parts.push(`Họ và tên: ${char.name} (${char.gender === 'male' ? 'Nam' : 'Nữ'}), hưởng thọ ${char.age} tuổi.`);
  parts.push(`Quê quán: ${char.province} (${char.region}), dân tộc ${char.ethnicity}.`);
  
  if (char.education.schoolName) {
    parts.push(`Học vấn: ${char.education.level} tại ${char.education.schoolName}${char.education.major ? ` (Ngành ${char.education.major})` : ''}.`);
  }
  
  if (char.job) {
    parts.push(`Nghề nghiệp cống hiến: ${char.job.title} suốt nhiều năm thăng trầm.`);
  }

  if (char.partner?.isMarried) {
    parts.push(`Gia đình: Bạn đời trăm năm là ${char.partner.name}, cùng nhau sinh thành và nuôi dưỡng ${char.children.length} người con khôn lớn.`);
  } else {
    parts.push(`Đời sống tình cảm: Lựa chọn cuộc đời tự do, độc thân kiêu hãnh.`);
  }

  const finalNetWorth = char.finances.cash + char.finances.savings;
  if (finalNetWorth > 0) {
    parts.push(`Tài sản để lại: ${(finalNetWorth / 1e6).toFixed(1)} triệu VNĐ cho hậu thế.`);
  }

  parts.push(`Nguyên do từ trần: ${char.deathReason || 'Tuổi cao sức yếu'}.`);
  parts.push(`"Một kiếp người khép lại, nhưng những yêu thương và kỷ niệm vẫn còn sống mãi trong lòng người ở lại."`);

  return parts.join('\n\n');
}
