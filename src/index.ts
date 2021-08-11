import { TwoTo } from './scratchPaper';
import { v4 as uuidv4 } from 'uuid';

interface Entity {
  id: string;
}

interface System {
  name: SystemNameEnum;
  requiredComponents: ComponentEnum[];
  optionalComponents: ComponentEnum[];
}

type EntityMap = { [key: number]: string[] };

enum ComponentEnum {
  None = 0, // 0
  PlayerControlled = TwoTo(0), // 1
  BotControlled = TwoTo(1), // 2
  Position = TwoTo(2), // 4
  Velocity = TwoTo(3), // 8
  OnFire = TwoTo(4), // 16
  Wet = TwoTo(5) // 32
}

enum SystemNameEnum {
  MOVEMENT = 'Movement',
  ELEMENTS = 'Elements'
}

const addToEntityMap = (
  entityMap: EntityMap,
  key: number,
  newValue: string
) => {
  if (!entityMap[key]) {
    entityMap[key] = [];
  }

  if (entityMap[key] && !entityMap[key].includes(newValue)) {
    entityMap[key].push(newValue);
  }
};

const checkRequiredComponents = (
  value: number,
  ...args: ComponentEnum[]
): boolean => {
  return args.map((status) => status === (value & status)).every(Boolean);
};

const checkOptionalComponents = (
  value: number,
  ...args: ComponentEnum[]
): boolean => {
  return args.map((status) => status === (value & status)).some(Boolean);
};

const sumComponentValues = (
  prev: ComponentEnum,
  curr: ComponentEnum
): number => {
  return (prev |= curr);
};

const concatEntityIds = (prev: ComponentEnum, curr: ComponentEnum) => {};

const createPlayer = (
  entities: Entity[],
  entityMap: EntityMap,
  additionalComponents?: ComponentEnum[]
) => {
  const playerComponents = [
    ComponentEnum.PlayerControlled,
    ComponentEnum.Position,
    ComponentEnum.Velocity,
    ...(additionalComponents || [])
  ];
  const componentValue = playerComponents.reduce(sumComponentValues);

  
  const player = {
    id: uuidv4()
  };

  console.log('Creating new player:\n', `id: ${player.id}\n`, `componentValue: ${componentValue}\n`);

  entities.push(player);
  addToEntityMap(entityMap, componentValue, player.id);
};

const ENTITIES: Entity[] = [];
const ENTITY_MAP: EntityMap = {};
const SYSTEMS: System[] = [];

SYSTEMS.push(
  {
    name: SystemNameEnum.MOVEMENT,
    requiredComponents: [ComponentEnum.Position, ComponentEnum.Velocity],
    optionalComponents: []
  },
  {
    name: SystemNameEnum.ELEMENTS,
    requiredComponents: [],
    optionalComponents: [ComponentEnum.OnFire, ComponentEnum.Wet]
  }
);

const consoleLogGlobals = () => {
  console.log('ENTITIES', ENTITIES);
  console.log('ENTITY_MAP', ENTITY_MAP);
};

consoleLogGlobals();
createPlayer(ENTITIES, ENTITY_MAP);
createPlayer(ENTITIES, ENTITY_MAP, [ComponentEnum.OnFire]);
createPlayer(ENTITIES, ENTITY_MAP, [ComponentEnum.OnFire]);
createPlayer(ENTITIES, ENTITY_MAP, [ComponentEnum.Wet]);
consoleLogGlobals();

const MAX_FRAMES = 1;
for (let frame = 0; frame < MAX_FRAMES; frame += 1) {
  SYSTEMS.forEach((system) => {
      // Should print all four players, since movement is a default system for the player
    if (system.requiredComponents.length !== 0) {
      const requiredComponentsValue =
        system.requiredComponents.reduce(sumComponentValues);

      const correspondingEntities = Object.keys(ENTITY_MAP)
        .filter((key) =>
          checkRequiredComponents(
            parseInt(key, 10),
            ...system.requiredComponents
          )
        )
        .map((key) => ENTITY_MAP[parseInt(key, 10)])
        .reduce((p, c) => p.concat(c));

      console.log(
        `Required Entities for ${system.name} system: `,
        correspondingEntities
      );
      return;
    }

    // Should yield the two players who are on fire, and the one who is wet. These are optional for element
    if (system.optionalComponents.length !== 0) {
      const correspondingEntities = [].concat.apply(
        Object.keys(ENTITY_MAP)
          .filter((key) =>
            checkOptionalComponents(
              parseInt(key, 10),
              ...system.optionalComponents
            )
          )
          .map((key) => ENTITY_MAP[parseInt(key, 10)])
          .reduce((p, c) => p.concat(c))
      );
      console.log(
        `Optional Entities for ${system.name} system: `,
        correspondingEntities
      );
      return;
    }
  });
}
