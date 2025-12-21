export const statusConverter = (status: number): string => {
    switch (status) {
        case 1:
            return 'Active';
        case 0:
            return 'Inactive';
        case 99:
            return 'Deleted';
        default:
            return 'Unknown';
    }
};