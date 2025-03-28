import * as migration_20250326_032545 from './20250326_032545';
import * as migration_20250327_031320 from './20250327_031320';
import * as migration_20250327_045706 from './20250327_045706';
import * as migration_20250327_235900 from './20250327_235900';
import * as migration_20250328_002733 from './20250328_002733';
import * as migration_20250328_011212 from './20250328_011212';
import * as migration_20250328_043405 from './20250328_043405';
import * as migration_20250328_054715 from './20250328_054715';
import * as migration_20250328_222457 from './20250328_222457';

export const migrations = [
  {
    up: migration_20250326_032545.up,
    down: migration_20250326_032545.down,
    name: '20250326_032545',
  },
  {
    up: migration_20250327_031320.up,
    down: migration_20250327_031320.down,
    name: '20250327_031320',
  },
  {
    up: migration_20250327_045706.up,
    down: migration_20250327_045706.down,
    name: '20250327_045706',
  },
  {
    up: migration_20250327_235900.up,
    down: migration_20250327_235900.down,
    name: '20250327_235900',
  },
  {
    up: migration_20250328_002733.up,
    down: migration_20250328_002733.down,
    name: '20250328_002733',
  },
  {
    up: migration_20250328_011212.up,
    down: migration_20250328_011212.down,
    name: '20250328_011212',
  },
  {
    up: migration_20250328_043405.up,
    down: migration_20250328_043405.down,
    name: '20250328_043405',
  },
  {
    up: migration_20250328_054715.up,
    down: migration_20250328_054715.down,
    name: '20250328_054715',
  },
  {
    up: migration_20250328_222457.up,
    down: migration_20250328_222457.down,
    name: '20250328_222457'
  },
];
