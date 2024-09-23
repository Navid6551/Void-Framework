const CommandState = new Map<string, any>();

export function getValue(pCommand: string): any {
    return CommandState.get(pCommand);
}

export function setValue(pCommand: string, pValue: any): void {
    CommandState.set(pCommand, pValue);
    return;
}