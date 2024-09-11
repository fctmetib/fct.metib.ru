import {InputType} from '../../input/interfaces/input.interface';

export type SelectType = Exclude<InputType, 'separated'>;
