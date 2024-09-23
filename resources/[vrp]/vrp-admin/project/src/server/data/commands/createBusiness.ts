import { RankValue } from "../../../shared/classes/enums";

interface CreateBusinessArgs {
    Name: string;
    Type: number;
    Owner: number;
}

export const createBusiness: CommandData = {
    name: 'createBusiness',
    value: RankValue.dev,
    executedFunction: async function cmdDefault(pUser: UserData, pArgs: CreateBusinessArgs) {
        const code = pArgs?.Name;
        if (!code) return 'Failed to create business. Code is empty.';
        const name = pArgs?.Name;
        if (!name) return 'Failed to create business. Name is empty.';
        const type = pArgs?.Type;
        if (!type || isNaN(type)) return 'Failed to create business. Type is not valid.';
        const owner = pArgs?.Owner;
        if (!owner || isNaN(owner)) return 'Failed to create business. Owner is not valid.';

        global.exports["vrp-business"].CreateBusiness({
            owner_id: Number(owner),
            business_type_id: Number(type),
            code: code,
            name: name,
        });
        // if (!success) return message;

        return '' + name + ')';
    },
    log: 'Created Business (',
    target: false,
    canTargetAbove: false,
    isClientCommand: false,
    commandUI: {
        adminMenu: {
            command: {
                title: 'Create Business',
                cat: 'Utility',
                child: {
                    inputs: ['Code', 'Name', 'Type', 'Owner'],
                },
            },
            options: { bindKey: null }
        },
    },
    blockClientLog: true,
};