import { v4 as uuidv4 } from 'uuid';
import { UUID } from "../../types/general";

export function randomUUID(): UUID {
    return uuidv4() as any;
}