import * as migration_20250326_032545 from './20250326_032545';
import * as migration_20250327_031320 from './20250327_031320';

export const migrations = [
  {
    up: migration_20250326_032545.up,
    down: migration_20250326_032545.down,
    name: '20250326_032545',
  },
  {
    up: migration_20250327_031320.up,
    down: migration_20250327_031320.down,
    name: '20250327_031320'
  },
];
