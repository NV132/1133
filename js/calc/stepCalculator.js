// 보험료 계산기 스텝별 상태/로직 관리 (동적 확장형)

export const steps = [
  {
    key: 'birth',
    label: '생년월일',
    icon: '👤',
    type: 'date',
    validate: v => !!v,
  },
  {
    key: 'gender',
    label: '성별',
    icon: '🚻',
    type: 'radio',
    options: [
      { value: 'male', label: '남성', icon: '🚹' },
      { value: 'female', label: '여성', icon: '🚺' }
    ],
    validate: v => !!v,
  },
  {
    key: 'job',
    label: '직업군',
    icon: '💼',
    type: 'select',
    options: [
      { value: '', label: '선택' },
      { value: 'office', label: '사무직' },
      { value: 'production', label: '생산직' },
      { value: 'driver', label: '운전직' },
      { value: 'student', label: '학생' },
      { value: 'other', label: '기타' }
    ],
    validate: v => !!v,
  },
  {
    key: 'family',
    label: '가족 수',
    icon: '👨‍👩‍👧‍👦',
    type: 'number',
    min: 1,
    max: 10,
    validate: v => v > 0,
  },
  {
    key: 'smoke',
    label: '흡연 여부',
    icon: '🚬',
    type: 'radio',
    options: [
      { value: 'no', label: '비흡연', icon: '🚭' },
      { value: 'yes', label: '흡연', icon: '🚬' }
    ],
    validate: v => !!v,
  }
];

export function getStepIndex(key) {
  return steps.findIndex(s => s.key === key);
} 