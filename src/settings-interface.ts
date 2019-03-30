export interface ISettings {
  enemy: IEnemySetting;
}

export interface IEnemySetting extends IPositioning {
  muzzles: IMuzzleSetting[];
}

export interface IMuzzleSetting extends IPositioning {
  name: string;
}

export interface IPositioning {
  position: { x: number, y: number };
  rotationDeg: number;
}
