export interface ObjectType {
  id: string;
  x: number;
  y: number;
  color: string;
  shape: string;
  label: string;
}

const shapes = [
  'circle(50% at 50% 50%)',
  'polygon(50% 0%, 0% 100%, 100% 100%)',
  'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
  'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
];

const colors = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A',
  '#98D8C8', '#F67280', '#C06C84', '#6C5B7B',
];

export const generateObjects = (min: number, max: number): ObjectType[] => {
  const count = Math.floor(Math.random() * (max - min + 1)) + min;
  const objects: ObjectType[] = [];

  for (let i = 0; i < count; i++) {
    objects.push({
      id: `object-${i}`,
      x: Math.random() * 100,
      y: Math.random() * 100,
      color: colors[Math.floor(Math.random() * colors.length)],
      shape: shapes[Math.floor(Math.random() * shapes.length)],
      label: String.fromCharCode(65 + Math.floor(Math.random() * 26)), // Random uppercase letter
    });
  }

  return objects;
};