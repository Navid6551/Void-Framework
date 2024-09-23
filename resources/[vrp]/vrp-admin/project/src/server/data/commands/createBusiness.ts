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
        const name = pArgs?.Name;
        if (!name) return 'Failed to create business. Name is empty.';
        const type = pArgs?.Type;
        if (!type || isNaN(type)) return 'Failed to create business. Type is not valid.';
        const owner = pArgs?.Owner;
        if (!owner || isNaN(owner)) return 'Failed to create business. Owner is not valid.';

        const [success, message] = global.exports["vrp-business"].CreateBusiness({
            name: name,
            business_type_id: type,
            owner_id: owner
        });
        if (!success) return message;

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
                    inputs: ['Name', 'Type', 'Owner'],
                },
            },
            options: { bindKey: null }
        },
    },
    blockClientLog: true,
};