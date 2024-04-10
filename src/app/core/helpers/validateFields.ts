export const fields = (object: any) => {
    const validate = [];
    const fields = [];
    for (const property in object) {
        if (
            object[property] == undefined || object[property] === "" || object[property] == null || object[property] == 'undefined'
        ) {
            fields.push({
                field : `${property}`,
                message : `Field is requried`
            });
            validate.push(true);
        } else {
            validate.push(false);
        }
    }

    if (validate.filter(e => e == true).length > 0) {
        return fields;
    }

    return false;

}